import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:directo_template_builder/src/widgets/text_node.dart';
import 'package:directo_template_builder/src/provider.dart';
import 'package:directo_template_builder/src/models/models.dart';

void main() {
  final theme = CVDTheme(
    colors: {'primary': '#FF0000', 'white': '#FFFFFF', 'gray-900': '#111827'},
    spacing: {},
    borderRadius: {},
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

  group('TextNodeWidget', () {
    testWidgets('should render text value', (tester) async {
      final node = {'type': 'text', 'value': 'Hello World'};
      await tester.pumpWidget(buildTestWidget(TextNodeWidget(node: node)));

      expect(find.text('Hello World'), findsOneWidget);
    });

    testWidgets('should resolve variables in value', (tester) async {
      final node = {'type': 'text', 'value': 'Hello {{name}}'};
      final data = {'name': 'John'};
      await tester.pumpWidget(
        buildTestWidget(TextNodeWidget(node: node, dataContext: data)),
      );

      expect(find.text('Hello John'), findsOneWidget);
    });

    testWidgets('should apply typography styles', (tester) async {
      final node = {'type': 'text', 'value': 'Title', 'typography': 'heading1'};
      await tester.pumpWidget(buildTestWidget(TextNodeWidget(node: node)));

      final text = tester.widget<Text>(find.text('Title'));
      expect(text.style?.fontSize, 32.0);
      expect(text.style?.fontWeight, FontWeight.bold);
    });

    testWidgets('should apply custom fontWeight', (tester) async {
      final node = {
        'type': 'text',
        'value': 'Semibold',
        'fontWeight': 'semiBold',
      };
      await tester.pumpWidget(buildTestWidget(TextNodeWidget(node: node)));

      final text = tester.widget<Text>(find.text('Semibold'));
      expect(text.style?.fontWeight, FontWeight.w600);
    });

    testWidgets('should apply textAlign', (tester) async {
      final node = {'type': 'text', 'value': 'Center', 'textAlign': 'center'};
      await tester.pumpWidget(buildTestWidget(TextNodeWidget(node: node)));

      final text = tester.widget<Text>(find.text('Center'));
      expect(text.textAlign, TextAlign.center);
    });

    testWidgets('should apply color from theme', (tester) async {
      final node = {'type': 'text', 'value': 'Colored', 'color': 'primary'};
      await tester.pumpWidget(buildTestWidget(TextNodeWidget(node: node)));

      final text = tester.widget<Text>(find.text('Colored'));
      expect(text.style?.color, const Color(0xFFFF0000));
    });
  });
}
