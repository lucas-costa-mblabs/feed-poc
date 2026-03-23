import 'package:flutter/material.dart';
import '../renderer.dart';
import '../utils.dart';

class ContainerNodeWidget extends StatelessWidget {
  final Map<String, dynamic> node;
  final Map<String, dynamic>? dataContext;

  const ContainerNodeWidget({super.key, required this.node, this.dataContext});

  @override
  Widget build(BuildContext context) {
    final blocks = node['blocks'] as List<dynamic>? ?? [];
    final directionStr = node['direction']?.toString() ?? 'column';
    final ai = node['alignItems']?.toString();
    final jc = node['justifyContent']?.toString();
    final gap = tokenToPx(context, node['gap']) ?? 0.0;

    Axis direction = directionStr == 'row' ? Axis.horizontal : Axis.vertical;

    CrossAxisAlignment crossAlign = CrossAxisAlignment.start;
    if (ai == 'center') {
      crossAlign = CrossAxisAlignment.center;
    } else if (ai == 'flex-start') {
      crossAlign = CrossAxisAlignment.start;
    } else if (ai == 'flex-end') {
      crossAlign = CrossAxisAlignment.end;
    } else if (ai == 'stretch') {
      crossAlign = CrossAxisAlignment.stretch;
    } else if (ai == null && directionStr == 'column') {
      crossAlign = CrossAxisAlignment.stretch;
    }

    MainAxisAlignment mainAlign = MainAxisAlignment.start;
    if (jc == 'center') {
      mainAlign = MainAxisAlignment.center;
    } else if (jc == 'space-between') {
      mainAlign = MainAxisAlignment.spaceBetween;
    } else if (jc == 'flex-end') {
      mainAlign = MainAxisAlignment.end;
    }

    final children = <Widget>[];
    for (int i = 0; i < blocks.length; i++) {
      children.add(
        CVDRenderer(
          node: blocks[i] as Map<String, dynamic>,
          dataContext: dataContext,
        ),
      );

      if (gap > 0 && i < blocks.length - 1) {
        children.add(
          SizedBox(
            width: direction == Axis.horizontal ? gap : 0,
            height: direction == Axis.vertical ? gap : 0,
          ),
        );
      }
    }

    final px = tokenToPx(context, node['paddingX']) ?? 0.0;
    final py = tokenToPx(context, node['paddingY']) ?? 0.0;
    final mx = tokenToPx(context, node['marginX']) ?? 0.0;
    final my = tokenToPx(context, node['marginY']) ?? 0.0;

    final widthStr = node['width']?.toString();
    final heightStr = node['height']?.toString();
    final width = (widthStr == '100%')
        ? null
        : (double.tryParse(widthStr ?? '') ?? null);
    final height = (heightStr == '100%')
        ? null
        : (double.tryParse(heightStr ?? '') ?? null);

    return Container(
      width: width,
      height: height,
      margin: EdgeInsets.symmetric(horizontal: mx, vertical: my),
      padding: EdgeInsets.symmetric(horizontal: px, vertical: py),
      decoration: BoxDecoration(
        color: colorToHex(context, node['backgroundColor']),
        borderRadius: BorderRadius.circular(
          getRadius(context, node['borderRadius']),
        ),
        border: node['borderWidth'] != null
            ? Border.all(
                color: colorToHex(context, node['borderColor']),
                width: double.tryParse(node['borderWidth'].toString()) ?? 1.0,
              )
            : null,
      ),
      child: direction == Axis.horizontal
          ? Row(
              mainAxisSize: MainAxisSize.min,
              mainAxisAlignment: mainAlign,
              crossAxisAlignment: crossAlign,
              children: children,
            )
          : Column(
              mainAxisSize: MainAxisSize.min,
              mainAxisAlignment: mainAlign,
              crossAxisAlignment: crossAlign,
              children: children,
            ),
    );
  }
}
