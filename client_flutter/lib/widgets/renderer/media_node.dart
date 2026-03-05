import 'package:flutter/material.dart';
import '../../json_renderer.dart';
import 'renderer_utils.dart';

class MediaNodeWidget extends StatelessWidget {
  final ComponentNode node;
  final Map<String, dynamic>? dataContext;

  const MediaNodeWidget({super.key, required this.node, this.dataContext});

  @override
  Widget build(BuildContext context) {
    final r = node.raw;
    final url = resolveVariables(r['url'], dataContext);
    BoxFit fit = BoxFit.cover;
    if (r['objectFit'] == 'contain') {
      fit = BoxFit.contain;
    }

    return Image.network(
      url,
      fit: fit,
      errorBuilder: (context, error, stackTrace) => Container(
        color: Colors.grey[200],
        child: const Center(child: Icon(Icons.image_not_supported)),
      ),
    );
  }
}
