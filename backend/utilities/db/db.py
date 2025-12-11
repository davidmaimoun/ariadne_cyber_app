import sqlite3
from pathlib import Path
from werkzeug.security import generate_password_hash

DB_PATH = Path("db/dev.db")

def get_db_conn():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    """Initialize database and insert dummy user for labs."""
    # Créer le dossier si nécessaire
    if not DB_PATH.parent.exists():
        DB_PATH.parent.mkdir(parents=True)
    
    conn = get_db_conn()
    cur = conn.cursor()

    # Création de la table users
    cur.execute("""
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL
    );
    """)

    # Création de la table password_resets
    cur.execute("""
    CREATE TABLE IF NOT EXISTS password_resets (
        token TEXT PRIMARY KEY,
        user_id INTEGER NOT NULL,
        expire_at INTEGER NOT NULL,
        FOREIGN KEY(user_id) REFERENCES users(id)
    );
    """)

    # Insérer utilisateur hardcodé Aragorn
    hashed_password = generate_password_hash("123123")
    cur.execute("""
        INSERT OR IGNORE INTO users (username, password_hash)
        VALUES (?, ?)
    """, ("aragorn", hashed_password))

    conn.commit()
    conn.close()
    print("📦 Database initialized with dummy user 'aragorn' (password: 123123)")
