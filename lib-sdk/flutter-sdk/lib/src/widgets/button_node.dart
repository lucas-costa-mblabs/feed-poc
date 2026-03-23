import 'package:flutter/material.dart';
import '../utils.dart';

class ButtonNodeWidget extends StatelessWidget {
  final Map<String, dynamic> node;
  final Map<String, dynamic>? dataContext;

  const ButtonNodeWidget({super.key, required this.node, this.dataContext});

  @override
  Widget build(BuildContext context) {
    final label = resolveVariables(node['label']?.toString(), dataContext);
    final variant = node['variant']?.toString();
    final background = node['background']?.toString();
    final radius = node['radius']?.toString();
    final fullWidth = node['fullWidth'] as bool? ?? true;
    final size = node['size']?.toString() ?? 'md';

    Color bgColor = colorToHex(context, background);
    if (bgColor == Colors.transparent) bgColor = colorToHex(context, 'primary');
    if (bgColor == Colors.transparent) bgColor = const Color(0xFF6366F1);

    Color textColor = Colors.white;
    BorderSide borderSide = BorderSide.none;

    if (variant == 'outline') {
      textColor = bgColor;
      bgColor = Colors.transparent;
      borderSide = BorderSide(color: textColor);
    } else if (variant == 'ghost') {
      textColor = bgColor;
      bgColor = Colors.transparent;
    }

    double vPadding = 10.0;
    double hPadding = 16.0;
    if (size == 'xs') {
      vPadding = 4;
      hPadding = 8;
    } else if (size == 'sm') {
      vPadding = 6;
      hPadding = 12;
    } else if (size == 'lg') {
      vPadding = 14;
      hPadding = 24;
    } else if (size == 'xl') {
      vPadding = 18;
      hPadding = 32;
    }

    return SizedBox(
      width: fullWidth ? double.infinity : null,
      child: ElevatedButton(
        onPressed: () {}, // Handled by consumer if needed
        style: ElevatedButton.styleFrom(
          backgroundColor: bgColor,
          foregroundColor: textColor,
          elevation: 0,
          padding: EdgeInsets.symmetric(
            horizontal: hPadding,
            vertical: vPadding,
          ),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(getRadius(context, radius)),
            side: borderSide,
          ),
        ),
        child: Text(label, style: const TextStyle(fontWeight: FontWeight.bold)),
      ),
    );
  }
}
