import 'package:flutter/material.dart';
import 'provider.dart';

String resolveVariables(String? str, Map<String, dynamic>? dataContext) {
  if (str == null || str.isEmpty) return '';
  final regExp = RegExp(r'\{\{(.*?)\}\}');
  return str.replaceAllMapped(regExp, (match) {
    var path = match.group(1)?.trim();
    if (path == null) return match.group(0)!;

    // Remove o ponto inicial se existir (padrão Go: {{.Title}})
    if (path.startsWith('.')) {
      path = path.substring(1);
    }

    if (path.isEmpty) return dataContext?.toString() ?? '';

    final parts = path.split('.');
    dynamic current = dataContext;
    for (final part in parts) {
      if (current is Map && current.containsKey(part)) {
        current = current[part];
      } else {
        return match.group(0)!;
      }
    }
    return current?.toString() ?? '';
  });
}

double? tokenToPx(BuildContext context, String? token) {
  if (token == null) return null;
  final sdk = DirectoAiTemplateProvider.of(context);
  if (sdk != null && sdk.theme.spacing.containsKey(token)) {
    final value = sdk.theme.spacing[token]!;
    return double.tryParse(value.replaceAll('px', ''));
  }
  // Try to parse direct px value
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
  // Try to parse direct px value
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

  // Basic named colors fallback
  if (effectiveColor == 'white') return Colors.white;
  if (effectiveColor == 'black') return Colors.black;
  if (effectiveColor == 'transparent') return Colors.transparent;

  return Colors.transparent;
}
