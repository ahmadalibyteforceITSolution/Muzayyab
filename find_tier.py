with open('order/index.html', 'r', encoding='utf-8') as f:
    text = f.read()

import re
matches = [m.start() for m in re.finditer(r'const TIER\b|let TIER\b|var TIER\b|function setTiers', text)]
print("TIER matches:", len(matches))
for idx in matches:
    print(text[max(0, idx-40):min(len(text), idx+100)].replace('\n', ' '))
