import 'package:flutter/material.dart';
import 'models/models.dart';
import 'provider.dart';
import 'renderer.dart';
import 'utils.dart';

class CVDPost extends StatelessWidget {
  final Post post;

  const CVDPost({super.key, required this.post});

  @override
  Widget build(BuildContext context) {
    final sdk = DirectoAiTemplateProvider.of(context);
    if (sdk == null) {
      return const Center(
        child: Text('Error: DirectoAiTemplateProvider not found!'),
      );
    }

    // Regra de Legado: Se o post tiver um template HTML, ele tem prioridade total
    if (post.template != null && post.template!.isNotEmpty) {
      final legacyContext = {
        ...post.toJson(),
        'Title': post.title,
        'ImageURL': post.url,
        'Caption': post.legend,
        'CustomVariables': post.customVariables ?? {},
        'Sponsored': post.sponsored ?? false,
        'Liked': post.liked ?? false,
        'LikeCount': post.likeCount ?? 0,
        'Favorite': post.favorite ?? false,
        ...(post.customVariables ?? {}),
      };

      final renderedHtml = resolveVariables(post.template, legacyContext);

      return Container(
        width: double.infinity,
        clipBehavior: Clip.antiAlias,
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(12),
          border: Border.all(color: const Color(0xFFE2E8F0)),
        ),
        child: Padding(
          padding: const EdgeInsets.all(12.0),
          child: Text(
            renderedHtml,
            style: const TextStyle(fontSize: 14, color: Colors.black),
          ),
        ),
      );
    }

    // Fallback para JSON Template (Builder)
    DirectoAiTemplate? template;
    try {
      template = sdk.templates.firstWhere(
        (t) => t.templateId == post.templateId,
      );
    } catch (e) {
      // Not found
    }

    if (template == null) {
      return Container(
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(12),
          border: Border.all(
            color: Colors.orange.withOpacity(0.5),
            style: BorderStyle.solid,
          ),
        ),
        child: Center(
          child: Text(
            'Template não encontrado: ${post.templateId}',
            style: const TextStyle(color: Colors.grey),
          ),
        ),
      );
    }

    final dataContext = {'post': post.toJson()};

    return Container(
      width: double.infinity,
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: const Color(0xFFE2E8F0)),
        boxShadow: const [
          BoxShadow(
            color: Color(0x0D000000),
            blurRadius: 3,
            offset: Offset(0, 1),
          ),
          BoxShadow(
            color: Color(0x03000000),
            blurRadius: 2,
            offset: Offset(0, 1),
          ),
        ],
      ),
      clipBehavior: Clip.antiAlias,
      child: Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: template.data.map((node) {
          return CVDRenderer(
            node: node as Map<String, dynamic>,
            dataContext: dataContext,
          );
        }).toList(),
      ),
    );
  }
}
