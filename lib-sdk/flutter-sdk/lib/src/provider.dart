import 'package:flutter/material.dart';
import 'models/models.dart';
import 'tracker.dart';

class DirectoAiTemplateProvider extends InheritedWidget {
  final CVDTheme theme;
  final List<DirectoAiTemplate> templates;
  final DirectoAiConfig config;
  final DirectoAiTracker tracker;

  const DirectoAiTemplateProvider({
    super.key,
    required this.theme,
    required this.templates,
    required this.config,
    required this.tracker,
    required super.child,
  });

  static DirectoAiTemplateProvider? of(BuildContext context) {
    return context
        .dependOnInheritedWidgetOfExactType<DirectoAiTemplateProvider>();
  }

  @override
  bool updateShouldNotify(covariant DirectoAiTemplateProvider oldWidget) {
    return theme != oldWidget.theme ||
        templates != oldWidget.templates ||
        config != oldWidget.config ||
        tracker != oldWidget.tracker;
  }
}
