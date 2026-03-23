import 'package:flutter/material.dart';
import 'widgets/container_node.dart';
import 'widgets/text_node.dart';
import 'widgets/media_node.dart';
import 'widgets/button_node.dart';
import 'widgets/price_node.dart';
import 'widgets/misc_nodes.dart';

class CVDRenderer extends StatelessWidget {
  final Map<String, dynamic> node;
  final Map<String, dynamic>? dataContext;

  const CVDRenderer({super.key, required this.node, this.dataContext});

  static final Map<
    String,
    Widget Function(Map<String, dynamic>, Map<String, dynamic>?)
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
    try {
      final type = node['type'] as String? ?? 'unknown';
      final builder = _nodeTypes[type];

      if (builder == null) {
        return Container(
          padding: const EdgeInsets.all(8),
          decoration: BoxDecoration(border: Border.all(color: Colors.red)),
          child: Text('Unknown Node: $type'),
        );
      }

      return builder(node, dataContext);
    } catch (e, stack) {
      debugPrint('CVD ERROR rendering node ${node['id']}: $e');
      return Container(
        color: Colors.red[50],
        padding: const EdgeInsets.all(8),
        child: Text(
          'Error ${node['type']}: $e',
          style: const TextStyle(color: Colors.red, fontSize: 10),
        ),
      );
    }
  }
}
