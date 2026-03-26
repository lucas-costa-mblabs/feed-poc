import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:uuid/uuid.dart';
import 'models/models.dart';

abstract class DirectoAiTracker {
  Future<void> trackEvent(String name, Map<String, dynamic> data);
  Future<void> trackImpression(String contentId, Map<String, dynamic> data);
  Future<void> toggleLike(String contentId, {String? campaignId});
  Future<void> toggleFavorite(
    String contentId,
    bool isFavorited, {
    String? campaignId,
  });
  Future<void> shareContent(
    String contentId, {
    String? campaignId,
    String? title,
  });
}

class DefaultDirectoAiTracker implements DirectoAiTracker {
  final DirectoAiConfig config;
  final _uuid = const Uuid();

  DefaultDirectoAiTracker(this.config);

  String get baseUrl => config.baseUrl ?? "https://api.directoai.com.br";

  Future<void> _sendMessageQueue(Map<String, dynamic> payload) async {
    try {
      final response = await http.post(
        Uri.parse('$baseUrl/metric-queue'),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode(payload),
      );
      if (response.statusCode >= 400) {
        print(
          'DirectoAi SDK: Error sending message to queue: ${response.statusCode}',
        );
      }
    } catch (e) {
      print('DirectoAi SDK: Failed to send analytic event: $e');
    }
  }

  @override
  Future<void> trackEvent(String name, Map<String, dynamic> data) async {
    final payload = {
      'type': 'click',
      'data': {
        ...data,
        'accountId': config.accountId,
        'customerId': config.customerId,
        'deviceId': config.deviceId,
        'eventType': name,
        'createdAt': DateTime.now().toUtc().toIso8601String(),
      },
    };
    return _sendMessageQueue(payload);
  }

  @override
  Future<void> trackImpression(
    String contentId,
    Map<String, dynamic> data,
  ) async {
    final payload = {
      'type': 'view',
      'data': {
        ...data,
        'contentId': contentId,
        'accountId': config.accountId,
        'customerId': config.customerId,
        'deviceId': config.deviceId,
        'createdAt': DateTime.now().toUtc().toIso8601String(),
      },
    };
    return _sendMessageQueue(payload);
  }

  @override
  Future<void> toggleLike(String contentId, {String? campaignId}) async {
    return trackEvent('click-like', {
      'contentId': contentId,
      if (campaignId != null) 'campaignId': campaignId,
    });
  }

  @override
  Future<void> toggleFavorite(
    String contentId,
    bool isFavorited, {
    String? campaignId,
  }) async {
    final method = isFavorited ? 'DELETE' : 'POST';
    final url = '$baseUrl/campaign/api/v1/feed/favorites';

    try {
      final response = await (method == 'POST'
          ? http.post(
              Uri.parse(url),
              headers: {'Content-Type': 'application/json'},
              body: jsonEncode({
                'accountId': config.accountId,
                'customerId': config.customerId,
                'contentId': contentId,
                if (campaignId != null) 'campaignId': campaignId,
              }),
            )
          : http.delete(
              Uri.parse(url),
              headers: {'Content-Type': 'application/json'},
              body: jsonEncode({
                'accountId': config.accountId,
                'customerId': config.customerId,
                'contentId': contentId,
              }),
            ));

      if (response.statusCode < 300) {
        await trackEvent('click-favorite', {
          'contentId': contentId,
          if (campaignId != null) 'campaignId': campaignId,
        });
      }
    } catch (e) {
      print('DirectoAi SDK: Failed to toggle favorite: $e');
    }
  }

  @override
  Future<void> shareContent(
    String contentId, {
    String? campaignId,
    String? title,
  }) async {
    final shareId = _uuid.v4();
    final publicShareUrl = "https://share.directoai.com.br/share/$shareId";

    try {
      final response = await http.post(
        Uri.parse('$baseUrl/campaign/api/v1/feed/share'),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({
          'share_id': shareId,
          'content_id': contentId,
          'campaign_id': campaignId ?? '',
          'account_id': config.accountId,
          'created_by': config.customerId,
          'expires_in_hours': 168,
          'url': publicShareUrl,
        }),
      );

      if (response.statusCode < 300) {
        await trackEvent('click-share', {
          'contentId': contentId,
          if (campaignId != null) 'campaignId': campaignId,
        });
      }
    } catch (e) {
      print('DirectoAi SDK: Failed to share content: $e');
    }
  }
}
