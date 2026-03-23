import 'package:flutter/material.dart';
import '../utils.dart';

class MediaNodeWidget extends StatelessWidget {
  final Map<String, dynamic> node;
  final Map<String, dynamic>? dataContext;

  const MediaNodeWidget({super.key, required this.node, this.dataContext});

  @override
  Widget build(BuildContext context) {
    final url = resolveVariables(node['url']?.toString(), dataContext).trim();
    final widthStr = node['width']?.toString();
    final heightStr = node['height']?.toString();
    final objectFit = node['objectFit']?.toString();

    final width = (widthStr == '100%')
        ? null
        : (double.tryParse(widthStr ?? '') ?? null);
    final height = (heightStr == '100%')
        ? null
        : (double.tryParse(heightStr ?? '') ?? null);

    BoxFit fit = BoxFit.cover;
    if (objectFit == 'contain')
      fit = BoxFit.contain;
    else if (objectFit == 'fill')
      fit = BoxFit.fill;
    else if (objectFit == 'none')
      fit = BoxFit.none;
    else if (objectFit == 'scale-down')
      fit = BoxFit.scaleDown;

    if (url.isEmpty) return const SizedBox.shrink();

    return SizedBox(
      width: width,
      height: height,
      child: Image.network(
        url,
        fit: fit,
        errorBuilder: (context, error, stackTrace) => Container(
          color: Colors.grey[200],
          child: const Center(
            child: Icon(Icons.broken_image, color: Colors.grey),
          ),
        ),
      ),
    );
  }
}
