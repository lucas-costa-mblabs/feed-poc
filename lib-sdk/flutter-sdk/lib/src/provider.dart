import 'package:flutter/material.dart';
import 'models/models.dart';

class CVDTemplateProvider extends InheritedWidget {
  final CVDTheme theme;
  final List<CVDTemplate> templates;

  const CVDTemplateProvider({
    super.key,
    required this.theme,
    required this.templates,
    required super.child,
  });

  static CVDTemplateProvider? of(BuildContext context) {
    return context.dependOnInheritedWidgetOfExactType<CVDTemplateProvider>();
  }

  @override
  bool updateShouldNotify(covariant CVDTemplateProvider oldWidget) {
    return theme != oldWidget.theme || templates != oldWidget.templates;
  }
}
