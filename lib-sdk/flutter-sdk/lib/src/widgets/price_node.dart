import 'package:flutter/material.dart';
import '../utils.dart';

class PriceNodeWidget extends StatelessWidget {
  final Map<String, dynamic> node;
  final Map<String, dynamic>? dataContext;

  const PriceNodeWidget({super.key, required this.node, this.dataContext});

  @override
  Widget build(BuildContext context) {
    final price = resolveVariables(node['price']?.toString(), dataContext);
    final originalPrice = resolveVariables(
      node['originalPrice']?.toString(),
      dataContext,
    );
    final discount = resolveVariables(
      node['discountPercent']?.toString(),
      dataContext,
    );
    final showOriginal = node['showOriginalPrice'] as bool? ?? true;
    final showDiscount = node['showDiscountPercent'] as bool? ?? true;

    final px = tokenToPx(context, node['paddingX']?.toString()) ?? 0.0;
    final py = tokenToPx(context, node['paddingY']?.toString()) ?? 8.0;

    return Padding(
      padding: EdgeInsets.symmetric(horizontal: px, vertical: py),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              if (showOriginal && originalPrice.isNotEmpty)
                Text(
                  originalPrice,
                  style: const TextStyle(
                    fontSize: 12,
                    color: Color(0xFF94A3B8),
                    decoration: TextDecoration.lineThrough,
                  ),
                ),
              if (showOriginal &&
                  originalPrice.isNotEmpty &&
                  showDiscount &&
                  discount.isNotEmpty)
                const SizedBox(width: 6),
              if (showDiscount && discount.isNotEmpty)
                Container(
                  padding: const EdgeInsets.symmetric(
                    horizontal: 4,
                    vertical: 1,
                  ),
                  decoration: BoxDecoration(
                    color: const Color(0xFFFECACA),
                    borderRadius: BorderRadius.circular(3),
                  ),
                  child: Text(
                    '$discount% OFF',
                    style: const TextStyle(
                      backgroundColor: Colors.transparent,
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
            price,
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
