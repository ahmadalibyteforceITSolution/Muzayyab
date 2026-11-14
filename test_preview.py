import urllib.request

urls = [
    'http://localhost:3000/',
    'http://localhost:3000/order/',
    'http://localhost:3000/demo/gulabi-parda/index.html',
    'http://localhost:3000/demo/gulabi-parda/img/nikah.webp'
]

for u in urls:
    try:
        res = urllib.request.urlopen(u)
        content = res.read()
        print(f'{u}: status {res.status}, length {len(content)}')
        if '/order/' in u:
            html = content.decode('utf-8', errors='ignore')
            has_options = 'value="the-arch"' in html
            print('  -> order dropdown has options:', has_options)
        if u == 'http://localhost:3000/':
            html = content.decode('utf-8', errors='ignore')
            has_fsoc = 'class="fsoc"' in html
            print('  -> homepage has fsoc icons:', has_fsoc)
    except Exception as e:
        print(f'{u}: ERROR {e}')
