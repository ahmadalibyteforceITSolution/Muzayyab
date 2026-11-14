import re

with open('index.html', 'r', encoding='utf-8') as f:
    full_html = f.read()

# Extract styles
style_matches = re.findall(r'<style(?:\s+[^>]*)?>(.*?)</style>', full_html, re.DOTALL)
styles_content = "\n".join(style_matches)

# Extract SVG mark and body content
svg_start = full_html.find('<svg width="0" height="0"')
script_start = full_html.rfind('<script>')
body_html = full_html[svg_start:script_start]

# Extract main script
main_script = full_html[script_start+8:full_html.rfind('</script>')]

print(f"body_html length: {len(body_html)}")
print(f"styles length: {len(styles_content)}")
print(f"script length: {len(main_script)}")
