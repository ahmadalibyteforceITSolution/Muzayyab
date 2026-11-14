with open('public/demo/gulabi-parda/index.html', 'r', encoding='utf-8') as f:
    text = f.read()

idx = text.find('const CFG=')
if idx == -1:
    idx = text.find('CFG=')
print(text[idx:idx+1500])
