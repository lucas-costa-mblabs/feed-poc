import 'package:flutter/material.dart';
import '../provider.dart';
import '../utils.dart';

class IconNodeWidget extends StatelessWidget {
  final Map<String, dynamic> node;

  const IconNodeWidget({super.key, required this.node});

  @override
  Widget build(BuildContext context) {
    final iconName = node['icon']?.toString();
    final p = tokenToPx(context, node['padding']?.toString()) ?? 0.0;
    final size = double.tryParse(node['size']?.toString() ?? '20') ?? 20.0;
    final bgColor = colorToHex(context, node['backgroundColor']?.toString());
    final color =
        colorToHex(context, node['color']?.toString()) == Colors.transparent
        ? const Color(0xFF1F2937)
        : colorToHex(context, node['color']?.toString());

    IconData iconData = Icons.shopping_bag_outlined;
    if (iconName == 'sparkles') iconData = Icons.auto_awesome_outlined;

    return Container(
      padding: EdgeInsets.all(p),
      decoration: BoxDecoration(
        color: bgColor,
        borderRadius: BorderRadius.circular(
          getRadius(context, node['borderRadius']?.toString()),
        ),
      ),
      child: Icon(iconData, size: size, color: color),
    );
  }
}

class PostInteractionsNodeWidget extends StatefulWidget {
  final Map<String, dynamic> node;
  final Map<String, dynamic>? dataContext;

  const PostInteractionsNodeWidget({
    super.key,
    required this.node,
    this.dataContext,
  });

  @override
  State<PostInteractionsNodeWidget> createState() =>
      _PostInteractionsNodeWidgetState();
}

class _PostInteractionsNodeWidgetState
    extends State<PostInteractionsNodeWidget> {
  bool isLiked = false;
  bool isFavorited = false;

  @override
  Widget build(BuildContext context) {
    final sdk = DirectoAiTemplateProvider.of(context);
    if (sdk == null) return const SizedBox.shrink();

    final postData = widget.dataContext?['post'];
    final contentId = postData?['id']?.toString();
    final campaignId = postData?['campaignId']?.toString();
    final title = postData?['title']?.toString();

    final showLike = widget.node['showLike'] as bool? ?? true;
    final showSave = widget.node['showSave'] as bool? ?? true;
    final showShare = widget.node['showShare'] as bool? ?? true;
    final px = tokenToPx(context, widget.node['paddingX']?.toString()) ?? 0.0;
    final py = tokenToPx(context, widget.node['paddingY']?.toString()) ?? 12.0;

    return Padding(
      padding: EdgeInsets.symmetric(horizontal: px, vertical: py),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Row(
            children: [
              if (showLike)
                IconButton(
                  icon: Icon(
                    isLiked ? Icons.favorite : Icons.favorite_border,
                    size: 24,
                    color: isLiked ? Colors.red : const Color(0xFF1F2937),
                  ),
                  onPressed: () {
                    if (contentId != null) {
                      setState(() => isLiked = !isLiked);
                      sdk.tracker.toggleLike(contentId, campaignId: campaignId);
                    }
                  },
                ),
              if (showLike && showSave) const SizedBox(width: 8),
              if (showSave)
                IconButton(
                  icon: Icon(
                    isFavorited ? Icons.bookmark : Icons.bookmark_border,
                    size: 24,
                    color: isFavorited
                        ? const Color(0xFF374151)
                        : const Color(0xFF1F2937),
                  ),
                  onPressed: () {
                    if (contentId != null) {
                      final prev = isFavorited;
                      setState(() => isFavorited = !isFavorited);
                      sdk.tracker.toggleFavorite(
                        contentId,
                        prev,
                        campaignId: campaignId,
                      );
                    }
                  },
                ),
            ],
          ),
          if (showShare)
            IconButton(
              icon: const Icon(
                Icons.share_outlined,
                size: 24,
                color: Color(0xFF1F2937),
              ),
              onPressed: () {
                if (contentId != null) {
                  sdk.tracker.shareContent(
                    contentId,
                    campaignId: campaignId,
                    title: title,
                  );
                }
              },
            ),
        ],
      ),
    );
  }
}

class DividerNodeWidget extends StatelessWidget {
  final Map<String, dynamic> node;

  const DividerNodeWidget({super.key, required this.node});

  @override
  Widget build(BuildContext context) {
    final thickness = node['thickness']?.toString();
    double h = 1.0;
    double space = 12.0;
    Color color = const Color(0xFFE2E8F0);

    if (thickness == 'thin')
      h = 0.5;
    else if (thickness == 'thick')
      h = 2.0;

    return Container(
      height: space,
      alignment: Alignment.center,
      child: Divider(height: h, thickness: h, color: color),
    );
  }
}

class HtmlNodeWidget extends StatelessWidget {
  final Map<String, dynamic> node;
  final Map<String, dynamic>? dataContext;

  const HtmlNodeWidget({super.key, required this.node, this.dataContext});

  @override
  Widget build(BuildContext context) {
    final rawHtml = resolveVariables(
      node['html']?.toString(),
      dataContext as Map<String, dynamic>?,
    );

    if (rawHtml.isEmpty) return const SizedBox.shrink();

    final px = tokenToPx(context, node['paddingX']?.toString()) ?? 0.0;
    final py = tokenToPx(context, node['paddingY']?.toString()) ?? 0.0;

    // Flutter não suporta dangerouslySetInnerHTML.
    // Renderiza o HTML como texto simples. Para HTML complexo,
    // considere usar flutter_html ou flutter_widget_from_html.
    return Padding(
      padding: EdgeInsets.symmetric(horizontal: px, vertical: py),
      child: Text(
        rawHtml.replaceAll(RegExp(r'<[^>]*>'), ''),
        style: const TextStyle(fontSize: 14, color: Colors.black),
      ),
    );
  }
}
