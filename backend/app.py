from pathlib import Path
from flask import Flask
from flask_cors import CORS
from utilities.db.db import DB_PATH, init_db
from routes.routes_auth import auth_bp 
from routes.routes_scan import scan_bp


app = Flask(__name__)
CORS(app)


if not Path(DB_PATH).exists():
    print("📦 First launch: initializing database")
    init_db()

blueprints = [auth_bp, scan_bp]

for bp in blueprints:
    app.register_blueprint(bp)


if __name__ == '__main__':
    app.run(debug=True)