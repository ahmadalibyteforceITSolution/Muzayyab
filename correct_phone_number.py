import os

old_patterns = [
    ('9234168867454', '923416887454'),
    ('0341 68867454', '0341 6887454'),
    ('+92 341 68867454', '+92 341 6887454'),
    ('034168867454', '03416887454')
]

updated_files = []

for root, dirs, files in os.walk('.'):
    if 'node_modules' in root or '.git' in root or '_scripts' in root:
        continue
    for f in files:
        if f.endswith(('.js', '.vue', '.html', '.css', '.json', '.md')):
            path = os.path.join(root, f)
            try:
                with open(path, 'r', encoding='utf-8') as fp:
                    content = fp.read()

                modified = False
                for old, new in old_patterns:
                    if old in content:
                        content = content.replace(old, new)
                        modified = True

                if modified:
                    with open(path, 'w', encoding='utf-8') as fp:
                        fp.write(content)
                    updated_files.append(path)
            except Exception as e:
                print(f"Error updating {path}: {e}")

print(f"Updated {len(updated_files)} files with corrected number 03416887454!")
