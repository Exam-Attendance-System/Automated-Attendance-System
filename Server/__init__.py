from flask import Flask, jsonify
from flask_cors import CORS
from flask_pymongo import PyMongo

app = Flask(__name__)
app.config['SECRET-KEY'] = "EAM-542977391023852292334"
app.config['MONGO_URI'] = 'mongodb+srv://hughesneal88:u9nkwE2XKnbvA1VM@eam-cluster0.urstk.mongodb.net/EAM_Database?retryWrites=true&w=majority&appName=EAM-Cluster0'

# Setup MongoDB
mongo_client = PyMongo(app)
db = mongo_client.db

#Enable CORS
CORS(app)

# Register Blueprints
from api.routes.student import student_bp
app.register_blueprint(student_bp, url_prefix='/api')

from api.routes.exams import exam_bp
app.register_blueprint(exam_bp, url_prefix='/api')

from api.routes.attendance import attendance_bp
app.register_blueprint(attendance_bp, url_prefix='/api')

from api.functions.qrcode import qrcode_bp
app.register_blueprint(qrcode_bp, url_prefix='/api')

from api.routes.upcoming_exams import upcoming_exam_bp
app.register_blueprint(upcoming_exam_bp, url_prefix='/api')

@app.route('/test_db_connection', methods=['GET'])
def test_db_connection():
    try:
        # Insert a test document
        test_collection = db.test_collection
        test_document = {'name': 'test', 'value': 'This is a test document'}
        test_collection.insert_one(test_document)

        # Retrieve the test document
        retrieved_document = test_collection.find_one({'name': 'test'})

        # Remove the test document
        test_collection.delete_one({'name': 'test'})

        return jsonify({
            'status': 'success',
            'message': 'Connected to MongoDB successfully!',
            'document': retrieved_document
        })
    except Exception as e:
        return jsonify({
            'status': 'error',
            'message': str(e)
        })

