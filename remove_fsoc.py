with open('index.html', 'r', encoding='utf-8') as f:
    text = f.read()

import re
# remove the entire <div class="fsoc">...</div> block
text = re.sub(r'<div class="fsoc">.*?</div>', '', text, flags=re.DOTALL)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(text)

print("Removed fsoc icons from index.html successfully!")
