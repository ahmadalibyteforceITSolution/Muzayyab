import os

old_patterns = [
    ('923491175847', '9234168867454'),
    ('0349 1175847', '0341 68867454'),
    ('+92 349 1175847', '+92 341 68867454'),
    ('03491175847', '034168867454')
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

print(f"Updated {len(updated_files)} files with new number 034168867454!")
for u in updated_files[:15]:
    print(" -", u)
if len(updated_files) > 15:
    print(f" ... and {len(updated_files)-15} more.")
