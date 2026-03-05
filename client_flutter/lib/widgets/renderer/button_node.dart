import 'package:flutter/material.dart';
import '../../json_renderer.dart';
import 'renderer_utils.dart';

class ButtonNodeWidget extends StatelessWidget {
  final ComponentNode node;
  final Map<String, dynamic>? dataContext;

  const ButtonNodeWidget({super.key, required this.node, this.dataContext});

  @override
  Widget build(BuildContext context) {
    final r = node.raw;
    final bg = colorToHex(r['background']) == Colors.transparent
        ? colorToHex('primary')
        : colorToHex(r['background']);

    double py = 10.0;
    double px = 16.0;
    if (r['size'] == 'lg') {
      py = 14.0;
      px = 24.0;
    }

    final isFullWidth = r['fullWidth'] != false;

    Widget button = ElevatedButton(
      style: ElevatedButton.styleFrom(
        backgroundColor: bg,
        foregroundColor: Colors.white,
        padding: EdgeInsets.symmetric(horizontal: px, vertical: py),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(getRadius(r['radius'] ?? 'md')),
        ),
        elevation: 0,
      ),
      onPressed: () {},
      child: Text(
        resolveVariables(r['label'], dataContext),
        style: const TextStyle(fontWeight: FontWeight.bold),
      ),
    );

    if (isFullWidth) {
      return SizedBox(width: double.infinity, child: button);
    }

    return button;
  }
}
