with open('order/index.html', 'r', encoding='utf-8') as f:
    text = f.read()

idx = text.find('const sel=$("design")')
print(text[idx-300:idx+600])
