import 'package:flutter/material.dart';
import 'models/models.dart';

class DirectoAiTemplateProvider extends InheritedWidget {
  final CVDTheme theme;
  final List<DirectoAiTemplate> templates;

  const DirectoAiTemplateProvider({
    super.key,
    required this.theme,
    required this.templates,
    required super.child,
  });

  static DirectoAiTemplateProvider? of(BuildContext context) {
    return context.dependOnInheritedWidgetOfExactType<DirectoAiTemplateProvider>();
  }

  @override
  bool updateShouldNotify(covariant DirectoAiTemplateProvider oldWidget) {
    return theme != oldWidget.theme || templates != oldWidget.templates;
  }
}
