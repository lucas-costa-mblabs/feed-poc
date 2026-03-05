import 'package:flutter/material.dart';
import '../../json_renderer.dart';
import 'renderer_utils.dart';

class IconNodeWidget extends StatelessWidget {
  final ComponentNode node;

  const IconNodeWidget({super.key, required this.node});

  @override
  Widget build(BuildContext context) {
    final r = node.raw;
    final p = tokenToPx(r['padding']) ?? 0.0;
    final size = (r['size'] as num?)?.toDouble() ?? 20.0;
    final color = r['color'] != null
        ? colorToHex(r['color'])
        : const Color(0xFF1F2937);

    IconData iconData = Icons.star_border;
    if (r['icon'] == 'shoppingbag') {
      iconData = Icons.shopping_bag_outlined;
    }

    return Container(
      padding: EdgeInsets.all(p),
      decoration: BoxDecoration(
        color: colorToHex(r['backgroundColor']),
        borderRadius: BorderRadius.circular(getRadius(r['borderRadius'])),
      ),
      child: Icon(iconData, size: size, color: color),
    );
  }
}
