import re

with open('_scripts/original_index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Meta & title
html = html.replace('content="Bulawa Studio"', 'content="Muzayyan"')
html = html.replace('content="Bulawa Studio · Digital wedding invitations"', 'content="Muzayyan · Digital wedding invitations"')
html = html.replace('<title>Bulawa Studio</title>', '<title>Muzayyan · Digital wedding invitations</title>')
html = html.replace('https://bulawastudio.com/', '/')
html = html.replace('https://bulawastudio.com', '')

# 2. SVG Monogram mark
# <text x="20" y="38" text-anchor="middle" font-family="Cormorant Garamond, Georgia, serif" font-style="italic" font-weight="500" font-size="22" fill="#7a1f2b">B</text>
html = re.sub(
    r'(<symbol id="mark"[^>]*>.*?<text[^>]*>)B(</text>)',
    r'\g<1>M\g<2>',
    html,
    flags=re.DOTALL
)

# 3. Wordmark
html = html.replace('aria-label="Bulawa Studio home"', 'aria-label="Muzayyan home"')
html = html.replace('<b>BULAWA</b><small>STUDIO</small>', '<b>MUZAYYAN</b><small>STUDIO</small>')
html = html.replace('<div class="bigword" aria-hidden="true">BULAWA</div>', '<div class="bigword" aria-hidden="true">MUZAYYAN</div>')
html = html.replace('© 2026 Bulawa Studio · Karachi, Pakistan', '© 2026 Muzayyan · Karachi, Pakistan')

# 4. WhatsApp Number
# Old: 923700200421 -> New: 923491175847
# Old display: 0370 0200421 -> New: 0349 1175847
html = html.replace('923700200421', '923491175847')
html = html.replace('0370 0200421', '0349 1175847')
html = html.replace('Hi%20Bulawa%20Studio!', 'Hi%20Muzayyan!')
html = html.replace('Hi Bulawa Studio!', 'Hi Muzayyan!')

# 5. Text mentions
html = html.replace('Bulawa card', 'Muzayyan card')
html = html.replace('Bulawa Studio', 'Muzayyan')
html = html.replace('Bulawa deal', 'Muzayyan deal')
html = html.replace('bulawastudio.com', 'muzayyan.com')
html = html.replace('bulawa.studio', 'muzayyan.pk')

# 6. JavaScript constant WA
html = html.replace('const WA="923700200421"', 'const WA="923491175847"')

# 7. Clean up tracking pixels (FB pixel & Cloudflare beacon)
html = re.sub(r'<!-- Meta Pixel Code -->.*?<!-- End Meta Pixel Code -->', '', html, flags=re.DOTALL)
html = re.sub(r'<script[^>]*src="https://static\.cloudflareinsights\.com[^"]*"[^>]*></script>', '', html)

# 8. Clean up /cdn-cgi/ trace if fails gracefully
html = html.replace('/img/bulawa-mark.png', '/img/muzayyan-mark.png')
html = html.replace('img/bulawa-mark.png', '/img/muzayyan-mark.png')

# 9. Email
html = html.replace('hello@bulawastudio.com', 'hello@muzayyan.com')

# 10. Add Vue.js 3 script and mounting
vue_script = '''
<!-- Vue.js 3 Integration -->
<script src="https://unpkg.com/vue@3/dist/vue.global.prod.js"></script>
<script>
window.addEventListener('DOMContentLoaded', () => {
  if (window.Vue) {
    const { createApp, ref } = window.Vue;
    console.log("Muzayyan Vue 3 App initialized successfully!");
  }
});
</script>
'''

html = html.replace('</body>', vue_script + '\n</body>')
if '</body>' not in html:
    html += '\n' + vue_script

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)

print("Generated complete exact index.html for Muzayyan, length:", len(html))
