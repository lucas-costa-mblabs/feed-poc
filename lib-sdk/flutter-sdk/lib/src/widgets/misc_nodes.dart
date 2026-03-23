import 'package:flutter/material.dart';
import '../utils.dart';

class IconNodeWidget extends StatelessWidget {
  final Map<String, dynamic> node;

  const IconNodeWidget({super.key, required this.node});

  @override
  Widget build(BuildContext context) {
    final iconName = node['icon']?.toString();
    final p = tokenToPx(context, node['padding']?.toString()) ?? 0.0;
    final size = double.tryParse(node['size']?.toString() ?? '20') ?? 20.0;
    final bgColor = colorToHex(context, node['backgroundColor']?.toString());
    final color =
        colorToHex(context, node['color']?.toString()) == Colors.transparent
        ? const Color(0xFF1F2937)
        : colorToHex(context, node['color']?.toString());

    IconData iconData = Icons.shopping_bag_outlined;
    if (iconName == 'sparkles') iconData = Icons.auto_awesome_outlined;

    return Container(
      padding: EdgeInsets.all(p),
      decoration: BoxDecoration(
        color: bgColor,
        borderRadius: BorderRadius.circular(
          getRadius(context, node['borderRadius']?.toString()),
        ),
      ),
      child: Icon(iconData, size: size, color: color),
    );
  }
}

class PostInteractionsNodeWidget extends StatelessWidget {
  final Map<String, dynamic> node;

  const PostInteractionsNodeWidget({super.key, required this.node});

  @override
  Widget build(BuildContext context) {
    final showLike = node['showLike'] as bool? ?? true;
    final showSave = node['showSave'] as bool? ?? true;
    final showShare = node['showShare'] as bool? ?? true;
    final px = tokenToPx(context, node['paddingX']?.toString()) ?? 0.0;
    final py = tokenToPx(context, node['paddingY']?.toString()) ?? 12.0;

    return Padding(
      padding: EdgeInsets.symmetric(horizontal: px, vertical: py),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Row(
            children: [
              if (showLike)
                const Icon(
                  Icons.favorite_border,
                  size: 24,
                  color: Color(0xFF1F2937),
                ),
              if (showLike && showSave) const SizedBox(width: 16),
              if (showSave)
                const Icon(
                  Icons.bookmark_border,
                  size: 24,
                  color: Color(0xFF1F2937),
                ),
            ],
          ),
          if (showShare)
            const Icon(
              Icons.share_outlined,
              size: 24,
              color: Color(0xFF1F2937),
            ),
        ],
      ),
    );
  }
}

class DividerNodeWidget extends StatelessWidget {
  final Map<String, dynamic> node;

  const DividerNodeWidget({super.key, required this.node});

  @override
  Widget build(BuildContext context) {
    final thickness = node['thickness']?.toString();
    double h = 1.0;
    double space = 12.0;
    Color color = const Color(0xFFE2E8F0);

    if (thickness == 'thin')
      h = 0.5;
    else if (thickness == 'thick')
      h = 2.0;

    return Container(
      height: space,
      alignment: Alignment.center,
      child: Divider(height: h, thickness: h, color: color),
    );
  }
}
