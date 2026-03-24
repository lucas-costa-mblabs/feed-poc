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
  final String title;
  final String url;
  final String price;
  final String originalPrice;
  final String discount;
  final PostShop shop;
  final String templateId;

  Post({
    required this.id,
    required this.title,
    required this.url,
    required this.price,
    required this.originalPrice,
    required this.discount,
    required this.shop,
    required this.templateId,
  });

  factory Post.fromJson(Map<String, dynamic> json) {
    return Post(
      id: json['id'] ?? '',
      title: json['title'] ?? '',
      url: json['url'] ?? '',
      price: json['price'] ?? '',
      originalPrice: json['originalPrice'] ?? '',
      discount: json['discount'] ?? '',
      shop: PostShop.fromJson(json['shop'] ?? {}),
      templateId: json['templateId'] ?? '',
    );
  }

  Map<String, dynamic> toJson() => {
    'id': id,
    'title': title,
    'url': url,
    'price': price,
    'originalPrice': originalPrice,
    'discount': discount,
    'shop': shop.toJson(),
    'templateId': templateId,
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
