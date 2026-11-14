import re

with open('_scripts/original_index.html', 'r', encoding='utf-8') as f:
    text = f.read()

# Helpers
m_helpers = re.search(r'const HELPERS\s*=\s*(\[.*?\]);', text, re.DOTALL)
m_faq = re.search(r'const FAQ\s*=\s*(\[.*?\]);', text, re.DOTALL)
m_vs = re.search(r'const VS\s*=\s*(\[.*?\]);', text, re.DOTALL)

with open('src/data/constants.js', 'w', encoding='utf-8') as f:
    f.write('export const WA_NUMBER = "923491175847";\n')
    f.write('export const WA_DISPLAY = "+92 349 1175847";\n\n')

    f.write('export const REGIONS = {\n')
    f.write(' pkr: { code: "PKR", sym: "Rs ", price: { signature: 4500, premium: 6300, atelier: 7800 }, was: { signature: 7500, premium: 9900, atelier: 12500 } },\n')
    f.write(' usd: { code: "USD", sym: "$", price: { signature: 99, premium: 149, atelier: 199 }, was: { signature: 149, premium: 219, atelier: 299 } },\n')
    f.write(' gbp: { code: "GBP", sym: "£", price: { signature: 99, premium: 149, atelier: 199 }, was: { signature: 149, premium: 219, atelier: 299 } },\n')
    f.write(' eur: { code: "EUR", sym: "€", price: { signature: 99, premium: 149, atelier: 199 }, was: { signature: 149, premium: 219, atelier: 299 } },\n')
    f.write(' myr: { code: "MYR", sym: "RM ", price: { signature: 199, premium: 299, atelier: 399 }, was: { signature: 299, premium: 449, atelier: 599 } }\n')
    f.write('};\n\n')

    f.write('export const TIERS = {\n  signature: "Signature",\n  premium: "Premium",\n  atelier: "Atelier"\n};\n\n')

    f.write('export const OCCASIONS = {\n  shaadi: "Shaadi",\n  mehndi: "Mehndi",\n  baraat: "Baraat",\n  nikah: "Nikah",\n  walima: "Walima",\n  qawwali: "Qawwali",\n  dholki: "Dholki",\n  mayun: "Mayun",\n  engagement: "Engagement",\n  milad: "Milad",\n  roza: "Iftar"\n};\n\n')

    if m_faq:
        faq_clean = m_faq.group(1).replace('Bulawa', 'Muzayyan').replace('bulawastudio.com', 'muzayyan.com')
        f.write('export const FAQ = ' + faq_clean + ';\n\n')

    if m_vs:
        vs_clean = m_vs.group(1).replace('Bulawa', 'Muzayyan')
        f.write('export const VS = ' + vs_clean + ';\n\n')

print("Created src/data/constants.js")
