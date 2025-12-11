import secrets
import time
from utilities.db.db import get_db_conn
from werkzeug.security import generate_password_hash
from datetime import datetime, timedelta


RESET_TABLE = "password_resets"

def generate_reset_token(user_id: int, lifetime_seconds: int = 3600) -> str:
    """Create a secure token, store it with expiry (unix timestamp) and return it."""
    token = secrets.token_hex(32)  # 64 hex chars = 32 bytes
    expire = int(time.time()) + int(lifetime_seconds)

    conn = get_db_conn()
    cur = conn.cursor()
    cur.execute(
        f"INSERT INTO {RESET_TABLE} (token, user_id, expire_at) VALUES (?, ?, ?)",
        (token, user_id, expire),
    )
    conn.commit()
    conn.close()
    return token


def get_user_by_token(token: str):
    """Return user_id if token exists and not expired, otherwise None."""
    conn = get_db_conn()
    cur = conn.cursor()
    cur.execute(
        f"SELECT user_id, expire_at FROM {RESET_TABLE} WHERE token = ?",
        (token,),
    )
    row = cur.fetchone()
    conn.close()
    if not row:
        return None
    expire_at = int(row["expire_at"])
    if expire_at < int(time.time()):
        # expired
        return None
    return int(row["user_id"])


def delete_token(token: str):
    conn = get_db_conn()
    cur = conn.cursor()
    cur.execute(f"DELETE FROM {RESET_TABLE} WHERE token = ?", (token,))
    conn.commit()
    conn.close()


def update_password(user_id: int, new_password_plain: str):
    """Hash the password and update users.password_hash."""
    pw_hash = generate_password_hash(new_password_plain)
    conn = get_db_conn()
    cur = conn.cursor()
    cur.execute("UPDATE users SET password_hash = ? WHERE id = ?", (pw_hash, user_id))
    conn.commit()
    conn.close()


def get_user_by_username(username: str):
    conn = get_db_conn()
    cur = conn.cursor()
    cur.execute("SELECT id, username FROM users WHERE username = ?", (username,))
    row = cur.fetchone()
    conn.close()
    return row
