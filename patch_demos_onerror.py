import os
import re

demos = [d for d in os.listdir('public/demo') if os.path.isdir(os.path.join('public/demo', d))]

for d in demos:
    html_path = os.path.join('public/demo', d, 'index.html')
    if not os.path.exists(html_path):
        continue
    with open(html_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # In HTML template string: <img src="${e.img}" alt="">
    # add onerror="this.style.display='none'"
    content = content.replace('<img src="${e.img}" alt="">', '<img src="${e.img}" alt="" onerror="this.style.display=\'none\'">')
    content = content.replace('<img src="${g.img}" alt="">', '<img src="${g.img}" alt="" onerror="this.style.display=\'none\'">')
    # also general img tags
    content = re.sub(r'<img\s+src="([^"]+)"\s+alt=""(?!\s+onerror)>', r'<img src="\1" alt="" onerror="this.style.display=\'none\'">', content)

    with open(html_path, 'w', encoding='utf-8') as f:
        f.write(content)

print("Added onerror handlers to all 65 demos!")
