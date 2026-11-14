with open('order/index.html', 'r', encoding='utf-8') as f:
    text = f.read()

import re
scripts = re.findall(r'<script[^>]*src=["\']([^"\']+)["\']', text)
print('Scripts in order/index.html:', scripts)
