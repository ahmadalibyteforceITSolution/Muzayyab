import os
import re

os.makedirs('src/assets', exist_ok=True)

with open('_scripts/original_index.html', 'r', encoding='utf-8') as f:
    text = f.read()

# Extract all <style> tags
styles = re.findall(r'<style(?:\s+[^>]*)?>(.*?)</style>', text, re.DOTALL)
print(f"Total style tags in original_index.html: {len(styles)}")

full_css = "\n\n".join(styles)

# Brand fixes
full_css = full_css.replace('Bulawa', 'Muzayyan')
full_css = full_css.replace('/img/silk.webp', '/img/silk.webp')

with open('src/assets/main.css', 'w', encoding='utf-8') as f:
    f.write(full_css)

print("Saved src/assets/main.css, length:", len(full_css))
