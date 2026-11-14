with open('public/demo/gulabi-parda/index.html', 'r', encoding='utf-8') as f:
    text = f.read()

import re
matches = [m.start() for m in re.finditer(r'img\s*:\s*["\']|e\.img', text)]
for idx in matches:
    print(text[max(0, idx-80):min(len(text), idx+120)].replace('\n', ' '))
