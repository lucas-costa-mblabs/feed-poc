import 'package:flutter/material.dart';
import '../../json_renderer.dart';
import 'renderer_utils.dart';

class PriceNodeWidget extends StatelessWidget {
  final ComponentNode node;
  final Map<String, dynamic>? dataContext;

  const PriceNodeWidget({super.key, required this.node, this.dataContext});

  @override
  Widget build(BuildContext context) {
    final r = node.raw;
    final px = tokenToPx(r['paddingX']) ?? 0.0;
    final py = tokenToPx(r['paddingY']) ?? 8.0;

    return Padding(
      padding: EdgeInsets.symmetric(vertical: py, horizontal: px),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              if (r['showOriginalPrice'] != false && r['originalPrice'] != null)
                Text(
                  resolveVariables(r['originalPrice'], dataContext),
                  style: const TextStyle(
                    fontSize: 12,
                    color: Color(0xFF94A3B8),
                    decoration: TextDecoration.lineThrough,
                  ),
                ),
              if (r['showOriginalPrice'] != false &&
                  r['showDiscountPercent'] != false)
                const SizedBox(width: 6),
              if (r['showDiscountPercent'] != false &&
                  r['discountPercent'] != null)
                Container(
                  padding: const EdgeInsets.symmetric(
                    horizontal: 4,
                    vertical: 2,
                  ),
                  decoration: BoxDecoration(
                    color: const Color(0xFFFECACA),
                    borderRadius: BorderRadius.circular(3),
                  ),
                  child: Text(
                    '${resolveVariables(r['discountPercent'], dataContext)}% OFF',
                    style: const TextStyle(
                      color: Color(0xFFDC2626),
                      fontSize: 10,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ),
            ],
          ),
          const SizedBox(height: 2),
          Text(
            resolveVariables(r['price'], dataContext),
            style: const TextStyle(
              fontSize: 20,
              fontWeight: FontWeight.bold,
              color: Color(0xFF111827),
            ),
          ),
        ],
      ),
    );
  }
}
