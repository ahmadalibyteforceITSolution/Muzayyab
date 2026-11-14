import os
import re
import urllib.request
import concurrent.futures

headers = {'User-Agent': 'Mozilla/5.0'}

demos = [d for d in os.listdir('public/demo') if os.path.isdir(os.path.join('public/demo', d))]
print(f"Scanning {len(demos)} demos for missing images...")

to_download = []

for d in demos:
    html_path = os.path.join('public/demo', d, 'index.html')
    if not os.path.exists(html_path):
        continue
    with open(html_path, 'r', encoding='utf-8', errors='ignore') as f:
        text = f.read()

    # Find all "img/...webp" inside JSON or JS
    imgs = set(re.findall(r'["\'](img/[^"\'\s]+\.(?:webp|jpg|png|svg))["\']', text))
    for img_rel in imgs:
        local_file = os.path.join('public/demo', d, img_rel)
        if not os.path.exists(local_file) or os.path.getsize(local_file) == 0:
            to_download.append((d, img_rel))

print(f"Total missing demo images found: {len(to_download)}")

def download_one(item):
    d, img_rel = item
    local_file = os.path.join('public/demo', d, img_rel)
    os.makedirs(os.path.dirname(local_file), exist_ok=True)
    url = f"https://bulawastudio.com/demo/{d}/{img_rel}"
    try:
        req = urllib.request.Request(url, headers=headers)
        data = urllib.request.urlopen(req, timeout=10).read()
        with open(local_file, 'wb') as f:
            f.write(data)
        return True
    except Exception as e:
        return False

success = 0
with concurrent.futures.ThreadPoolExecutor(max_workers=15) as executor:
    futures = [executor.submit(download_one, item) for item in to_download]
    for fut in concurrent.futures.as_completed(futures):
        if fut.result():
            success += 1

print(f"Downloaded {success}/{len(to_download)} missing demo images!")
