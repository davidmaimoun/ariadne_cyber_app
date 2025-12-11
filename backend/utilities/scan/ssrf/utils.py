import requests
import urllib.parse

def double_url_encode(char: str) -> str:
    return urllib.parse.quote(urllib.parse.quote(char))

def build_obfuscated_admin_path():
    # "/admin" → "/%2561dmin"
    a = double_url_encode("a")
    return f"/{a}dmin"
