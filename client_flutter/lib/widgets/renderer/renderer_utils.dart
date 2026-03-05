import 'package:flutter/material.dart';

String resolveVariables(String? str, Map<String, dynamic>? dataContext) {
  if (str == null || str.isEmpty) return '';
  final regExp = RegExp(r'\{\{(.*?)\}\}');
  return str.replaceAllMapped(regExp, (match) {
    final path = match.group(1)?.trim();
    if (path == null) return match.group(0)!;
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

double? tokenToPx(String? token) {
  switch (token) {
    case 'xs':
      return 4.0;
    case 'sm':
      return 8.0;
    case 'md':
      return 16.0;
    case 'lg':
      return 24.0;
    case 'xl':
      return 32.0;
    case 'xxl':
      return 48.0;
    default:
      return null;
  }
}

double getRadius(String? r) {
  switch (r) {
    case 'sm':
      return 4.0;
    case 'md':
      return 8.0;
    case 'lg':
      return 12.0;
    case 'full':
      return 9999.0;
    default:
      return 0.0;
  }
}

Color colorToHex(String? token) {
  if (token == null) return Colors.transparent;
  switch (token) {
    case 'white':
      return const Color(0xFFFFFFFF);
    case 'gray-100':
      return const Color(0xFFF3F4F6);
    case 'gray-200':
      return const Color(0xFFE2E8F0);
    case 'gray-800':
      return const Color(0xFF1F2937);
    case 'gray-900':
      return const Color(0xFF111827);
    case 'primary':
      return const Color(0xFF6366F1);
    default:
      if (token.startsWith('#')) {
        final hex = token.replaceFirst('#', '');
        if (hex.length == 6) {
          return Color(int.parse('FF$hex', radix: 16));
        } else if (hex.length == 8) {
          return Color(int.parse(hex, radix: 16));
        }
      }
      return Colors.transparent;
  }
}
