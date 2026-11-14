for path in ['public/region.js', 'region.js']:
    try:
        with open(path, 'r', encoding='utf-8') as f:
            text = f.read()
        # Suppress /cdn-cgi/trace error on localhost
        text = text.replace('fetch("/cdn-cgi/trace"', 'if(!location.hostname.includes("localhost")&&!location.hostname.includes("127.0.0.1"))fetch("/cdn-cgi/trace"')
        with open(path, 'w', encoding='utf-8') as f:
            f.write(text)
        print("Updated", path)
    except Exception as e:
        print("Error on", path, e)
