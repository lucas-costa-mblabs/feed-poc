import 'package:flutter/material.dart';
import '../../json_renderer.dart';
import 'renderer_utils.dart';

class PostInteractionsNodeWidget extends StatelessWidget {
  final ComponentNode node;

  const PostInteractionsNodeWidget({super.key, required this.node});

  @override
  Widget build(BuildContext context) {
    final r = node.raw;
    final px = tokenToPx(r['paddingX']) ?? 0.0;
    final py = tokenToPx(r['paddingY']) ?? 12.0;

    const iconColor = Color(0xFF1F2937);
    const iconSize = 24.0;

    return Padding(
      padding: EdgeInsets.symmetric(vertical: py, horizontal: px),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Row(
            children: [
              if (r['showLike'] != false)
                const Icon(
                  Icons.favorite_border,
                  color: iconColor,
                  size: iconSize,
                ),
              const SizedBox(width: 16),
              if (r['showSave'] != false)
                const Icon(
                  Icons.bookmark_border,
                  color: iconColor,
                  size: iconSize,
                ),
            ],
          ),
          if (r['showShare'] != false)
            const Icon(Icons.share_outlined, color: iconColor, size: iconSize),
        ],
      ),
    );
  }
}
