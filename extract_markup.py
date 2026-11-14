with open('_scripts/original_index.html', 'r', encoding='utf-8') as f:
    text = f.read()

import re

# Find start of body markup (after style)
style_end = text.rfind('</style>')
body_start = text.find('<svg', style_end)
# Find end before script
script_start = text.find('<script>', body_start)

markup = text[body_start:script_start]
print("Exact markup length:", len(markup))

# Replace Bulawa with Muzayyan
markup = markup.replace('Bulawa Studio', 'Muzayyan')
markup = markup.replace('Bulawa', 'Muzayyan')
markup = markup.replace('bulawastudio.com', 'muzayyan.com')
markup = markup.replace('bulawa.studio', 'muzayyan.pk')
markup = markup.replace('923700200421', '923491175847')
markup = markup.replace('0370 0200421', '0349 1175847')
markup = markup.replace('<b>BULAWA</b><small>STUDIO</small>', '<b>MUZAYYAN</b><small>STUDIO</small>')
markup = markup.replace('id="mark"', 'id="mark-symbol"')

# Update B to M in symbol
markup = re.sub(r'(<symbol id="mark-symbol"[^>]*>.*?<text[^>]*>)B(</text>)', r'\g<1>M\g<2>', markup, flags=re.DOTALL)

with open('src/assets/original_markup.html', 'w', encoding='utf-8') as f:
    f.write(markup)

print("Saved src/assets/original_markup.html successfully!")
