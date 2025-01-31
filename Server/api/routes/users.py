from models.schemas import get_user_collection
from flask import Blueprint, jsonify, request, session
from bson.objectid import ObjectId
from datetime import datetime
from werkzeug.security import check_password_hash, generate_password_hash

users_bp = Blueprint('users', __name__)

@users_bp.route('/users', methods=['GET'])
def get_users():
    user_collection = get_user_collection()
    users = user_collection.find()
    user_list = []
    for user in users:
        user_list.append({
            'id': str(user['_id']),
            'username': user['username'],
            'email': user['email'],
            'role': user['role']
        })
    return jsonify(user_list)

@users_bp.route('/users/<user_id>', methods=['GET'])
def get_user(user_id):
    user_collection = get_user_collection()
    user = user_collection.find_one({'_id': ObjectId(user_id)})
    if user:
        return jsonify({
            'id': str(user['_id']),
            'username': user['username'],
            'email': user['email'],
            'role': user['role']
        })
    else:
        return jsonify({'error': 'User not found'}), 404

@users_bp.route('/users', methods=['POST'])
def add_user():
    user_collection = get_user_collection()
    new_user = {
        'username': request.json['username'],
        'email': request.json['email'],
        'password': generate_password_hash(request.json['password']),
        'role': request.json['role'],
    }
    result = user_collection.insert_one(new_user)
    return jsonify({'id': str(result.inserted_id)}), 201

@users_bp.route('/users/<user_id>', methods=['PUT'])
def update_user(user_id):
    user_collection = get_user_collection()
    updated_user = {
        'username': request.json['username'],
        'email': request.json['email'],
        'role': request.json['role'],
        'updated_at': datetime.now()
    }
    result = user_collection.update_one({'_id': ObjectId(user_id)}, {'$set': updated_user})
    if result.matched_count:
        return jsonify({'message': 'User updated successfully'})
    else:
        return jsonify({'error': 'User not found'}), 404

@users_bp.route('/users/<user_id>', methods=['DELETE'])
def delete_user(user_id):
    user_collection = get_user_collection()
    result = user_collection.delete_one({'_id': ObjectId(user_id)})
    if result.deleted_count:
        return jsonify({'message': 'User deleted successfully'})
    else:
        return jsonify({'error': 'User not found'}), 404


@users_bp.route('/user/login', methods=['POST'])
def login():
    user_collection = get_user_collection()
    identifier = request.json.get('email')  # Changed to 'identifier'
    password = request.json.get('password')

    user = user_collection.find_one({'$or': [{'username': identifier}, {'email': identifier}]})  # Modified query
    if user and check_password_hash(user['password'], password):
        session['user_id'] = str(user['_id'])  # Store user ID in session
        return jsonify({'message': 'Login successful', 'user_id': session['user_id']}), 200
    else:
        return jsonify({'error': 'Invalid username or password'}), 401
@users_bp.route('/user/logout', methods=['POST'])
def logout():
    session_id = request.json.get('session_id')
    session.pop(session_id, None)  # Remove user ID from session
    return jsonify({'message': 'Logout successful'}), 200

@users_bp.route('/user/isvalid', methods=['POST'])
def isValid():
    user_id = request.json.get('user_id')
    if not user_id:
        return jsonify({'error': 'User ID is required'}), 400

    user_collection = get_user_collection()
    user = user_collection.find_one({'_id': ObjectId(user_id)})

    if user:
        return jsonify({'isValid': True}), 200
    else:
        return jsonify({'isValid': False}), 404
