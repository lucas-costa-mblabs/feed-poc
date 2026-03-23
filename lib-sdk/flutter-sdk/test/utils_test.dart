import 'package:flutter_test/flutter_test.dart';
import 'package:directo_template_builder/src/utils.dart';

void main() {
  group('resolveVariables', () {
    test('should return empty string for null input', () {
      expect(resolveVariables(null, {}), '');
    });

    test('should return empty string for empty input', () {
      expect(resolveVariables('', {}), '');
    });

    test('should resolve simple variable', () {
      final data = {'name': 'John'};
      expect(resolveVariables('Hello {{name}}', data), 'Hello John');
    });

    test('should resolve nested variable', () {
      final data = {
        'user': {'name': 'John'},
      };
      expect(resolveVariables('Hello {{user.name}}', data), 'Hello John');
    });

    test('should return original tag if variable not found', () {
      final data = {'user': 'John'};
      expect(resolveVariables('Hello {{missing}}', data), 'Hello {{missing}}');
    });

    test('should handle multiple variables', () {
      final data = {'first': 'John', 'last': 'Doe'};
      expect(resolveVariables('{{first}} {{last}}', data), 'John Doe');
    });

    test('should resolve to string for other types', () {
      final data = {'count': 42, 'price': 10.5, 'active': true};
      expect(
        resolveVariables(
          'Count: {{count}}, Price: {{price}}, Active: {{active}}',
          data,
        ),
        'Count: 42, Price: 10.5, Active: true',
      );
    });
  });
}
