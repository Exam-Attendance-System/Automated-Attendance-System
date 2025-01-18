from flask import Blueprint, request, jsonify
import cv2
import numpy as np
import base64

qrcode_bp = Blueprint('qrcode', __name__)

@qrcode_bp.route('/scan', methods=['POST'])
def scan_qrcode():
    try:
        data = request.json
        image_data = base64.b64decode(data['image'])
        np_img = np.frombuffer(image_data, np.uint8)
        img = cv2.imdecode(np_img, cv2.IMREAD_COLOR)
        
        detector = cv2.QRCodeDetector()
        data, vertices_array, _ = detector.detectAndDecode(img)
        
        if vertices_array is not None:
            return jsonify({"success": True, "data": data}), 200
        else:
            return jsonify({"success": False, "message": "QR code not detected"}), 400
    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 500
