import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:directo_template_builder/src/utils.dart';
import 'package:directo_template_builder/src/provider.dart';
import 'package:directo_template_builder/src/models/models.dart';

void main() {
  final theme = CVDTheme(
    colors: {'primary': '#FF0000', 'white': '#FFFFFF'},
    spacing: {'sm': '8px', 'md': '16px'},
    borderRadius: {'sm': '4px', 'md': '8px'},
    typography: {'body': '16px', 'heading1': '32px'},
  );

  Widget buildTestWidget(WidgetBuilder builder) {
    return MaterialApp(
      home: CVDTemplateProvider(
        theme: theme,
        templates: [],
        child: Builder(builder: builder),
      ),
    );
  }

  group('Theme Utilities', () {
    testWidgets('tokenToPx should resolve spacing tokens', (tester) async {
      await tester.pumpWidget(
        buildTestWidget((context) {
          expect(tokenToPx(context, 'sm'), 8.0);
          expect(tokenToPx(context, 'md'), 16.0);
          expect(tokenToPx(context, '24px'), 24.0);
          expect(tokenToPx(context, '32'), 32.0);
          expect(tokenToPx(context, null), null);
          return const SizedBox();
        }),
      );
    });

    testWidgets('getRadius should resolve border radius tokens', (
      tester,
    ) async {
      await tester.pumpWidget(
        buildTestWidget((context) {
          expect(getRadius(context, 'sm'), 4.0);
          expect(getRadius(context, 'md'), 8.0);
          expect(getRadius(context, '12px'), 12.0);
          expect(getRadius(context, '16'), 16.0);
          expect(getRadius(context, null), 0.0);
          return const SizedBox();
        }),
      );
    });

    testWidgets('colorToHex should resolve color tokens', (tester) async {
      await tester.pumpWidget(
        buildTestWidget((context) {
          expect(colorToHex(context, 'primary'), const Color(0xFFFF0000));
          expect(colorToHex(context, 'white'), Colors.white);
          expect(colorToHex(context, '#00FF00'), const Color(0xFF00FF00));
          expect(colorToHex(context, 'transparent'), Colors.transparent);
          expect(colorToHex(context, null), Colors.transparent);
          return const SizedBox();
        }),
      );
    });
  });
}
