# Muzayyan (مزین) — Digital Wedding Invitations

An exact, complete, luxury copy of the wedding invitation platform branded for **Muzayyan**, with direct **WhatsApp Order Integration** powered by phone number **`+92 341 68867454`**.

---

## 🌟 Features Included

1. **Brand Identity**:
   - Website Name: **Muzayyan Studio**
   - Elegant custom monogram logo mark (`M`) in royal maroon and gold
   - Luxury aesthetic and typography matching the original design

2. **Full Card Catalog (65+ Designs)**:
   - All collections: **Signature**, **Premium**, and **Atelier**
   - High-resolution mockups, posters, wheel previews, and detail images
   - Category filtering (All, Shaadi, Mehndi, Baraat, Nikah, Walima, etc.)
   - Full-screen interactive card opening demos for all 65 designs (`demo/`)

3. **Interactive Features**:
   - **"See your names on the card"**: live interactive personalization preview
   - **Interactive Card Opening Experience**: guest touch gesture simulation, wax seal animations, curtain pulls, ribbon reveals
   - **The Muzayyan Deal**: Free wedding helper suite preview (Printable PDF, QR Standee, Reminders, Save the Date, Message Pack)
   - **Multi-currency Pricing Engine**: PKR for Pakistan visitors (`Rs 4,500`), and automatic USD, GBP, EUR, MYR conversions for international guests

4. **Direct WhatsApp Ordering**:
   - Target WhatsApp Number: **`+92 341 68867454`** (`9234168867454`)
   - The `/order/` page gathers Bride & Groom names, family names, wedding style, functions, dates, times, venues, RSVP number, customer contact, and notes.
   - When submitted, it automatically creates a formatted order summary and launches WhatsApp to send the complete order directly.
   - Includes JazzCash mobile wallet and Bank transfer details for payment receipt submission via WhatsApp.

5. **Complimentary Wedding Tools**:
   - `/budget/` — Interactive Wedding Budget Calculator
   - `/guests/` — Guest List & RSVP Management Planner

---

## 🚀 How to Run Locally

You can run the site using any web server. For example with Python:

```bash
# In this directory:
python -m http.server 8080
```

Then open your browser at:
- **Homepage**: [http://localhost:8080/](http://localhost:8080/)
- **Order Page**: [http://localhost:8080/order/](http://localhost:8080/order/)
- **Budget Calculator**: [http://localhost:8080/budget/](http://localhost:8080/budget/)
- **Guest Planner**: [http://localhost:8080/guests/](http://localhost:8080/guests/)

---

## 🌐 How to Deploy to Production

Upload all files and folders (`index.html`, `order/`, `budget/`, `guests/`, `demo/`, `img/`, `i/`, `agent.js`, `events.js`, `region.js`) directly to:
- Any web hosting (cPanel `public_html`, Hostinger, Namecheap)
- **Vercel**, **Netlify**, or **Cloudflare Pages** (Zero configuration needed, drag and drop the folder)
- **GitHub Pages**

# Muzayyab
