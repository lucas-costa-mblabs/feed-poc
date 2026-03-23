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

    CrossAxisAlignment crossAlign = direction == Axis.horizontal
        ? CrossAxisAlignment.center
        : CrossAxisAlignment.stretch;
    if (ai == 'center') {
      crossAlign = CrossAxisAlignment.center;
    } else if (ai == 'flex-start' || ai == 'start') {
      crossAlign = CrossAxisAlignment.start;
    } else if (ai == 'flex-end' || ai == 'end') {
      crossAlign = CrossAxisAlignment.end;
    } else if (ai == 'stretch') {
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
      final childNode = blocks[i] as Map<String, dynamic>;
      final childFlex = int.tryParse(childNode['flex']?.toString() ?? '');

      Widget renderedChild = CVDRenderer(
        node: childNode,
        dataContext: dataContext,
      );

      if (direction == Axis.horizontal) {
        if (childFlex != null) {
          renderedChild = Flexible(
            flex: childFlex,
            fit: FlexFit.tight,
            child: renderedChild,
          );
        }
      } else if (childFlex != null) {
        renderedChild = Flexible(
          flex: childFlex,
          fit: FlexFit.tight,
          child: renderedChild,
        );
      }

      children.add(renderedChild);

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

    final hasFlex = blocks.any((b) => (b as Map)['flex'] != null);
    final row = Row(
      mainAxisSize: hasFlex ? MainAxisSize.max : MainAxisSize.min,
      mainAxisAlignment: mainAlign,
      crossAxisAlignment: crossAlign,
      children: children,
    );

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
                width:
                    double.tryParse(
                      node['borderWidth'].toString().replaceAll('px', ''),
                    ) ??
                    1.0,
              )
            : null,
      ),
      child: direction == Axis.horizontal
          ? (hasFlex
                ? row
                : FittedBox(
                    fit: BoxFit.scaleDown,
                    alignment: Alignment.centerLeft,
                    child: row,
                  ))
          : Column(
              mainAxisSize: MainAxisSize.min,
              mainAxisAlignment: mainAlign,
              crossAxisAlignment: crossAlign,
              children: children,
            ),
    );
  }
}
