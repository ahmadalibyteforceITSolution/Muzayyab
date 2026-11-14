with open('public/demo/gulabi-parda/index.html', 'r', encoding='utf-8') as f:
    text = f.read()

import re
matches = re.findall(r'<img[^>]+src=["\']([^"\']+)["\']', text)
print("Images in gulabi-parda demo:")
for m in matches:
    print(m)

# Also check dynamic e.img or template strings
dyn = re.findall(r'src=["\']?\$\{([^}]+)\}', text)
print("Dynamic image sources:", dyn)
