from flask import Blueprint, request, jsonify

system_integration_bp = Blueprint("system_integration", __name__)

saved_settings = {}

@system_integration_bp.route("/save-settings", methods=["POST"])
def save_settings():
    data = request.json
    api_endpoint = data.get("apiEndpoint")
    api_key = data.get("apiKey")
    sync_frequency = data.get("syncFrequency")

    if not api_endpoint or not api_key:
        return jsonify({"error": "API Endpoint and API Key are required"}), 400

    saved_settings.update({
        "api_endpoint": api_endpoint,
        "api_key": api_key,
        "sync_frequency": sync_frequency
    })

    return jsonify({"message": "Settings saved successfully", "settings": saved_settings}), 200

@system_integration_bp.route("/test-connection", methods=["GET"])
def test_connection():
    if not saved_settings:
        return jsonify({"error": "No settings found. Please save settings first."}), 400

    # Simulate connection test
    return jsonify({"message": "Connection successful!", "status": "Success"}), 200
