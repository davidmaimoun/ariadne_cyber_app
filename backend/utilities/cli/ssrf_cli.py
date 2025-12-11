import argparse
from utilities.scan.ssrf.ssrf import SSRFScanner

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--url", required=True)
    parser.add_argument("--cookie")
    args = parser.parse_args()

    cookies = {"session": args.cookie} if args.cookie else None

    scanner = SSRFScanner(args.url, cookies=cookies)
    results = scanner.run()

    for r in results:
        print(r)

if __name__ == "__main__":
    main()
