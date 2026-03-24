import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:directo_template_builder/src/widgets/misc_nodes.dart';
import 'package:directo_template_builder/src/provider.dart';
import 'package:directo_template_builder/src/models/models.dart';

void main() {
  final theme = CVDTheme(
    colors: {'primary': '#6366F1', 'white': '#FFFFFF', 'gray-100': '#F3F4F6'},
    spacing: {'sm': '8px', 'md': '16px'},
    borderRadius: {'full': '999px'},
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

  group('MiscNodes', () {
    testWidgets('IconNodeWidget should render icon', (tester) async {
      final node = {
        'type': 'icon',
        'icon': 'shoppingbag',
        'size': 24,
        'backgroundColor': 'gray-100',
        'borderRadius': 'full',
      };
      await tester.pumpWidget(buildTestWidget(IconNodeWidget(node: node)));

      expect(find.byType(Icon), findsOneWidget);
      final container = tester.widget<Container>(find.byType(Container));
      final decoration = container.decoration as BoxDecoration;
      expect(decoration.color, const Color(0xFFF3F4F6));
    });

    testWidgets('DividerNodeWidget should render divider', (tester) async {
      final node = {'type': 'divider', 'thickness': 'thick'};
      await tester.pumpWidget(buildTestWidget(DividerNodeWidget(node: node)));

      expect(find.byType(Divider), findsOneWidget);
      final divider = tester.widget<Divider>(find.byType(Divider));
      expect(divider.thickness, 2.0);
    });

    testWidgets('PostInteractionsNodeWidget should render interactions', (
      tester,
    ) async {
      final node = {
        'type': 'post_interactions',
        'showLike': true,
        'showSave': true,
        'showShare': true,
      };
      await tester.pumpWidget(
        buildTestWidget(PostInteractionsNodeWidget(node: node)),
      );

      // Icons for like, save, share
      expect(find.byIcon(Icons.favorite_border), findsOneWidget);
      expect(find.byIcon(Icons.bookmark_border), findsOneWidget);
      expect(find.byIcon(Icons.share_outlined), findsOneWidget);
    });
  });
}
