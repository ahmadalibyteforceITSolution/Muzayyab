import os
import re
import json

os.makedirs('src/data', exist_ok=True)

with open('_scripts/original_index.html', 'r', encoding='utf-8') as f:
    text = f.read()

m = re.search(r'const DESIGNS\s*=\s*(\[\s*\{.*?\}\s*\]);', text, re.DOTALL)
if m:
    designs_raw = m.group(1)
    with open('src/data/designs.js', 'w', encoding='utf-8') as out:
        out.write("// Muzayyan Card Designs Catalog (65+ Luxury Designs)\n")
        out.write("export const DESIGNS = " + designs_raw + ";\n")
    print("Exported src/data/designs.js successfully!")
else:
    print("Error: DESIGNS array not found!")
