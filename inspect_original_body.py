with open('_scripts/original_index.html', 'r', encoding='utf-8') as f:
    text = f.read()

import re
body_m = re.search(r'<body[^>]*>(.*?)</body>', text, re.DOTALL)
if body_m:
    body_content = body_m.group(1)
    print("Body content length:", len(body_content))
    # print all top level elements in body
    tags = re.findall(r'<([a-zA-Z0-9-]+)[^>]*class=["\']([^"\']+)["\']', body_content)
    print("Found elements with classes:", len(tags))
    for t in tags[:25]:
        print(f"<{t[0]} class='{t[1]}'>")
