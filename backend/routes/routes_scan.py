from flask import Blueprint, request, jsonify
from utilities.scan.ssrf.ssrf import SSRFScanner

scan_bp = Blueprint("scan", __name__)

@scan_bp.route("/scan/ssrf", methods=["POST"])
def scan_ssrf():
    data = request.json
    url = data["url"]
    cookie = data.get("cookie")

    scanner = SSRFScanner(url, cookies={"session": cookie} if cookie else None)
    result = scanner.run()

    return jsonify(result)
