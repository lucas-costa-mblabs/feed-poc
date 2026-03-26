class CVDTheme {
  final Map<String, String> colors;
  final Map<String, String> spacing;
  final Map<String, String> borderRadius;
  final Map<String, String> typography;

  CVDTheme({
    required this.colors,
    required this.spacing,
    required this.borderRadius,
    required this.typography,
  });

  factory CVDTheme.fromJson(Map<String, dynamic> json) {
    return CVDTheme(
      colors: Map<String, String>.from(json['colors'] ?? {}),
      spacing: Map<String, String>.from(json['spacing'] ?? {}),
      borderRadius: Map<String, String>.from(json['borderRadius'] ?? {}),
      typography: Map<String, String>.from(json['typography'] ?? {}),
    );
  }
}

class PostShop {
  final String avatar;
  final String name;

  PostShop({required this.avatar, required this.name});

  factory PostShop.fromJson(Map<String, dynamic> json) {
    return PostShop(avatar: json['avatar'] ?? '', name: json['name'] ?? '');
  }

  Map<String, dynamic> toJson() => {'avatar': avatar, 'name': name};
}

class Post {
  final String id;
  final String? contentId;
  final String title;
  final String url;
  final String price;
  final String originalPrice;
  final String discount;
  final PostShop shop;
  final String templateId;
  final String? template;
  final String? legend;
  final Map<String, dynamic>? customVariables;
  final bool? sponsored;
  final bool? liked;
  final int? likeCount;
  final bool? favorite;

  Post({
    required this.id,
    this.contentId,
    required this.title,
    required this.url,
    required this.price,
    required this.originalPrice,
    required this.discount,
    required this.shop,
    required this.templateId,
    this.template,
    this.legend,
    this.customVariables,
    this.sponsored,
    this.liked,
    this.likeCount,
    this.favorite,
  });

  factory Post.fromJson(Map<String, dynamic> json) {
    return Post(
      id: json['id'] ?? '',
      contentId: json['contentId'],
      title: json['title'] ?? '',
      url: json['url'] ?? '',
      price: json['price'] ?? '',
      originalPrice: json['originalPrice'] ?? '',
      discount: json['discount'] ?? '',
      shop: PostShop.fromJson(json['shop'] ?? {}),
      templateId: json['templateId'] ?? '',
      template: json['template'],
      legend: json['legend'] ?? json['caption'],
      customVariables: json['customVariables'],
      sponsored: json['sponsored'],
      liked: json['liked'],
      likeCount: json['likeCount'],
      favorite: json['favorite'],
    );
  }

  Map<String, dynamic> toJson() => {
    'id': id,
    'contentId': contentId,
    'title': title,
    'url': url,
    'price': price,
    'originalPrice': originalPrice,
    'discount': discount,
    'shop': shop.toJson(),
    'templateId': templateId,
    'template': template,
    'legend': legend,
    'customVariables': customVariables,
    'sponsored': sponsored,
    'liked': liked,
    'likeCount': likeCount,
    'favorite': favorite,
  };
}

class DirectoAiTemplate {
  final String id;
  final String title;
  final bool active;
  final String slug;
  final List<dynamic> template;

  DirectoAiTemplate({
    required this.id,
    required this.title,
    required this.active,
    required this.slug,
    required this.template,
  });

  factory DirectoAiTemplate.fromJson(Map<String, dynamic> json) {
    return DirectoAiTemplate(
      id: json['id'] ?? '',
      title: json['title'] ?? '',
      active: json['active'] ?? false,
      slug: json['slug'] ?? '',
      template: json['template'] ?? [],
    );
  }
}

class DirectoAiConfig {
  final String accountId;
  final String apiKey;
  final String? customerId;
  final String? deviceId;
  final String? baseUrl;

  DirectoAiConfig({
    required this.accountId,
    required this.apiKey,
    this.customerId,
    this.deviceId,
    this.baseUrl,
  });

  factory DirectoAiConfig.fromJson(Map<String, dynamic> json) {
    return DirectoAiConfig(
      accountId: json['accountId'] ?? '',
      apiKey: json['apiKey'] ?? '',
      customerId: json['customerId'],
      deviceId: json['deviceId'],
      baseUrl: json['baseUrl'],
    );
  }
}
