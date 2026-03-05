import 'package:flutter/material.dart';
import '../../json_renderer.dart';
import 'renderer_utils.dart';

class ContainerNodeWidget extends StatelessWidget {
  final ComponentNode node;
  final Map<String, dynamic>? dataContext;

  const ContainerNodeWidget({super.key, required this.node, this.dataContext});

  @override
  Widget build(BuildContext context) {
    final r = node.raw;
    final direction = r['direction'] == 'row' ? Axis.horizontal : Axis.vertical;
    final px = tokenToPx(r['paddingX']) ?? 0.0;
    final py = tokenToPx(r['paddingY']) ?? 0.0;
    final gap = tokenToPx(r['gap']) ?? 0.0;
    final blocks = r['blocks'] as List<dynamic>? ?? [];
    final hasFlex = node.flex != null && node.flex! > 0;

    List<Widget> children = [];
    for (int i = 0; i < blocks.length; i++) {
      final childNode = ComponentNode.fromJson(blocks[i]);
      children.add(JsonRenderer(node: childNode, dataContext: dataContext));
      if (i < blocks.length - 1 && gap > 0) {
        children.add(
          SizedBox(
            width: direction == Axis.horizontal ? gap : 0,
            height: direction == Axis.vertical ? gap : 0,
          ),
        );
      }
    }

    MainAxisAlignment mainAlign = MainAxisAlignment.start;
    CrossAxisAlignment crossAlign = CrossAxisAlignment.stretch;

    if (r['justifyContent'] == 'center') {
      mainAlign = MainAxisAlignment.center;
    } else if (r['justifyContent'] == 'space-between') {
      mainAlign = MainAxisAlignment.spaceBetween;
    }

    if (r['alignItems'] == 'center') {
      crossAlign = CrossAxisAlignment.center;
    } else if (r['alignItems'] == 'flex-start') {
      crossAlign = CrossAxisAlignment.start;
    } else if (r['alignItems'] == 'flex-end') {
      crossAlign = CrossAxisAlignment.end;
    }

    if (direction == Axis.horizontal &&
        crossAlign == CrossAxisAlignment.stretch) {
      crossAlign = CrossAxisAlignment.center;
    }

    // When the container has flex, use MainAxisSize.max to fill the Flexible wrapper
    final mainAxisSize = hasFlex ? MainAxisSize.max : MainAxisSize.min;

    Widget container = Container(
      padding: EdgeInsets.symmetric(horizontal: px, vertical: py),
      decoration: BoxDecoration(
        color: colorToHex(r['backgroundColor']),
        borderRadius: BorderRadius.circular(getRadius(r['borderRadius'])),
        border: r['borderWidth'] != null
            ? Border.all(
                color: colorToHex(r['borderColor']) == Colors.transparent
                    ? Colors.black
                    : colorToHex(r['borderColor']),
                width:
                    double.tryParse(
                      r['borderWidth']?.toString().replaceAll('px', '') ?? '1',
                    ) ??
                    1.0,
              )
            : null,
      ),
      child: direction == Axis.horizontal
          ? Row(
              mainAxisAlignment: mainAlign,
              crossAxisAlignment: crossAlign,
              children: children,
            )
          : Column(
              mainAxisSize: mainAxisSize,
              mainAxisAlignment: mainAlign,
              crossAxisAlignment: crossAlign,
              children: children,
            ),
    );

    return container;
  }
}
