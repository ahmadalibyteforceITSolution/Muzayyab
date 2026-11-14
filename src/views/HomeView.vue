<template>
  <div class="home-page">
    <!-- Hero Section -->
    <section class="hero" id="top">
      <div class="hero-wrap">
        <div class="hero-text">
          <span class="hero-eyebrow">Digital Wedding Invitations</span>
          <h1 class="hero-title">An invitation your guests open with their own hands.</h1>
          <p class="hero-desc">
            Cinematic digital wedding cards with interactive wax seals, velvet curtains, silk tassels, and sound. One link on WhatsApp.
          </p>
          <div class="hero-cta">
            <router-link to="/order" class="btn btn-primary">Order your card</router-link>
            <a href="#designs" class="btn btn-secondary">Explore 65+ designs</a>
            <a :href="'https://wa.me/' + WA_NUMBER" target="_blank" rel="noopener" class="btn btn-wa">
              WhatsApp us
            </a>
          </div>
          <div class="hero-badges">
            <span>✨ 65+ Luxury Designs</span>
            <span>🤍 Delivered Same Day</span>
            <span>📱 Works on Every Phone</span>
          </div>
        </div>

        <div class="hero-preview">
          <div class="device-mockup">
            <iframe
              src="/demo/the-arch/index.html"
              title="Muzayyan live card demo"
              class="demo-iframe"
              allow="autoplay"
            ></iframe>
          </div>
          <span class="preview-hint">Tap the tassel to open the invitation 👆</span>
        </div>
      </div>
    </section>

    <!-- Personalizer Section: See your names on the card -->
    <section class="personalizer-section">
      <div class="section-wrap">
        <div class="pers-header">
          <span class="eyebrow">Interactive Preview</span>
          <h2>See your names on the card</h2>
          <p>Type your names below to preview how your personalized card looks.</p>
        </div>

        <div class="pers-box">
          <div class="pers-inputs">
            <label>
              <span>Bride's Name</span>
              <input v-model="brideName" placeholder="Ayesha" maxlength="24" />
            </label>
            <span class="amp">&</span>
            <label>
              <span>Groom's Name</span>
              <input v-model="groomName" placeholder="Hamza" maxlength="24" />
            </label>
          </div>

          <div class="pers-preview-card">
            <img :src="'/img/mock/the-arch-m.webp'" alt="The Arch" class="pers-card-img" />
            <div class="pers-overlay">
              <span class="pers-names">{{ brideName || 'Ayesha' }} &amp; {{ groomName || 'Hamza' }}</span>
              <span class="pers-date">December 2026</span>
            </div>
          </div>

          <div class="pers-actions">
            <router-link :to="'/order?d=the-arch&a=' + encodeURIComponent(brideName) + '&b=' + encodeURIComponent(groomName)" class="btn btn-primary">
              Make this card yours
            </router-link>
            <a :href="shareWaUrl" target="_blank" rel="noopener" class="btn btn-secondary">
              Share idea on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Designs Catalog Section -->
    <section class="designs-section" id="designs">
      <div class="section-wrap">
        <div class="section-header">
          <span class="eyebrow">Luxury Catalog</span>
          <h2>Every design, one place</h2>
          <p>Choose from our handcrafted signature, premium, and bespoke wedding invitations.</p>

          <!-- Filter categories -->
          <div class="filter-chips">
            <button
              v-for="cat in categories"
              :key="cat.key"
              type="button"
              class="chip"
              :class="{ active: currentCategory === cat.key }"
              @click="currentCategory = cat.key"
            >
              {{ cat.label }}
            </button>
          </div>
        </div>

        <!-- Designs Grid -->
        <div class="designs-grid">
          <div
            v-for="d in filteredDesigns"
            :key="d.s"
            class="card-item"
            @click="openModal(d)"
          >
            <div class="card-thumb">
              <img :src="'/img/mock/' + d.s + '-s.webp'" :alt="d.en" loading="lazy" />
              <span class="tier-pill" :class="d.t">{{ TIERS[d.t] }}</span>
              <div class="thumb-hover">
                <span>Tap to preview</span>
              </div>
            </div>
            <div class="card-info">
              <div class="card-title-row">
                <span class="pk-name">{{ d.pk }}</span>
                <span class="en-name">{{ d.en }}</span>
              </div>
              <p class="card-gesture">{{ d.g }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- The Muzayyan Deal (Helpers) -->
    <section class="deal-section" id="inside">
      <div class="section-wrap">
        <div class="deal-header">
          <span class="eyebrow">The Muzayyan Deal</span>
          <h2>Pay for the card. Get 7 wedding helpers free.</h2>
          <p>Everything you need for your wedding communication, included with your digital invitation.</p>
        </div>

        <div class="helpers-grid">
          <div v-for="h in helpers" :key="h.title" class="helper-card">
            <div class="helper-img-wrap">
              <img :src="'/img/helpers/' + h.img + '.webp'" :alt="h.title" loading="lazy" />
            </div>
            <h3>{{ h.title }}</h3>
            <p>{{ h.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Pricing Section -->
    <section class="pricing-section" id="pricing">
      <div class="section-wrap">
        <div class="pricing-header">
          <span class="eyebrow">Transparent Pricing</span>
          <h2>One payment. Every event included.</h2>
          <p>No monthly charges. Your link stays active forever.</p>

          <!-- Currency Selector -->
          <div class="cur-selector">
            <button
              v-for="(reg, code) in REGIONS"
              :key="code"
              type="button"
              class="cur-btn"
              :class="{ active: currentCur === code }"
              @click="currentCur = code"
            >
              {{ reg.code }}
            </button>
          </div>
        </div>

        <div class="pricing-grid">
          <div class="pricing-card">
            <span class="pkg-tier">Signature</span>
            <div class="price-box">
              <span class="was">{{ REGIONS[currentCur].sym }}{{ REGIONS[currentCur].was.signature.toLocaleString() }}</span>
              <span class="price">{{ REGIONS[currentCur].sym }}{{ REGIONS[currentCur].price.signature.toLocaleString() }}</span>
            </div>
            <p class="pkg-desc">Our iconic interactive folding cards. Gatefold arches, wax seals, and ribbon reveals.</p>
            <ul class="pkg-features">
              <li>✓ All functions included (Mehndi, Barat, Walima)</li>
              <li>✓ Interactive opening experience</li>
              <li>✓ 7 Wedding helpers included free</li>
              <li>✓ Ready same-day on WhatsApp</li>
            </ul>
            <router-link to="/order" class="btn btn-primary" style="width: 100%; text-align: center;">Choose Signature</router-link>
          </div>

          <div class="pricing-card featured">
            <div class="featured-badge">Most Popular</div>
            <span class="pkg-tier">Premium</span>
            <div class="price-box">
              <span class="was">{{ REGIONS[currentCur].sym }}{{ REGIONS[currentCur].was.premium.toLocaleString() }}</span>
              <span class="price">{{ REGIONS[currentCur].sym }}{{ REGIONS[currentCur].price.premium.toLocaleString() }}</span>
            </div>
            <p class="pkg-desc">Detailed multi-stage animations, sound effects, custom colors, and couple monogram.</p>
            <ul class="pkg-features">
              <li>✓ Everything in Signature</li>
              <li>✓ Velvet curtains & luxury animations</li>
              <li>✓ Background music / shehnai / qawwali</li>
              <li>✓ Custom monogram and colors</li>
            </ul>
            <router-link to="/order" class="btn btn-primary" style="width: 100%; text-align: center;">Choose Premium</router-link>
          </div>

          <div class="pricing-card">
            <span class="pkg-tier">Atelier</span>
            <div class="price-box">
              <span class="was">{{ REGIONS[currentCur].sym }}{{ REGIONS[currentCur].was.atelier.toLocaleString() }}</span>
              <span class="price">{{ REGIONS[currentCur].sym }}{{ REGIONS[currentCur].price.atelier.toLocaleString() }}</span>
            </div>
            <p class="pkg-desc">Completely custom bespoke cards handcrafted from your moodboard or physical invite.</p>
            <ul class="pkg-features">
              <li>✓ 1-on-1 designer collaboration</li>
              <li>✓ Custom illustrated art & venue sketch</li>
              <li>✓ Dedicated WhatsApp assistance</li>
              <li>✓ Unlimited revisions</li>
            </ul>
            <a :href="'https://wa.me/' + WA_NUMBER + '?text=Hi%20Muzayyan!%20I%20am%20interested%20in%20an%20Atelier%20custom%20card.'" target="_blank" rel="noopener" class="btn btn-secondary" style="width: 100%; text-align: center;">
              Consult Designer
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="faq-section" id="faq">
      <div class="section-wrap">
        <div class="section-header">
          <span class="eyebrow">Common Questions</span>
          <h2>Good to know</h2>
        </div>

        <div class="faq-accordion">
          <div
            v-for="(item, i) in FAQ"
            :key="i"
            class="faq-item"
            :class="{ open: openFaq === i }"
            @click="openFaq = openFaq === i ? null : i"
          >
            <div class="faq-q">
              <span>{{ item[0] }}</span>
              <span class="faq-toggle">{{ openFaq === i ? '−' : '+' }}</span>
            </div>
            <div v-show="openFaq === i" class="faq-a">
              <p>{{ item[1] }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Interactive Card Detail Modal -->
    <div v-if="activeCard" class="modal-backdrop" @click="closeModal">
      <div class="modal-dialog" @click.stop>
        <button class="modal-close" @click="closeModal" aria-label="Close modal">✕</button>
        <div class="modal-split">
          <div class="modal-frame-box">
            <iframe
              :src="'/demo/' + activeCard.s + '/index.html'"
              :title="activeCard.en + ' interactive preview'"
              class="modal-iframe"
              allow="autoplay"
            ></iframe>
          </div>
          <div class="modal-details">
            <span class="modal-tier">{{ TIERS[activeCard.t] }} Collection</span>
            <h2>{{ activeCard.pk }} · {{ activeCard.en }}</h2>
            <p class="modal-desc">{{ activeCard.g }}</p>
            <div class="modal-price">
              <b>{{ REGIONS[currentCur].sym }}{{ REGIONS[currentCur].price[activeCard.t].toLocaleString() }}</b>
              <small>All events & 7 wedding helpers included</small>
            </div>
            <div class="modal-actions">
              <router-link :to="'/order?d=' + activeCard.s" class="btn btn-primary" style="width: 100%; text-align: center;">
                Make this design yours
              </router-link>
              <a
                :href="'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent('Hi Muzayyan! 🤍 I love the ' + activeCard.en + ' (' + activeCard.pk + ') card. Can you give me more details?')"
                target="_blank"
                rel="noopener"
                class="btn btn-wa"
                style="width: 100%; text-align: center;"
              >
                Order on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { DESIGNS } from '../data/designs.js';
import { WA_NUMBER, REGIONS, TIERS, FAQ } from '../data/constants.js';

const brideName = ref('Ayesha');
const groomName = ref('Hamza');
const currentCategory = ref('all');
const currentCur = ref('pkr');
const openFaq = ref(0);
const activeCard = ref(null);

const categories = [
  { key: 'all', label: 'All Designs' },
  { key: 'signature', label: 'Signature' },
  { key: 'premium', label: 'Premium' },
  { key: 'shaadi', label: 'Shaadi & Barat' },
  { key: 'walima', label: 'Walima' },
  { key: 'mehndi', label: 'Mehndi & Mayun' },
  { key: 'nikah', label: 'Nikah' }
];

const filteredDesigns = computed(() => {
  if (currentCategory.value === 'all') return DESIGNS;
  if (['signature', 'premium', 'atelier'].includes(currentCategory.value)) {
    return DESIGNS.filter(d => d.t === currentCategory.value);
  }
  return DESIGNS.filter(d => d.o && d.o.includes(currentCategory.value));
});

const shareWaUrl = computed(() => {
  const text = `Look at this wedding card idea! The Arch with our names: ${brideName.value} & ${groomName.value}. Muzayyan Studio.`;
  return `https://wa.me/?text=${encodeURIComponent(text)}`;
});

const helpers = [
  { title: 'Printable PDF Card', img: 'card', desc: 'Print-ready A5 invitation file for relatives who like to hold a real card.' },
  { title: 'Personalized Link', img: 'std', desc: 'Short, elegant address easy to share on WhatsApp status and Instagram.' },
  { title: 'Save the Date Cards', img: 'std', desc: 'Matching story and square art ready to post weeks before the wedding.' },
  { title: 'Event Reminders', img: 'remind', desc: 'Separate graphics for Mehndi, Baraat, and Walima with maps and timings.' },
  { title: 'QR Standee Board', img: 'standee', desc: '24x36 entrance board for your hall. Guests scan to see the programme.' },
  { title: 'Event Checklist', img: 'checklist', desc: 'Comprehensive coordination tracker for families and planners.' }
];

function openModal(d) {
  activeCard.value = d;
}

function closeModal() {
  activeCard.value = null;
}
</script>

<style scoped>
.home-page {
  padding-bottom: 60px;
}
.section-wrap {
  max-width: 1200px;
  margin: 0 auto;
  padding: 80px 20px;
}
.eyebrow {
  display: inline-block;
  font-size: 11px;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: var(--gold);
  font-weight: 600;
  margin-bottom: 8px;
}
.hero {
  background: radial-gradient(circle at 50% 20%, #fdf6ec 0%, #f7ede0 100%);
  padding: 60px 20px 80px;
  border-bottom: 1px solid var(--line);
}
.hero-wrap {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  align-items: center;
  gap: 60px;
}
.hero-title {
  font-family: var(--font-serif);
  font-size: clamp(38px, 5.5vw, 68px);
  line-height: 1.1;
  color: var(--maroon);
  margin-bottom: 20px;
  font-weight: 600;
}
.hero-desc {
  font-size: 18px;
  line-height: 1.6;
  color: #55493f;
  margin-bottom: 30px;
  max-width: 500px;
}
.hero-cta {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  margin-bottom: 30px;
}
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 12px 24px;
  border-radius: 999px;
  text-decoration: none;
  font-weight: 600;
  font-size: 14px;
  transition: all 0.2s;
  cursor: pointer;
  border: 1px solid transparent;
}
.btn-primary {
  background: var(--maroon);
  color: #fff;
}
.btn-primary:hover {
  background: #631721;
  transform: translateY(-1px);
}
.btn-secondary {
  background: #fff;
  border-color: var(--line);
  color: #4a4036;
}
.btn-secondary:hover {
  border-color: var(--maroon);
  color: var(--maroon);
}
.btn-wa {
  background: #25d366;
  color: #fff;
}
.btn-wa:hover {
  background: #20ba59;
}
.hero-badges {
  display: flex;
  gap: 20px;
  font-size: 13px;
  color: #706253;
}
.hero-preview {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.device-mockup {
  width: 100%;
  max-width: 380px;
  height: 600px;
  border-radius: 36px;
  overflow: hidden;
  box-shadow: 0 25px 60px rgba(78, 30, 20, 0.22);
  border: 8px solid #221c18;
  background: #000;
}
.demo-iframe {
  width: 100%;
  height: 100%;
  border: 0;
}
.preview-hint {
  margin-top: 14px;
  font-size: 13px;
  color: var(--gold);
  font-weight: 500;
}

/* Personalizer */
.personalizer-section {
  background: #fff;
  border-bottom: 1px solid var(--line);
}
.pers-header {
  text-align: center;
  margin-bottom: 40px;
}
.pers-header h2 {
  font-family: var(--font-serif);
  font-size: 38px;
  color: var(--maroon);
}
.pers-box {
  max-width: 700px;
  margin: 0 auto;
  text-align: center;
}
.pers-inputs {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin-bottom: 30px;
}
.pers-inputs label {
  display: flex;
  flex-direction: column;
  text-align: left;
}
.pers-inputs span {
  font-size: 12px;
  font-weight: 600;
  color: #706253;
  margin-bottom: 6px;
}
.pers-inputs input {
  padding: 12px 18px;
  border: 1px solid var(--line);
  border-radius: 12px;
  font-size: 16px;
  font-family: var(--font-serif);
  outline: none;
}
.pers-inputs input:focus {
  border-color: var(--maroon);
}
.pers-inputs .amp {
  font-family: var(--font-serif);
  font-size: 28px;
  color: var(--gold);
  align-self: flex-end;
  margin-bottom: 8px;
}
.pers-preview-card {
  position: relative;
  max-width: 440px;
  margin: 0 auto 30px;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 15px 40px rgba(0,0,0,0.12);
}
.pers-card-img {
  width: 100%;
  display: block;
}
.pers-overlay {
  position: absolute;
  top: 40%;
  left: 0;
  width: 100%;
  transform: translateY(-50%);
  text-align: center;
}
.pers-names {
  display: block;
  font-family: var(--font-serif);
  font-size: clamp(22px, 4vw, 32px);
  color: #fff;
  font-style: italic;
  text-shadow: 0 2px 8px rgba(0,0,0,0.6);
}
.pers-date {
  font-size: 12px;
  color: #e5d4ba;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  margin-top: 6px;
  display: block;
}
.pers-actions {
  display: flex;
  justify-content: center;
  gap: 14px;
}

/* Catalog */
.section-header {
  text-align: center;
  margin-bottom: 50px;
}
.section-header h2 {
  font-family: var(--font-serif);
  font-size: 42px;
  color: var(--maroon);
  margin-bottom: 10px;
}
.filter-chips {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  margin-top: 24px;
}
.chip {
  padding: 8px 18px;
  border-radius: 999px;
  border: 1px solid var(--line);
  background: #fff;
  color: #4a4036;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}
.chip.active, .chip:hover {
  background: var(--maroon);
  border-color: var(--maroon);
  color: #fff;
}
.designs-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 30px;
}
.card-item {
  background: #fff;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid var(--line);
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}
.card-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 16px 36px rgba(122, 31, 43, 0.12);
}
.card-thumb {
  position: relative;
  aspect-ratio: 4/5;
  background: #f4ece1;
}
.card-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.tier-pill {
  position: absolute;
  top: 12px;
  left: 12px;
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  background: rgba(255, 255, 255, 0.9);
  color: var(--maroon);
}
.thumb-hover {
  position: absolute;
  inset: 0;
  background: rgba(122, 31, 43, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.2s;
}
.thumb-hover span {
  background: #fff;
  color: var(--maroon);
  padding: 8px 16px;
  border-radius: 999px;
  font-weight: 600;
  font-size: 13px;
}
.card-item:hover .thumb-hover {
  opacity: 1;
}
.card-info {
  padding: 16px;
}
.card-title-row {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 6px;
}
.pk-name {
  font-family: var(--font-serif);
  font-size: 19px;
  font-weight: 600;
  color: var(--maroon);
}
.en-name {
  font-size: 13px;
  color: #706253;
}
.card-gesture {
  font-size: 13px;
  color: #55493f;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Helpers */
.deal-section {
  background: #f7efe4;
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
}
.deal-header {
  text-align: center;
  margin-bottom: 50px;
}
.deal-header h2 {
  font-family: var(--font-serif);
  font-size: 40px;
  color: var(--maroon);
}
.helpers-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;
}
.helper-card {
  background: #fff;
  border-radius: 16px;
  padding: 24px;
  border: 1px solid var(--line);
  text-align: center;
}
.helper-img-wrap {
  width: 80px;
  height: 80px;
  margin: 0 auto 16px;
  border-radius: 50%;
  overflow: hidden;
  background: #fdfaf6;
  border: 2px solid var(--gold);
}
.helper-img-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.helper-card h3 {
  font-family: var(--font-serif);
  font-size: 20px;
  color: var(--maroon);
  margin-bottom: 8px;
}
.helper-card p {
  font-size: 14px;
  color: #66584b;
  line-height: 1.5;
}

/* Pricing */
.pricing-section {
  background: #fff;
}
.pricing-header {
  text-align: center;
  margin-bottom: 50px;
}
.pricing-header h2 {
  font-family: var(--font-serif);
  font-size: 42px;
  color: var(--maroon);
}
.cur-selector {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 20px;
}
.cur-btn {
  padding: 6px 14px;
  border-radius: 999px;
  border: 1px solid var(--line);
  background: #fff;
  font-weight: 600;
  font-size: 12px;
  cursor: pointer;
}
.cur-btn.active {
  background: var(--maroon);
  color: #fff;
  border-color: var(--maroon);
}
.pricing-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  max-width: 1050px;
  margin: 0 auto;
}
.pricing-card {
  background: #fff;
  border-radius: 20px;
  padding: 36px 28px;
  border: 1px solid var(--line);
  position: relative;
  display: flex;
  flex-direction: column;
}
.pricing-card.featured {
  border-color: var(--maroon);
  box-shadow: 0 16px 40px rgba(122, 31, 43, 0.14);
}
.featured-badge {
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--maroon);
  color: #fff;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  padding: 4px 14px;
  border-radius: 999px;
  letter-spacing: 0.1em;
}
.pkg-tier {
  font-family: var(--font-serif);
  font-size: 26px;
  color: var(--maroon);
  font-weight: 600;
}
.price-box {
  margin: 16px 0;
  display: flex;
  align-items: baseline;
  gap: 10px;
}
.price-box .was {
  text-decoration: line-through;
  color: #a09080;
  font-size: 18px;
}
.price-box .price {
  font-size: 34px;
  font-weight: 700;
  color: var(--maroon);
}
.pkg-desc {
  font-size: 14px;
  color: #66584b;
  margin-bottom: 24px;
  line-height: 1.5;
}
.pkg-features {
  list-style: none;
  padding: 0;
  margin: 0 0 30px;
  flex: 1;
}
.pkg-features li {
  font-size: 14px;
  color: #4a4036;
  margin-bottom: 12px;
}

/* FAQ */
.faq-section {
  background: #fdfaf6;
  border-top: 1px solid var(--line);
}
.faq-accordion {
  max-width: 800px;
  margin: 0 auto;
}
.faq-item {
  border-bottom: 1px solid var(--line);
  cursor: pointer;
  padding: 20px 0;
}
.faq-q {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 600;
  font-size: 17px;
  color: #2b2520;
}
.faq-toggle {
  font-size: 22px;
  color: var(--maroon);
}
.faq-a {
  margin-top: 12px;
  font-size: 15px;
  line-height: 1.6;
  color: #5c4e42;
}

/* Modal */
.modal-backdrop {
  position: fixed;
  inset: 0;
  z-index: 1000;
  background: rgba(0,0,0,0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}
.modal-dialog {
  background: #fff;
  border-radius: 24px;
  width: 100%;
  max-width: 900px;
  max-height: 90vh;
  overflow: hidden;
  position: relative;
  box-shadow: 0 25px 60px rgba(0,0,0,0.4);
}
.modal-close {
  position: absolute;
  top: 16px;
  right: 16px;
  z-index: 20;
  background: #fff;
  border: 1px solid var(--line);
  width: 36px;
  height: 36px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal-split {
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: 75vh;
}
.modal-frame-box {
  background: #111;
  height: 100%;
}
.modal-iframe {
  width: 100%;
  height: 100%;
  border: 0;
}
.modal-details {
  padding: 40px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}
.modal-tier {
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: var(--gold);
  margin-bottom: 6px;
}
.modal-details h2 {
  font-family: var(--font-serif);
  font-size: 32px;
  color: var(--maroon);
  margin-bottom: 12px;
}
.modal-desc {
  font-size: 15px;
  color: #55493f;
  line-height: 1.6;
  margin-bottom: 24px;
}
.modal-price {
  background: #fdfaf6;
  padding: 16px;
  border-radius: 12px;
  margin-bottom: 30px;
}
.modal-price b {
  display: block;
  font-size: 26px;
  color: var(--maroon);
}
.modal-price small {
  font-size: 13px;
  color: #706253;
}
.modal-actions {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: auto;
}

@media (max-width: 860px) {
  .hero-wrap {
    grid-template-columns: 1fr;
    text-align: center;
  }
  .hero-desc {
    margin: 0 auto 30px;
  }
  .hero-cta {
    justify-content: center;
  }
  .hero-badges {
    justify-content: center;
  }
  .modal-split {
    grid-template-columns: 1fr;
    height: 85vh;
    overflow-y: auto;
  }
  .modal-frame-box {
    height: 380px;
  }
}
</style>
