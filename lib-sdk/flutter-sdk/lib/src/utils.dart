import 'package:flutter/material.dart';
import 'provider.dart';

/**
 * GoLite Parser: Suporta lógica básica do Go Templates em Flutter.
 * Suporta: if/else/end, eq, gt, len, slice, safeSlice e variáveis ($var).
 * Suporta tags com quebras de linha [\s\S].
 */
String resolveGoTemplate(String? template, Map<String, dynamic>? dataContext) {
  if (template == null || template.isEmpty) return '';

  Map<String, dynamic> vars = {};
  // Usa [\s\S] e dotAll: true para capturar quebras de linha dentro das chaves {{ ... }}
  RegExp tokenRegex = RegExp(r'(\{\{[\s\S]*?\}\})');
  Iterable<RegExpMatch> allMatches = tokenRegex.allMatches(template);

  List<String> tokens = [];
  int lastMatchEnd = 0;
  for (var match in allMatches) {
    if (match.start > lastMatchEnd) {
      tokens.add(template.substring(lastMatchEnd, match.start));
    }
    tokens.add(match.group(0)!);
    lastMatchEnd = match.end;
  }
  if (lastMatchEnd < template.length) {
    tokens.add(template.substring(lastMatchEnd));
  }

  String output = '';
  List<Map<String, bool>> stack = [];

  bool isCurrentlyDisplaying() {
    for (var s in stack) {
      if (!s['display']!) return false;
    }
    return true;
  }

  dynamic evaluateValue(String val) {
    val = val.trim().replaceAll(RegExp(r'\s+'), ' ');
    if (val.startsWith('"') && val.endsWith('"'))
      return val.substring(1, val.length - 1);

    var num = double.tryParse(val);
    if (num != null) return num;

    if (val == 'true') return true;
    if (val == 'false') return false;
    if (val.startsWith('\$')) return vars[val];

    String cleanPath = val.startsWith('.') ? val.substring(1) : val;
    if (cleanPath.isEmpty) return dataContext;

    List<String> parts = cleanPath.split('.');
    dynamic current = dataContext;
    for (var part in parts) {
      if (current is Map && current.containsKey(part)) {
        current = current[part];
      } else {
        return null;
      }
    }
    return current;
  }

  dynamic evaluateExpression(String expr) {
    expr = expr.trim().replaceAll(RegExp(r'\s+'), ' ');

    while (expr.contains('(')) {
      RegExp parenRegex = RegExp(r'\(([^()]+)\)');
      var match = parenRegex.firstMatch(expr);
      if (match == null) break;

      var res = evaluateExpression(match.group(1)!);
      String replacement = res is String ? '"$res"' : res.toString();
      expr = expr.replaceRange(match.start, match.end, replacement);
    }

    RegExp argRegex = RegExp(r'(?:[^\s"]+|"[^"]*")+');
    List<String> parts = argRegex
        .allMatches(expr)
        .map((m) => m.group(0)!)
        .toList();

    if (parts.isEmpty) return null;

    String func = parts[0];
    List<String> args = parts.length > 1 ? parts.sublist(1) : [];

    switch (func) {
      case 'eq':
        if (args.length < 2) return false;
        return evaluateValue(args[0]).toString() ==
            evaluateValue(args[1]).toString();
      case 'gt':
        if (args.length < 2) return false;
        var v1 = double.tryParse(evaluateValue(args[0]).toString()) ?? 0;
        var v2 = double.tryParse(evaluateValue(args[1]).toString()) ?? 0;
        return v1 > v2;
      case 'len':
        if (args.isEmpty) return 0;
        var valLen = evaluateValue(args[0]);
        if (valLen is String) return valLen.length;
        if (valLen is List) return valLen.length;
        return 0;
      case 'slice':
      case 'safeSlice':
        if (args.length < 2) return '';
        var str = evaluateValue(args[0]);
        var start = int.tryParse(evaluateValue(args[1]).toString()) ?? 0;
        var end = args.length > 2
            ? int.tryParse(evaluateValue(args[2]).toString())
            : null;
        if (str is! String) return '';
        if (end != null && end > str.length) end = str.length;
        if (start > str.length) start = str.length;
        return str.substring(start, end);
      default:
        return evaluateValue(expr);
    }
  }

  for (var token in tokens) {
    if (token.startsWith('{{') && token.endsWith('}}')) {
      String content = token
          .substring(2, token.length - 2)
          .trim()
          .replaceAll(RegExp(r'\s+'), ' ');
      bool currentDisp = isCurrentlyDisplaying();

      RegExp assignRegex = RegExp(r'^(\$\w+)\s*(?::=|=)\s*(.*)$');
      var assignMatch = assignRegex.firstMatch(content);
      if (assignMatch != null) {
        if (currentDisp) {
          vars[assignMatch.group(1)!] = evaluateExpression(
            assignMatch.group(2)!,
          );
        }
        continue;
      }

      if (content.startsWith('if ')) {
        var condition = !!(evaluateExpression(content.substring(3)) ?? false);
        stack.add({
          'display': currentDisp && condition,
          'executed': currentDisp && condition,
        });
      } else if (content.startsWith('else if ')) {
        if (stack.isEmpty) continue;
        var last = stack.last;
        if (last['executed']!) {
          last['display'] = false;
        } else {
          bool parentDisp = true;
          if (stack.length > 1) {
            for (int i = 0; i < stack.length - 1; i++)
              if (!stack[i]['display']!) parentDisp = false;
          }
          var condition = !!(evaluateExpression(content.substring(8)) ?? false);
          last['display'] = parentDisp && condition;
          if (last['display']!) last['executed'] = true;
        }
      } else if (content == 'else') {
        if (stack.isEmpty) continue;
        var last = stack.last;
        bool parentDisp = true;
        if (stack.length > 1) {
          for (int i = 0; i < stack.length - 1; i++)
            if (!stack[i]['display']!) parentDisp = false;
        }
        last['display'] = parentDisp && !last['executed']!;
        if (last['display']!) last['executed'] = true;
      } else if (content == 'end') {
        if (stack.isNotEmpty) stack.removeLast();
      } else {
        if (currentDisp) {
          var val = evaluateExpression(content);
          output += val != null ? val.toString() : '';
        }
      }
    } else {
      if (isCurrentlyDisplaying()) {
        output += token;
      }
    }
  }

  return output;
}

// Aliases
String resolveVariables(String? template, Map<String, dynamic>? dataContext) {
  return resolveGoTemplate(template, dataContext);
}

double? tokenToPx(BuildContext context, String? token) {
  if (token == null) return null;
  final sdk = DirectoAiTemplateProvider.of(context);
  if (sdk != null && sdk.theme.spacing.containsKey(token)) {
    final value = sdk.theme.spacing[token]!;
    return double.tryParse(value.replaceAll('px', ''));
  }
  if (token.endsWith('px')) {
    return double.tryParse(token.replaceAll('px', ''));
  }
  return double.tryParse(token);
}

double getRadius(BuildContext context, String? r) {
  if (r == null) return 0.0;
  final sdk = DirectoAiTemplateProvider.of(context);
  if (sdk != null && sdk.theme.borderRadius.containsKey(r)) {
    final value = sdk.theme.borderRadius[r]!;
    return double.tryParse(value.replaceAll('px', '')) ?? 0.0;
  }
  if (r.endsWith('px')) {
    return double.tryParse(r.replaceAll('px', '')) ?? 0.0;
  }
  return double.tryParse(r) ?? 0.0;
}

Color colorToHex(BuildContext context, String? token) {
  if (token == null) return Colors.transparent;
  final sdk = DirectoAiTemplateProvider.of(context);
  String effectiveColor = token;
  if (sdk != null && sdk.theme.colors.containsKey(token)) {
    effectiveColor = sdk.theme.colors[token]!;
  }

  if (effectiveColor.startsWith('#')) {
    final hex = effectiveColor.replaceFirst('#', '');
    if (hex.length == 6) {
      return Color(int.parse('FF$hex', radix: 16));
    } else if (hex.length == 8) {
      return Color(int.parse(hex, radix: 16));
    }
  }

  if (effectiveColor == 'white') return Colors.white;
  if (effectiveColor == 'black') return Colors.black;
  if (effectiveColor == 'transparent') return Colors.transparent;

  return Colors.transparent;
}
