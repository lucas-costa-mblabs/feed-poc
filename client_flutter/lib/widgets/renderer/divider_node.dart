import 'package:flutter/material.dart';
import '../../json_renderer.dart';
import 'renderer_utils.dart';

class DividerNodeWidget extends StatelessWidget {
  final ComponentNode node;
  final Map<String, dynamic>? dataContext;

  const DividerNodeWidget({super.key, required this.node, this.dataContext});

  @override
  Widget build(BuildContext context) {
    final r = node.raw;
    double thickness = 1.0;
    Color color = colorToHex('gray-200');

    if (r['thickness'] == 'thin') {
      thickness = 0.5;
      color = const Color(0xFFF1F5F9);
    } else if (r['thickness'] == 'thick') {
      thickness = 2.0;
    }

    return Divider(thickness: thickness, height: 12.0, color: color);
  }
}
