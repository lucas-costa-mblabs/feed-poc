import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:directo_template_builder/src/widgets/button_node.dart';
import 'package:directo_template_builder/src/provider.dart';
import 'package:directo_template_builder/src/tracker.dart';
import 'package:directo_template_builder/src/models/models.dart';
import 'mock_data.dart';

void main() {
  final theme = CVDTheme(
    colors: {'primary': '#6366F1', 'white': '#FFFFFF'},
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

  group('ButtonNodeWidget', () {
    testWidgets('should render with label', (tester) async {
      final node = {
        'type': 'button',
        'label': 'Test Button',
        'variant': 'primary',
      };
      await tester.pumpWidget(buildTestWidget(ButtonNodeWidget(node: node)));

      expect(find.text('Test Button'), findsOneWidget);
      expect(find.byType(ElevatedButton), findsOneWidget);
    });

    testWidgets('should apply primary variant styles', (tester) async {
      final node = {
        'type': 'button',
        'label': 'Primary',
        'variant': 'primary',
        'background': 'primary',
      };
      await tester.pumpWidget(buildTestWidget(ButtonNodeWidget(node: node)));

      final button = tester.widget<ElevatedButton>(find.byType(ElevatedButton));
      final style = button.style!;

      // Check background color (should be primary from theme)
      expect(style.backgroundColor!.resolve({}), const Color(0xFF6366F1));
    });

    testWidgets('should resolve variables in label', (tester) async {
      final node = {'type': 'button', 'label': 'Click {{post.title}}'};
      await tester.pumpWidget(
        buildTestWidget(
          ButtonNodeWidget(node: node, dataContext: mockDataContext),
        ),
      );

      expect(find.text('Click Test Post Title'), findsOneWidget);
    });
  });
}
