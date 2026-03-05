import 'package:flutter/material.dart';
import 'widgets/renderer/container_node.dart';
import 'widgets/renderer/text_node.dart';
import 'widgets/renderer/media_node.dart';
import 'widgets/renderer/divider_node.dart';
import 'widgets/renderer/button_node.dart';
import 'widgets/renderer/price_node.dart';
import 'widgets/renderer/icon_node.dart';
import 'widgets/renderer/post_interactions_node.dart';

class ComponentNode {
  final String id;
  final String type;
  final int? flex;
  final Map<String, dynamic> raw;

  ComponentNode({
    required this.id,
    required this.type,
    this.flex,
    required this.raw,
  });

  factory ComponentNode.fromJson(Map<String, dynamic> json) {
    return ComponentNode(
      id: json['id'] as String? ?? '',
      type: json['type'] as String? ?? 'unknown',
      flex: json['flex'] as int?,
      raw: json,
    );
  }
}

class JsonRenderer extends StatelessWidget {
  final ComponentNode node;
  final Map<String, dynamic>? dataContext;

  const JsonRenderer({super.key, required this.node, this.dataContext});

  static final Map<
    String,
    Widget Function(ComponentNode, Map<String, dynamic>?)
  >
  _nodeTypes = {
    'container': (node, data) =>
        ContainerNodeWidget(node: node, dataContext: data),
    'text': (node, data) => TextNodeWidget(node: node, dataContext: data),
    'media': (node, data) => MediaNodeWidget(node: node, dataContext: data),
    'divider': (node, data) => DividerNodeWidget(node: node),
    'button': (node, data) => ButtonNodeWidget(node: node, dataContext: data),
    'price': (node, data) => PriceNodeWidget(node: node, dataContext: data),
    'icon': (node, data) => IconNodeWidget(node: node),
    'post_interactions': (node, data) => PostInteractionsNodeWidget(node: node),
  };

  @override
  Widget build(BuildContext context) {
    final builder = _nodeTypes[node.type];

    Widget child;
    if (builder == null) {
      child = Container(
        padding: const EdgeInsets.all(8),
        decoration: BoxDecoration(border: Border.all(color: Colors.red)),
        child: Text('Unknown Node: ${node.type}'),
      );
    } else {
      child = builder(node, dataContext);
    }

    // Apply flex wrapper if needed
    if (node.flex != null && node.flex! > 0) {
      return Expanded(flex: node.flex!, child: child);
    }
    return child;
  }
}
