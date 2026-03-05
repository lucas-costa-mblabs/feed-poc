import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'json_renderer.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'SDUI Demo',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
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
  List<ComponentNode> templateBlocks = [];
  List<dynamic> posts = [];
  bool isLoading = true;

  @override
  void initState() {
    super.initState();
    _loadData();
  }

  Future<void> _loadData() async {
    try {
      final templateString = await rootBundle.loadString(
        'assets/template.json',
      );
      final postsString = await rootBundle.loadString('assets/posts.json');

      final templateJson = json.decode(templateString);
      final List<dynamic> blocksJson = templateJson['template'];

      setState(() {
        templateBlocks = blocksJson
            .map((e) => ComponentNode.fromJson(e))
            .toList();
        posts = json.decode(postsString);
        isLoading = false;
      });
    } catch (e) {
      debugPrint('Error loading JSON: $e');
      setState(() {
        isLoading = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    final screenHeight = MediaQuery.of(context).size.height;
    final cardHeight = screenHeight * 0.75;

    return Scaffold(
      backgroundColor: const Color(0xFFF0F2F5),
      body: isLoading
          ? const Center(child: CircularProgressIndicator())
          : ListView.separated(
              padding: const EdgeInsets.symmetric(vertical: 20, horizontal: 16),
              itemCount: posts.length,
              separatorBuilder: (context, index) => const SizedBox(height: 20),
              itemBuilder: (context, index) {
                final post = posts[index];
                return Center(
                  child: Container(
                    width: 400,
                    height: cardHeight,
                    decoration: BoxDecoration(
                      color: Colors.white,
                      borderRadius: BorderRadius.circular(12),
                      border: Border.all(color: const Color(0xFFE2E8F0)),
                      boxShadow: [
                        BoxShadow(
                          color: Colors.black.withValues(alpha: 0.05),
                          blurRadius: 3,
                          offset: const Offset(0, 1),
                        ),
                        BoxShadow(
                          color: Colors.black.withValues(alpha: 0.01),
                          blurRadius: 2,
                          offset: const Offset(0, 1),
                        ),
                      ],
                    ),
                    clipBehavior: Clip.antiAlias,
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.stretch,
                      children: templateBlocks.map((node) {
                        return JsonRenderer(
                          node: node,
                          dataContext: {'post': post},
                        );
                      }).toList(),
                    ),
                  ),
                );
              },
            ),
    );
  }
}
