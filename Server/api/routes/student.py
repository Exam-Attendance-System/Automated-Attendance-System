from __init__ import app
from models.schemas import get_student_collection, get_exam_collection, get_attendance_collection, get_exam_assignment_collection
from flask import Blueprint, jsonify, request
from bson.objectid import ObjectId
from datetime import datetime

student_bp = Blueprint('student', __name__)

@student_bp.route('/students', methods=['GET'])
def get_students():
    student_collection = get_student_collection()
    students = student_collection.find()
    student_list = []
    for student in students:
        student_list.append({
            'id': str(student['_id']),
            'name': student['name'],
            'student_id': str(student['student_id']),
            'course_studied': student['course_studied']
        })
    return jsonify(student_list)

@student_bp.route('/students/<student_id>', methods=['GET'])
def get_student(student_id):
    student_collection = get_student_collection()
    student = student_collection.find_one({'student_id': student_id})
    if student:
        return jsonify({
            'id': str(student['_id']),
            'name': student['name'],
            'student_id': str(student['student_id']),
            'course_studied': student['course_studied']
        })
    else:
        return jsonify({'error': 'Student not found'}), 404

@app.route('/student/<student_id>')
def get_student_details(student_id):
    student_collection = get_student_collection()
    exams_collection = get_exam_collection()
    attendances_collection = get_attendance_collection()
    student = student_collection.find_one({"student_id": student_id})
    exams = list(exams_collection.find({"student_id": student_id}))
    attendances = list(attendances.find({"student_id": student_id}))

    return jsonify({
        "student": student,
        "exams": exams,
        "attendances": attendances
    })

@student_bp.route('/students', methods=['POST'])
def add_student():
    student_collection = get_student_collection()
    new_student = {
        'name': request.json['name'],
        'student_id': request.json['student_id'],
        'course_studied' : request.json['course_studied'],
    }
    result = student_collection.insert_one(new_student)
    return jsonify({'id': str(result.inserted_id)}), 201

@student_bp.route('/students/<student_id>', methods=['PUT'])
def update_student(student_id):
    student_collection = get_student_collection()
    updated_student = {
        'name': request.json['name'],
        'student_id': request.json['student_id'],
        'course_studied' : request.json['course_studied'],
        'updated_at': datetime.now()
    }
    result = student_collection.update_one({'student_id': student_id}, {'$set': updated_student})
    if result.matched_count:
        return jsonify({'message': 'Student updated successfully'})
    else:
        return jsonify({'error': 'Student not found'}), 404

@student_bp.route('/students/<student_id>', methods=['DELETE'])
def delete_student(student_id):
    student_collection = get_student_collection()
    result = student_collection.delete_one({'student_id': student_id})
    if result.deleted_count:
        return jsonify({'message': 'Student deleted successfully'})
    else:
        return jsonify({'error': 'Student not found'}), 404


@student_bp.route('/students_exams/<exam_id>', methods=['GET'])
def get_exam_assignments(exam_id):
    exam_assignments = get_exam_assignment_collection()
    exams = get_exam_collection()
    students = get_student_collection()

    # exam_id = request.args.get('exam_id')
    
    if not exam_id:
        return jsonify({"error": "Missing exam_id"}), 400
    
    exam = exams.find_one({"exam_id": exam_id})
    if not exam:
        return jsonify({"error": "Exam not found"}), 404
    
    assignment = exam_assignments.find_one({"exam_id": exam_id})
    if not assignment:
        return jsonify({"error": "No assignments found for this exam"}), 404
    
    student_ids = assignment["student_ids"]
    students = list(students.find({"student_id": {"$in": student_ids}}))
    
    return jsonify({
        "exam": str(exam),
        "students": str(students)
    }), 200
