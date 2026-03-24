import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:directo_template_builder/src/widgets/price_node.dart';
import 'package:directo_template_builder/src/provider.dart';
import 'package:directo_template_builder/src/models/models.dart';
import 'mock_data.dart';

void main() {
  final theme = CVDTheme(
    colors: {'primary': '#6366F1', 'white': '#FFFFFF', 'gray-900': '#111827'},
    spacing: {'sm': '8px', 'md': '16px'},
    borderRadius: {'md': '8px'},
    typography: {},
  );

  Widget buildTestWidget(Widget child) {
    return MaterialApp(
      home: CVDTemplateProvider(
        theme: theme,
        templates: [],
        child: Scaffold(body: child),
      ),
    );
  }

  group('PriceNodeWidget', () {
    testWidgets('should render current price', (tester) async {
      final node = {
        'type': 'price',
        'price': 'R\$ 99,90',
        'showOriginalPrice': false,
        'showDiscountPercent': false,
      };
      await tester.pumpWidget(buildTestWidget(PriceNodeWidget(node: node)));

      expect(find.text('R\$ 99,90'), findsOneWidget);
    });

    testWidgets('should render original price and discount', (tester) async {
      final node = {
        'type': 'price',
        'price': 'R\$ 99,90',
        'originalPrice': 'R\$ 129,90',
        'discountPercent': '23',
        'showOriginalPrice': true,
        'showDiscountPercent': true,
      };
      await tester.pumpWidget(buildTestWidget(PriceNodeWidget(node: node)));

      expect(find.text('R\$ 99,90'), findsOneWidget);
      expect(find.text('R\$ 129,90'), findsOneWidget);
      expect(find.text('23% OFF'), findsOneWidget);
    });

    testWidgets('should resolve variables', (tester) async {
      final node = {
        'type': 'price',
        'price': '{{post.price}}',
        'originalPrice': '{{post.originalPrice}}',
        'discountPercent': '{{post.discount}}',
      };
      await tester.pumpWidget(
        buildTestWidget(
          PriceNodeWidget(node: node, dataContext: mockDataContext),
        ),
      );

      expect(find.text(mockDataContext['post']!['price']!), findsOneWidget);
      expect(
        find.text(mockDataContext['post']!['originalPrice']!),
        findsOneWidget,
      );
      expect(
        find.text('${mockDataContext['post']!['discount']}% OFF'),
        findsOneWidget,
      );
    });
  });
}
