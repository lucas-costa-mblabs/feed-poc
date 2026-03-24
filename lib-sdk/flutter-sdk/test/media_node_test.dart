import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:directo_template_builder/src/widgets/media_node.dart';
import 'package:directo_template_builder/src/provider.dart';
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
    return MaterialApp(
      home: CVDTemplateProvider(
        theme: theme,
        templates: [],
        child: Scaffold(body: child),
      ),
    );
  }

  group('MediaNodeWidget', () {
    testWidgets('should render image from URL', (tester) async {
      final node = {
        'type': 'media',
        'url': 'https://example.com/image.png',
        'width': '100%',
        'height': '200',
      };

      // Image.network needs a mocked HttpClient or similar in real flutter tests,
      // but here we just check if the widget exists and has correct properties.
      await tester.pumpWidget(buildTestWidget(MediaNodeWidget(node: node)));

      expect(find.byType(Image), findsOneWidget);
    });

    testWidgets('should resolve variables in URL', (tester) async {
      final node = {'type': 'media', 'url': '{{post.url}}'};
      await tester.pumpWidget(
        buildTestWidget(
          MediaNodeWidget(node: node, dataContext: mockDataContext),
        ),
      );

      final image = tester.widget<Image>(find.byType(Image));
      final networkImage = image.image as NetworkImage;
      expect(networkImage.url, mockDataContext['post']!['url']);
    });

    testWidgets('should return shrinked box if URL is empty', (tester) async {
      final node = {'type': 'media', 'url': ''};
      await tester.pumpWidget(buildTestWidget(MediaNodeWidget(node: node)));

      expect(find.byType(SizedBox), findsOneWidget);
      expect(find.byType(Image), findsNothing);
    });
  });
}
