import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:directo_template_builder/src/renderer.dart';
import 'package:directo_template_builder/src/provider.dart';
import 'package:directo_template_builder/src/tracker.dart';
import 'package:directo_template_builder/src/models/models.dart';
import 'package:directo_template_builder/src/widgets/container_node.dart';
import 'package:directo_template_builder/src/widgets/text_node.dart';
import 'mock_data.dart';

void main() {
  final theme = CVDTheme(
    colors: {'primary': '#FF0000', 'white': '#FFFFFF', 'gray-900': '#111827'},
    spacing: {'xs': '4px', 'sm': '8px', 'md': '16px'},
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

  group('CVDRenderer', () {
    testWidgets('should render a container node', (tester) async {
      final template = mockTemplate[0]['template'] as List;
      final node = template[0] as Map<String, dynamic>;
      await tester.pumpWidget(buildTestWidget(CVDRenderer(node: node)));

      expect(find.byType(ContainerNodeWidget), findsOneWidget);
    });

    testWidgets('should render a text node', (tester) async {
      final template = mockTemplate[0]['template'] as List;
      final container = template[3] as Map<String, dynamic>;
      final blocks = container['blocks'] as List;
      final node = blocks[0] as Map<String, dynamic>;
      await tester.pumpWidget(buildTestWidget(CVDRenderer(node: node)));

      expect(find.byType(TextNodeWidget), findsOneWidget);
      expect(find.text('Aniversário Super João'), findsOneWidget);
    });

    testWidgets('should render unknown node fallback', (tester) async {
      final node = {'type': 'invalid_type', 'id': 'error-1'};
      await tester.pumpWidget(buildTestWidget(CVDRenderer(node: node)));

      expect(find.textContaining('Unknown Node: invalid_type'), findsOneWidget);
    });

    testWidgets('should render error boundary on catch', (tester) async {
      // Passing an int for 'type' will cause a TypeError in CVDRenderer's build
      // because it does 'node['type'] as String?'.
      final node = {'type': 123};
      await tester.pumpWidget(
        buildTestWidget(CVDRenderer(node: node as dynamic)),
      );

      // If it caught an error, it should show its error widget
      expect(find.textContaining('Error 123:'), findsOneWidget);
    });
  });
}
