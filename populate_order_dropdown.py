import re

with open('order/index.html', 'r', encoding='utf-8') as f:
    text = f.read()

# Extract DESIGNS array from order/index.html
m = re.search(r'const DESIGNS\s*=\s*\[(.*?)\];', text, re.DOTALL)
if m:
    designs_list = re.findall(r'\[\s*["\']([^"\']+)["\'],\s*["\']([^"\']+)["\'],\s*["\']([^"\']+)["\']', m.group(1))
    print(f"Found {len(designs_list)} designs for dropdown.")

    options_html = '<select id="design">\n'
    for slug, name, tier in designs_list:
        tier_label = tier.capitalize()
        options_html += f'      <option value="{slug}">{name} · {tier_label}</option>\n'
    options_html += '    </select>'

    # Replace <select id="design"></select> with full options
    text = re.sub(r'<select id="design">\s*</select>', options_html, text)

    # Also protect setTiers()
    text = text.replace('setTiers();', 'try{setTiers()}catch(_){}')

    with open('order/index.html', 'w', encoding='utf-8') as f:
        f.write(text)

    # Also write to public/order/index.html
    with open('public/order/index.html', 'w', encoding='utf-8') as f:
        f.write(text)

    print("Pre-populated select id='design' in order/index.html and public/order/index.html!")
else:
    print("Could not find DESIGNS array!")
