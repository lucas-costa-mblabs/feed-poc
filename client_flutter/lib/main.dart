import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:directo_template_builder/directo_template_builder.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'SDUI Flutter SDK Demo',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.indigo),
        useMaterial3: true,
      ),
      home: const SduiFeedScreen(),
    );
  }
}

class SduiFeedScreen extends StatefulWidget {
  const SduiFeedScreen({super.key});

  @override
  State<SduiFeedScreen> createState() => _SduiFeedScreenState();
}

class _SduiFeedScreenState extends State<SduiFeedScreen> {
  CVDTheme? theme;
  List<DirectoAiTemplate> templates = [];
  List<Post> posts = [];
  bool isLoading = true;

  @override
  void initState() {
    super.initState();
    _loadData();
  }

  Future<void> _loadData() async {
    try {
      debugPrint('DEBUG: Starting _loadData...');
      final themeString = await rootBundle.loadString('assets/theme.json');
      final templatesString = await rootBundle.loadString(
        'assets/template.json',
      );
      final postsString = await rootBundle.loadString('assets/posts.json');
      debugPrint('DEBUG: JSONs loaded from assets.');

      final themeJson = json.decode(themeString);
      final List<dynamic> templatesJson = json.decode(templatesString);
      final List<dynamic> postsJson = json.decode(postsString);
      debugPrint('DEBUG: JSONs decoded. Posts count: ${postsJson.length}');

      final parsedTheme = CVDTheme.fromJson(themeJson);
      final parsedTemplates = templatesJson
          .map((e) => DirectoAiTemplate.fromJson(e))
          .toList();
      final parsedPosts = postsJson.map((e) => Post.fromJson(e)).toList();
      debugPrint(
        'DEBUG: Models parsed. Posts: ${parsedPosts.length}, Templates: ${parsedTemplates.length}',
      );

      setState(() {
        theme = parsedTheme;
        templates = parsedTemplates;
        posts = parsedPosts;
        isLoading = false;
      });
      debugPrint('DEBUG: State updated. isLoading: false');
    } catch (e, stack) {
      debugPrint('DEBUG ERROR: $e');
      debugPrint('STACKTRACE: $stack');
      setState(() {
        isLoading = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    if (isLoading || theme == null) {
      return const Scaffold(body: Center(child: CircularProgressIndicator()));
    }

    final config = DirectoAiConfig(
      accountId: 'test-account',
      apiKey: 'test-api-key',
    );
    final tracker = DefaultDirectoAiTracker(config);

    // O SDK centraliza toda a renderização e gestão de templates
    return DirectoAiTemplateProvider(
      theme: theme!,
      templates: templates,
      config: config,
      tracker: tracker,
      child: Scaffold(
        backgroundColor: const Color(0xFFF8FAFC),
        appBar: AppBar(
          title: const Text(
            'Directo SDUI SDK',
            style: TextStyle(fontWeight: FontWeight.bold),
          ),
          centerTitle: true,
          backgroundColor: Colors.white,
          elevation: 0,
        ),
        body: ListView.separated(
          padding: const EdgeInsets.symmetric(vertical: 20, horizontal: 16),
          itemCount: posts.length,
          separatorBuilder: (context, index) => const SizedBox(height: 20),
          itemBuilder: (context, index) {
            return Center(
              child: ConstrainedBox(
                constraints: const BoxConstraints(maxWidth: 400),
                child: CVDPost(post: posts[index]),
              ),
            );
          },
        ),
      ),
    );
  }
}
