from flask import Blueprint, jsonify
from models.schemas import get_exam_collection
from datetime import datetime

upcoming_exam_bp = Blueprint('upcoming_exam', __name__)

@upcoming_exam_bp.route('/upcoming_exams', methods=['GET'])
def get_upcoming_exams():
    try:
        # Get the exam collection from the database
        collection = get_exam_collection()

        # Fetch all exams and sort by 'date' in ascending order
        exams = []
        for exam in collection.find({}, {"_id": 0}).sort("date", 1):  # 1 for ascending order
            # Convert the date to a readable format (Day, YYYY-MM-DD HH:MM:SS)
            if "date" in exam:
                exam_date = exam["date"]
                if isinstance(exam_date, datetime):  # Check if it's a datetime object
                    exam["date"] = exam_date.strftime("%A, %Y-%m-%d %H:%M:%S")  # Format the date with day of the week

            # Only include exam_id and formatted date in the response
            exams.append({"exam_id": exam["exam_id"], "date": exam["date"]})

        if not exams:
            return jsonify({"message": "No exams found"}), 404
        
        return jsonify(exams), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500
