from flask import Flask, request, jsonify, Blueprint
from models.schemas import get_exam_collection, get_attendance_collection, get_student_collection
from bson.objectid import ObjectId
from datetime import datetime, timedelta

attendance_bp = Blueprint('attendance', __name__)

@attendance_bp.route('/attendance', methods=['POST'])
def sign_attendance():
    data = request.json
    qr_code_data = data.get('qr_code_data')
    student_id = qr_code_data.split(';')
    exam_id = data.get('exam_id')
    
    if not student_id or not exam_id:
        return jsonify({"error": "Missing student_id or exam_id"}), 400
    
    date_str = datetime.now().strftime('%Y%m%d')
    attendance_id = f"{student_id[:3]}{exam_id}{date_str[-6:]}"
    
    attendance_collection = get_attendance_collection()
    student_collection = get_student_collection()
    exam_collection = get_exam_collection()
    student = student_collection.find_one({'student_id': student_id})
    exam = exam_collection.find_one({'exam_id': exam_id})
    now = datetime.now().astimezone()
    start_of_day = datetime(now.year, now.month, now.day, tzinfo=now.tzinfo)
    end_of_day = start_of_day + timedelta(days=1)
    
    existing_attendance = attendance_collection.find_one({
        'student_id': student['_id'],
        'exam_id': exam['_id'],
        'date': {
            '$gte': start_of_day,
            '$lt': end_of_day
        }
    })
    
    if existing_attendance:
        return jsonify({"error": "Attendance for this student and exam on this date already exists"}), 400
    
    if not student or not exam:
        return jsonify({"error": "Invalid student_id or exam_id"}), 400
    
    student_id = student['_id']
    exam_id = exam['_id']
    
    attendance = {
        "_id": ObjectId(),
        "attendance_id": attendance_id,
        "student_id": student_id,
        "exam_id": exam_id,
        "date": datetime.now(),
        "status": "Present"
    }
    
    attendance_collection.insert_one(attendance)
    return jsonify({"message": "Attendance signed successfully!"}), 200

@attendance_bp.route('/attendances', methods=['GET'])
def get_attendances():
    attendance_collection = get_attendance_collection()
    attendances = attendance_collection.find()
    attendance_list = []
    for attendance in attendances:
        attendance_list.append({
            'id': str(attendance['_id']),
            'attendance_id': str(attendance['attendance_id']),
            'student_id': str(attendance['student_id']),
            'exam_id': str(attendance['exam_id']),
            'date': attendance['date'],
            'status': attendance['status']
        })
    return jsonify(attendance_list)

@attendance_bp.route('/attendances/<attendance_id>', methods=['GET'])
def get_attendance(attendance_id):
    attendance_collection = get_attendance_collection()
    attendance = attendance_collection.find_one({'_id': ObjectId(attendance_id)})
    if attendance:
        return jsonify({
            'id': str(attendance['_id']),
            'attendance_id': str(attendance['attendance_id']),
            'student_id': str(attendance['student_id']),
            'exam_id': str(attendance['exam_id']),
            'date': str(attendance['date']),
            'status': str(attendance['status'])
        })
    else:
        return jsonify({'error': 'Attendance not found'}), 404

@attendance_bp.route('/attendances/<attendance_id>', methods=['PUT'])
def update_attendance(attendance_id):
    data = request.json
    updated_attendance = {
        'attendance_id': data.get('attendance_id'),
        'student_id': data.get('student_id'),
        'exam_id': data.get('exam_id'),
        'date': data.get('date'),
        'status': data.get('status'),
        'updated_at': datetime.now()
    }
    attendance_collection = get_attendance_collection()
    result = attendance_collection.update_one({'_id': ObjectId(attendance_id)}, {'$set': updated_attendance})
    if result.matched_count:
        return jsonify({'message': 'Attendance updated successfully'})
    else:
        return jsonify({'error': 'Attendance not found'}), 404

@attendance_bp.route('/attendances/<attendance_id>', methods=['DELETE'])
def delete_attendance(attendance_id):
    attendance_collection = get_attendance_collection()
    result = attendance_collection.delete_one({'_id': ObjectId(attendance_id)})
    if result.deleted_count:
        return jsonify({'message': 'Attendance deleted successfully'})
    else:
        return jsonify({'error': 'Attendance not found'}), 404

@attendance_bp.route('/attendances/exam/<exam_id>', methods=['GET'])
def get_attendances_by_exam(exam_id):
    attendance_collection = get_attendance_collection()
    student = get_student_collection()
    exams = get_exam_collection()
    exam = exams.find_one({'exam_id': exam_id})['_id']
    attendances = attendance_collection.find({'exam_id': exam})
    
    attendance_list = []
    for attendance in attendances:
        attendance_list.append({
            'id': str(attendance['_id']),
            'attendance_id': str(attendance['attendance_id']),
            'student_id': str(student.find_one(attendance['student_id'])['student_id']),
            'exam_code': str(exams.find_one(attendance['exam_id'])['exam_id']),
            'date': str(attendance['date']),
            'status': str(attendance['status'])
        })
    return jsonify(attendance_list)

@attendance_bp.route('/attendances/student/<student_id>', methods=['GET'])
def get_attendances_by_student(student_id):
    attendance_collection = get_attendance_collection()
    exams = get_exam_collection()
    students = get_student_collection()
    student = students.find_one({'student_id': student_id})['_id']
    attendances = attendance_collection.find({'student_id': student})
    attendance_list = []
    for attendance in attendances:
        attendance_list.append({
            'id': str(attendance['_id']),
            'attendance_id': str(attendance['attendance_id']),
            'student_id': str(students.find_one(attendance['student_id'])['student_id']),
            'exam_code': str(exams.find_one(attendance['exam_id'])['exam_id']),
            'date': str(attendance['date']),
            'status': str(attendance['status'])
        })
    return jsonify(attendance_list)