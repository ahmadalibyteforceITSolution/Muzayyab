with open('src/assets/original_markup.html', 'r', encoding='utf-8') as f:
    markup = f.read()

import re
matches = re.findall(r'<([a-zA-Z0-9]+)[^>]*?(?:class|id)=["\']([^"\']+)["\'][^>]*>', markup)
for m in matches[:30]:
    print(f"<{m[0]} ...='{m[1]}'>")
