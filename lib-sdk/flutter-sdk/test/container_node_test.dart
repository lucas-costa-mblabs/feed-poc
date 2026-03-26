import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:directo_template_builder/src/widgets/container_node.dart';
import 'package:directo_template_builder/src/provider.dart';
import 'package:directo_template_builder/src/tracker.dart';
import 'package:directo_template_builder/src/models/models.dart';

void main() {
  final theme = CVDTheme(
    colors: {'primary': '#FF0000', 'white': '#FFFFFF'},
    spacing: {'sm': '8px', 'md': '16px'},
    borderRadius: {'md': '8px'},
    typography: {},
  );

  Widget buildTestWidget(Widget child) {
    final config = DirectoAiConfig(accountId: 'test', apiKey: 'test');
    final tracker = DefaultDirectoAiTracker(config);
    return MaterialApp(
      home: DirectoAiTemplateProvider(
        config: config,
        tracker: tracker,
        theme: theme,
        templates: [],
        child: Scaffold(body: child),
      ),
    );
  }

  group('ContainerNodeWidget', () {
    testWidgets('should render a Column by default', (tester) async {
      final node = {
        'type': 'container',
        'blocks': [
          {'id': '1', 'type': 'text', 'value': 'Item 1'},
          {'id': '2', 'type': 'text', 'value': 'Item 2'},
        ],
      };
      await tester.pumpWidget(buildTestWidget(ContainerNodeWidget(node: node)));

      expect(find.byType(Column), findsOneWidget);
      expect(find.text('Item 1'), findsOneWidget);
      expect(find.text('Item 2'), findsOneWidget);
    });

    testWidgets('should render a Row when direction is row', (tester) async {
      final node = {
        'type': 'container',
        'direction': 'row',
        'blocks': [
          {'id': '1', 'type': 'text', 'value': 'Item 1'},
        ],
      };
      await tester.pumpWidget(buildTestWidget(ContainerNodeWidget(node: node)));

      expect(find.byType(Row), findsOneWidget);
      // It should also be wrapped in a FittedBox
      expect(find.byType(FittedBox), findsOneWidget);
    });

    testWidgets('should apply padding and margins', (tester) async {
      final node = {
        'type': 'container',
        'paddingX': 'md',
        'marginX': 'sm',
        'backgroundColor': 'primary',
        'blocks': [],
      };
      await tester.pumpWidget(buildTestWidget(ContainerNodeWidget(node: node)));

      final container = tester.widget<Container>(find.byType(Container).first);
      final decoration = container.decoration as BoxDecoration;
      expect(decoration.color, const Color(0xFFFF0000));
      expect(
        container.padding,
        const EdgeInsets.symmetric(horizontal: 16.0, vertical: 0.0),
      );
      expect(
        container.margin,
        const EdgeInsets.symmetric(horizontal: 8.0, vertical: 0.0),
      );
    });

    testWidgets('should support flex on children in Row', (tester) async {
      final node = {
        'type': 'container',
        'direction': 'row',
        'blocks': [
          {'id': '1', 'type': 'text', 'value': 'F1', 'flex': '2'},
          {'id': '2', 'type': 'text', 'value': 'F2', 'flex': '1'},
        ],
      };
      await tester.pumpWidget(buildTestWidget(ContainerNodeWidget(node: node)));

      final flexible1 = tester.widget<Flexible>(find.byType(Flexible).first);
      final flexible2 = tester.widget<Flexible>(find.byType(Flexible).at(1));

      expect(flexible1.flex, 2);
      expect(flexible2.flex, 1);
      expect(flexible1.fit, FlexFit.tight);
    });
  });
}
