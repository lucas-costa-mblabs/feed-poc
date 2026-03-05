import 'package:flutter/material.dart';
import '../../json_renderer.dart';
import 'renderer_utils.dart';

class TextNodeWidget extends StatelessWidget {
  final ComponentNode node;
  final Map<String, dynamic>? dataContext;

  const TextNodeWidget({super.key, required this.node, this.dataContext});

  @override
  Widget build(BuildContext context) {
    final r = node.raw;
    double fontSize = 16.0;
    FontWeight fontWeight = FontWeight.normal;

    final typo = r['typography'];
    if (typo == 'caption') {
      fontSize = 12.0;
    } else if (typo == 'heading1') {
      fontSize = 32.0;
      fontWeight = FontWeight.bold;
    } else if (typo == 'heading2') {
      fontSize = 24.0;
      fontWeight = FontWeight.bold;
    } else if (typo == 'heading3') {
      fontSize = 20.0;
      fontWeight = FontWeight.bold;
    } else if (typo == 'heading4') {
      fontSize = 18.0;
      fontWeight = FontWeight.bold;
    } else if (typo == 'heading5') {
      fontSize = 16.0;
      fontWeight = FontWeight.bold;
    }

    if (r['fontWeight'] == 'bold') {
      fontWeight = FontWeight.bold;
    } else if (r['fontWeight'] == 'semiBold') {
      fontWeight = FontWeight.w600;
    }

    final value = resolveVariables(r['value'], dataContext);
    Color color = r['color'] != null
        ? colorToHex(r['color'])
        : const Color(0xFF111827);

    return Text(
      value,
      style: TextStyle(
        fontSize: fontSize,
        fontWeight: fontWeight,
        color: color,
      ),
    );
  }
}
