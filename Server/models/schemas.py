from __init__ import db




def get_user_collection():
    return db.users

def get_student_collection():
    return db.students

def get_exam_collection():
    return db.exams

def get_attendance_collection():
    return db.attendances

def get_settings_collection():
    return db.settings

def get_exam_assignment_collection():
    return db.exam_assignments
