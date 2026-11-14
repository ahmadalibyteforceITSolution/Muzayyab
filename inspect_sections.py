with open('_scripts/original_index.html', 'r', encoding='utf-8') as f:
    text = f.read()

import re
sections = re.findall(r'<(?:section|header|footer|div\s+class="wheel")[^>]*>', text)
print(f"Total main elements: {len(sections)}")
for s in sections[:20]:
    print(s)
