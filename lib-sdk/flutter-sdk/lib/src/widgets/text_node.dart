import 'package:flutter/material.dart';
import '../utils.dart';

class TextNodeWidget extends StatelessWidget {
  final Map<String, dynamic> node;
  final Map<String, dynamic>? dataContext;

  const TextNodeWidget({super.key, required this.node, this.dataContext});

  @override
  Widget build(BuildContext context) {
    final value = resolveVariables(node['value']?.toString(), dataContext);
    final typography = node['typography']?.toString();
    final fontWeight = node['fontWeight']?.toString();
    final textAlign = node['textAlign']?.toString();

    double fontSize = 16.0;
    FontWeight weight = FontWeight.normal;

    if (typography == 'caption')
      fontSize = 12.0;
    else if (typography == 'heading1') {
      fontSize = 32.0;
      weight = FontWeight.bold;
    } else if (typography == 'heading2') {
      fontSize = 24.0;
      weight = FontWeight.bold;
    } else if (typography == 'heading3') {
      fontSize = 20.0;
      weight = FontWeight.bold;
    } else if (typography == 'heading4') {
      fontSize = 18.0;
      weight = FontWeight.bold;
    } else if (typography == 'heading5') {
      fontSize = 16.0;
      weight = FontWeight.bold;
    } else if (typography == 'body')
      fontSize = 16.0;

    if (fontWeight == 'bold')
      weight = FontWeight.bold;
    else if (fontWeight == 'semiBold')
      weight = FontWeight.w600;

    TextAlign align = TextAlign.left;
    if (textAlign == 'center')
      align = TextAlign.center;
    else if (textAlign == 'right')
      align = TextAlign.right;

    return Text(
      value,
      textAlign: align,
      style: TextStyle(
        fontSize: fontSize,
        fontWeight: weight,
        color: colorToHex(context, node['color']) == Colors.transparent
            ? const Color(0xFF111827)
            : colorToHex(context, node['color']),
        height: 1.4,
      ),
    );
  }
}
