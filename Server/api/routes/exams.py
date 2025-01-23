from __init__ import app
from models.schemas import get_exam_collection
from flask import Blueprint, jsonify, request
from bson.objectid import ObjectId
from datetime import datetime

exam_bp = Blueprint('exam', __name__)
@exam_bp.route('/exams', methods=['GET'])
def get_exams():
    exam_collection = get_exam_collection()
    exams = exam_collection.find()
    exam_list = []
    for exam in exams:
        exam_list.append({
            'id': str(exam['_id']),
            'exam_id': str(exam['exam_id']),
            'subject': exam['subject'],
            'date': exam['date'],
            'duration': exam['duration']
        })
    return jsonify(exam_list)

@exam_bp.route('/exams/<exam_id>', methods=['GET'])
def get_exam(exam_id):
    exam_collection = get_exam_collection()
    exam = exam_collection.find_one({'exam_id': exam_id})
    if exam:
        return jsonify({
            'id': str(exam['_id']),
            'exam_id': str(exam['exam_id']),
            'subject': exam['subject'],
            'date': exam['date'],
            'duration': exam['duration']
        })
    else:
        return jsonify({'error': 'Exam not found'}), 404

@exam_bp.route('/exams', methods=['POST'])
def add_exam():
    exam_collection = get_exam_collection()
    new_exam = {
        'exam_id': request.json['exam_id'],
        'subject': request.json['subject'],
        'date': request.json['date'],
        'duration': request.json['duration']
    }
    result = exam_collection.insert_one(new_exam)
    return jsonify({'id': str(result.inserted_id)}), 201

@exam_bp.route('/exams/<exam_id>', methods=['PUT'])
def update_exam(exam_id):
    exam_collection = get_exam_collection()
    updated_exam = {
        'exam_id': request.json['exam_id'],
        'subject': request.json['subject'],
        'date': request.json['date'],
        'duration': request.json['duration'],
        'updated_at': datetime.now()
    }
    result = exam_collection.update_one({'_id': ObjectId(exam_id)}, {'$set': updated_exam})
    if result.matched_count:
        return jsonify({'message': 'Exam updated successfully'})
    else:
        return jsonify({'error': 'Exam not found'}), 404

@exam_bp.route('/exams/<exam_id>', methods=['DELETE'])
def delete_exam(exam_id):
    exam_collection = get_exam_collection()
    result = exam_collection.delete_one({'_id': ObjectId(exam_id)})
    if result.deleted_count:
        return jsonify({'message': 'Exam deleted successfully'})
    else:
        return jsonify({'error': 'Exam not found'}), 404
    
