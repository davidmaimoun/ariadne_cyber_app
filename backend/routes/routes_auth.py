from flask import Blueprint, request, jsonify
from utilities.common.auth import delete_token, generate_reset_token, get_user_by_token, get_user_by_username, update_password

auth_bp = Blueprint("auth", __name__, url_prefix="/api/auth")

@auth_bp.route('/reset-pwd/request', methods=['POST'])
def reset_pwd_request():
    """
    Request a password reset for a username.
    Body JSON: { "username": "alice" }
    Returns: { "ok": true, "token": "<token>" } in this demo (in production you email the token)
    """
    data = request.get_json() or {}
    username = data.get("username", "").strip()
    if not username:
        return jsonify({"ok": False, "error": "username required"}), 400
    row = get_user_by_username(username)
    if not row:
        # Do not reveal whether user exists in production: respond 200 and pretend email sent
        return jsonify({"ok": True, "message": "If the account exists, a reset email has been sent."}), 200

    user_id = int(row["id"])
    token = generate_reset_token(user_id, lifetime_seconds=3600)

    print(token).utilit

    # In a real app: send email with URL /reset?token=...
    # For the lab/demo we return the token to the client so the frontend can simulate the email
    return jsonify({"ok": True, "token": token}), 200

@auth_bp.post("/reset-pwd/confirm")
def reset_pwd_confirm():
    """
    Finish reset flow.
    Body JSON: { "token": "...", "password": "..." }
    """
    data = request.get_json() or {}
    token = data.get("token", "").strip()
    new_password = data.get("password", "")

    print(token)
    if not token or not new_password:
        return jsonify({"ok": False, "error": "token and new_password required"}), 400

    user_id = get_user_by_token(token)
    if not user_id:
        return jsonify({"ok": False, "error": "invalid or expired token"}), 400

    update_password(user_id, new_password)
    delete_token(token)
    return jsonify({"ok": True, "message": "password updated"}), 200

