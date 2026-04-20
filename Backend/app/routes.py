from flask import Blueprint, jsonify, request
from .models import db, Application, User

main = Blueprint('main', __name__)


# ✅ Home Route
@main.route('/')
def home():
    return jsonify({"message": "FreshHire AI Backend Running "})


# ✅ GET all applications
@main.route('/applications', methods=['GET'])
def get_applications():
    apps = Application.query.all()

    result = []
    for app in apps:
        result.append({
            "id": app.id,
            "name": app.name,
            "company": app.company,
            "role": app.role,
            "status": app.status
        })

    return jsonify(result)


# ✅ POST add application
@main.route('/add-application', methods=['POST'])
def add_application():
    data = request.json

    new_app = Application(
        name=data['name'],
        company=data['company'],
        role=data['role'],
        status=data['status']
    )

    db.session.add(new_app)
    db.session.commit()

    return jsonify({"message": "Application added successfully"})
# REGISTER
@main.route('/register', methods=['POST'])
def register():
    data = request.json

    user = User(username=data['username'], password=data['password'])

    db.session.add(user)
    db.session.commit()

    return jsonify({"message": "User registered"})


# LOGIN
@main.route('/login', methods=['POST'])
def login():
    data = request.json

    user = User.query.filter_by(
        username=data['username'],
        password=data['password']
    ).first()

    if user:
        return jsonify({"message": "Login success"})
    else:
        return jsonify({"error": "Invalid credentials"}), 401
@main.route('/suggest-jobs', methods=['POST'])
def suggest_jobs():
    data = request.json

    skills = data.get('skills')
    domain = data.get('domain')

    # Dummy response (for now)
    jobs = [
        {"company": "Infosys", "role": f"{domain} Intern"},
        {"company": "TCS", "role": f"{domain} Developer"},
        {"company": "Wipro", "role": f"{domain} Engineer"},
    ]

    return jsonify(jobs)