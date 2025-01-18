from pymongo import MongoClient
from bson.objectid import ObjectId
import random
from datetime import datetime, timedelta

# Connect to MongoDB
client = MongoClient('mongodb+srv://hughesneal88:u9nkwE2XKnbvA1VM@eam-cluster0.urstk.mongodb.net/EAM_Database?retryWrites=true&w=majority&appName=EAM-Cluster0')
db = client['EAM_Database']

# Drop existing collections
db.students.drop()
db.exams.drop()
db.attendances.drop()
db.exam_assignments.drop()

# Define courses and their relevant subjects
courses = {
    "BACHELOR OF SCIENCE IN INFORMATION TECHNOLOGY": ["Mathematics", "Computer Science", "Physics"],
    "BACHELOR OF SCIENCE IN MECHANICAL ENGINEERING": ["Mathematics", "Physics", "Chemistry"],
    "BACHELOR OF SCIENCE IN ELECTRICAL ENGINEERING": ["Mathematics", "Physics", "Biology"]
}

course_code = ['Math', 'CS', 'Phy', 'Chem', 'Bio']

# List of sample names
first_names = ["John", "Jane", "Alice", "Bob", "Charlie", "David", "Eva", "Frank", "Grace", "Hank"]
last_names = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez"]

# Generate 100 students
students = []
for i in range(1, 101):
    student = {
        "_id": ObjectId(),
        "name": f"{random.choice(first_names)} {random.choice(last_names)}",
        "student_id": f"{11178000 + i}",
        "course_studied": random.choice(list(courses.keys()))
    }
    students.append(student)

# Insert students into the students collection
db.students.insert_many(students)

# Generate exams for each course with dates
exams = []
for course, subjects in courses.items():
    for subject in subjects:
        exam_date = datetime.now() - timedelta(days=random.randint(1, 365))
        exam = {
            "_id": ObjectId(),
            "exam_id": f"{random.choice(course_code)}{random.randint(10000, 99999)}",
            "course": course,
            "subject": subject,
            "date": exam_date
        }
        exams.append(exam)

# Insert exams into the exams collection
db.exams.insert_many(exams)

# Assign groups of students to each exam based on their course
exam_assignments = []
for exam in exams:
    assigned_students = [student for student in students if student["course_studied"] == exam["course"]]
    assignment = {
        "_id": ObjectId(),
        "exam_id": exam["exam_id"],
        "student_ids": [student["student_id"] for student in assigned_students]
    }
    exam_assignments.append(assignment)

# Insert exam assignments into the exam_assignments collection
db.exam_assignments.insert_many(exam_assignments)

print("Data inserted successfully!")