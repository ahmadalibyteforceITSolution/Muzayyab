<template>
  <div class="order-page">
    <div class="order-wrap">
      <div v-if="!orderSubmitted" class="order-form-card">
        <div class="form-header">
          <span class="eyebrow">Digital Wedding Card</span>
          <h1>Order your invitation</h1>
          <p>Fill in your wedding details. Your order will be formatted and sent directly to us on WhatsApp.</p>
        </div>

        <form @submit.prevent="submitOrder">
          <!-- 1. Choose Design & Package -->
          <div class="card-section">
            <div class="sec-title">
              <i>1</i>
              <div>
                <h2>Choose your design</h2>
                <small>Select from our 65+ luxury collections</small>
              </div>
            </div>

            <div class="form-row">
              <label>
                <span>Selected Design</span>
                <select v-model="selectedDesignSlug" class="input-field">
                  <option v-for="d in DESIGNS" :key="d.s" :value="d.s">
                    {{ d.en }} ({{ d.pk }}) — {{ TIERS[d.t] }}
                  </option>
                </select>
              </label>

              <label>
                <span>Package Tier</span>
                <select v-model="selectedTier" class="input-field">
                  <option value="signature">Signature (Rs 4,500)</option>
                  <option value="premium">Premium (Rs 6,300)</option>
                  <option value="atelier">Atelier Custom (Rs 7,800)</option>
                </select>
              </label>
            </div>

            <div v-if="selectedDesign" class="design-preview-strip">
              <img :src="'/img/mock/' + selectedDesign.s + '-s.webp'" :alt="selectedDesign.en" class="strip-img" />
              <div>
                <b>{{ selectedDesign.en }} · {{ selectedDesign.pk }}</b>
                <p>{{ selectedDesign.g }}</p>
              </div>
            </div>
          </div>

          <!-- 2. The Couple -->
          <div class="card-section">
            <div class="sec-title">
              <i>2</i>
              <div>
                <h2>The Couple &amp; Families</h2>
                <small>Names as you'd like them written on the card</small>
              </div>
            </div>

            <div class="form-grid-2">
              <label>
                <span>Bride's Name *</span>
                <input v-model="form.bride" placeholder="e.g. Hania Malik" required class="input-field" />
              </label>
              <label>
                <span>Bride's Parents / Family</span>
                <input v-model="form.brideFam" placeholder="e.g. Mr. & Mrs. Tariq Malik" class="input-field" />
              </label>

              <label>
                <span>Groom's Name *</span>
                <input v-model="form.groom" placeholder="e.g. Arsalan Qureshi" required class="input-field" />
              </label>
              <label>
                <span>Groom's Parents / Family</span>
                <input v-model="form.groomFam" placeholder="e.g. Mr. & Mrs. Mansoor Qureshi" class="input-field" />
              </label>

              <label>
                <span>Wedding City</span>
                <input v-model="form.city" placeholder="e.g. Karachi / Lahore / Islamabad" class="input-field" />
              </label>
              <label>
                <span>Dress Code (Optional)</span>
                <input v-model="form.dress" placeholder="e.g. Traditional / Pastel Formals" class="input-field" />
              </label>
            </div>
          </div>

          <!-- 3. Wedding Events -->
          <div class="card-section">
            <div class="sec-title">
              <i>3</i>
              <div>
                <h2>Wedding Functions</h2>
                <small>Add each function with its date, time and venue</small>
              </div>
            </div>

            <div class="event-chips-bar">
              <span class="chip-hint">Quick add:</span>
              <button
                v-for="evType in commonEventTypes"
                :key="evType"
                type="button"
                class="chip-btn"
                @click="addEvent(evType)"
              >
                + {{ evType }}
              </button>
            </div>

            <div class="events-list">
              <div v-for="(ev, idx) in form.events" :key="idx" class="event-card-row">
                <div class="ev-top">
                  <h3>{{ ev.name }}</h3>
                  <button type="button" class="del-btn" @click="removeEvent(idx)" v-if="form.events.length > 1">✕ Remove</button>
                </div>
                <div class="form-grid-3">
                  <label>
                    <span>Date *</span>
                    <input v-model="ev.date" type="text" placeholder="e.g. Friday, 12 Dec 2026" required class="input-field" />
                  </label>
                  <label>
                    <span>Time</span>
                    <input v-model="ev.time" type="text" placeholder="e.g. 8:00 PM" class="input-field" />
                  </label>
                  <label>
                    <span>Venue *</span>
                    <input v-model="ev.venue" type="text" placeholder="e.g. Grand Marquee, Karachi" required class="input-field" />
                  </label>
                </div>
              </div>
            </div>
          </div>

          <!-- 4. Contact & WhatsApp -->
          <div class="card-section">
            <div class="sec-title">
              <i>4</i>
              <div>
                <h2>Contact &amp; Guest RSVP</h2>
                <small>Where guests RSVP and where we send your final card</small>
              </div>
            </div>

            <div class="form-grid-2">
              <label>
                <span>Your WhatsApp Number *</span>
                <input v-model="form.customerWa" placeholder="0300 1234567" required class="input-field" />
                <small class="hint">We will send your preview link here</small>
              </label>
              <label>
                <span>WhatsApp for Guest RSVP *</span>
                <input v-model="form.rsvpWa" placeholder="0300 1234567" required class="input-field" />
                <small class="hint">Shown on your card for guest replies</small>
              </label>
            </div>

            <label style="margin-top: 16px; display: block;">
              <span>Special Notes / Requests</span>
              <textarea v-model="form.notes" rows="3" placeholder="Any specific wishes, text adjustments, or hashtags..." class="input-field"></textarea>
            </label>
          </div>

          <div v-if="formError" class="error-banner">
            {{ formError }}
          </div>

          <div class="submit-bar">
            <button type="submit" class="submit-btn">
              Send Order on WhatsApp 💌
            </button>
            <p class="submit-sub">
              Your order details will open automatically in WhatsApp to <b>+92 341 6887454</b>.
            </p>
          </div>
        </form>
      </div>

      <!-- Order Confirmation Screen -->
      <div v-else class="done-card">
        <div class="done-icon">✓</div>
        <h1>Order Sent on WhatsApp! 🤍</h1>
        <p class="done-sub">
          Shukriya! Your order details for <b>{{ form.bride }} &amp; {{ form.groom }}</b> have been prepared.
        </p>

        <a :href="waOrderUrl" target="_blank" rel="noopener" class="btn btn-wa-lg">
          📲 Open WhatsApp to Send Order
        </a>

        <!-- Payment Details Card -->
        <div class="pay-box">
          <h2>Confirm your booking</h2>
          <p>Please send your payment to our official business account below and share the screenshot on WhatsApp:</p>

          <div class="pay-accounts">
            <div class="pay-method">
              <span class="pay-tag">JazzCash Mobile Wallet</span>
              <div class="pay-row">
                <span>Account Title:</span>
                <b>Muzayyan Studio</b>
              </div>
              <div class="pay-row">
                <span>JazzCash Number:</span>
                <b>0341 6887454</b>
              </div>
            </div>

            <div class="pay-method">
              <span class="pay-tag">Direct Bank Transfer</span>
              <div class="pay-row">
                <span>Account Title:</span>
                <b>Muzayyan Studio</b>
              </div>
              <div class="pay-row">
                <span>Bank Details:</span>
                <b>Available on WhatsApp (+92 341 6887454)</b>
              </div>
            </div>
          </div>

          <a :href="'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent('Hi Muzayyan! 🤍 Here is my payment receipt for order ' + form.bride + ' & ' + form.groom + '.')" target="_blank" rel="noopener" class="btn btn-primary" style="margin-top: 20px;">
            Send Payment Screenshot on WhatsApp
          </a>
        </div>

        <div style="margin-top: 30px;">
          <router-link to="/" class="btn btn-secondary">Back to Homepage</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { DESIGNS } from '../data/designs.js';
import { WA_NUMBER, TIERS } from '../data/constants.js';

const route = useRoute();

const selectedDesignSlug = ref('the-arch');
const selectedTier = ref('signature');
const formError = ref('');
const orderSubmitted = ref(false);

const commonEventTypes = ['Mehndi', 'Baraat', 'Walima', 'Nikah', 'Qawwali Night', 'Dholki'];

const form = ref({
  bride: '',
  brideFam: '',
  groom: '',
  groomFam: '',
  city: 'Karachi',
  dress: '',
  customerWa: '',
  rsvpWa: '',
  notes: '',
  events: [
    { name: 'Mehndi', date: '', time: '8:00 PM', venue: '' },
    { name: 'Baraat', date: '', time: '8:30 PM', venue: '' },
    { name: 'Walima', date: '', time: '8:30 PM', venue: '' }
  ]
});

const selectedDesign = computed(() => {
  return DESIGNS.find(d => d.s === selectedDesignSlug.value) || DESIGNS[0];
});

onMounted(() => {
  if (route.query.d) {
    selectedDesignSlug.value = route.query.d;
  }
  if (route.query.a) {
    form.value.bride = route.query.a;
  }
  if (route.query.b) {
    form.value.groom = route.query.b;
  }
});

function addEvent(typeName) {
  form.value.events.push({
    name: typeName,
    date: '',
    time: '8:00 PM',
    venue: ''
  });
}

function removeEvent(index) {
  form.value.events.splice(index, 1);
}

const waOrderUrl = computed(() => {
  const d = selectedDesign.value;
  const eventsList = form.value.events
    .map(e => `• *${e.name}:* ${e.date || ''} ${e.time ? 'at ' + e.time : ''} (${e.venue || ''})`)
    .join('\n');

  const text = [
    `*New Wedding Card Order — Muzayyan* 💌`,
    ``,
    `*Design:* ${d.en} (${d.pk}) — Tier: ${selectedTier.value.toUpperCase()}`,
    `*Bride:* ${form.value.bride} ${form.value.brideFam ? '(D/o ' + form.value.brideFam + ')' : ''}`,
    `*Groom:* ${form.value.groom} ${form.value.groomFam ? '(S/o ' + form.value.groomFam + ')' : ''}`,
    form.value.city ? `*City:* ${form.value.city}` : '',
    form.value.dress ? `*Dress Code:* ${form.value.dress}` : '',
    ``,
    `*Events:*`,
    eventsList,
    ``,
    `*Customer WhatsApp:* ${form.value.customerWa}`,
    `*Guest RSVP WhatsApp:* ${form.value.rsvpWa}`,
    form.value.notes ? `*Special Notes:* ${form.value.notes}` : ''
  ].filter(Boolean).join('\n');

  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
});

function submitOrder() {
  if (!form.value.bride.trim() || !form.value.groom.trim()) {
    formError.value = "Please enter both Bride and Groom names.";
    return;
  }
  if (!form.value.customerWa.trim() || !form.value.rsvpWa.trim()) {
    formError.value = "Please enter both WhatsApp contact numbers.";
    return;
  }

  formError.value = '';
  orderSubmitted.value = true;

  // Attempt to open WhatsApp automatically
  try {
    window.open(waOrderUrl.value, '_blank');
  } catch (e) {
    console.error(e);
  }
}
</script>

<style scoped>
.order-page {
  background: #f7efe4;
  min-height: 90vh;
  padding: 50px 20px 80px;
}
.order-wrap {
  max-width: 820px;
  margin: 0 auto;
}
.order-form-card, .done-card {
  background: #fff;
  border-radius: 24px;
  border: 1px solid var(--line);
  box-shadow: 0 16px 40px rgba(122, 31, 43, 0.08);
  padding: 40px;
}
.form-header {
  text-align: center;
  margin-bottom: 40px;
  border-bottom: 1px solid var(--line);
  padding-bottom: 24px;
}
.form-header h1 {
  font-family: var(--font-serif);
  font-size: 38px;
  color: var(--maroon);
  margin: 6px 0 10px;
}
.card-section {
  margin-bottom: 36px;
  padding-bottom: 30px;
  border-bottom: 1px solid rgba(168, 132, 63, 0.15);
}
.sec-title {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 22px;
}
.sec-title i {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--maroon);
  color: #fff;
  font-style: normal;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 14px;
}
.sec-title h2 {
  font-family: var(--font-serif);
  font-size: 22px;
  color: var(--maroon);
}
.sec-title small {
  color: #706253;
  font-size: 13px;
}
.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}
.form-grid-2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 18px;
}
.form-grid-3 {
  display: grid;
  grid-template-columns: 1fr 1fr 1.5fr;
  gap: 14px;
}
label {
  display: flex;
  flex-direction: column;
}
label span {
  font-size: 13px;
  font-weight: 600;
  color: #55493f;
  margin-bottom: 6px;
}
.input-field {
  padding: 12px 16px;
  border: 1px solid var(--line);
  border-radius: 12px;
  font-size: 15px;
  outline: none;
  background: #fff;
}
.input-field:focus {
  border-color: var(--maroon);
  box-shadow: 0 0 0 3px rgba(122, 31, 43, 0.1);
}
.hint {
  font-size: 11px;
  color: #8c7b6d;
  margin-top: 4px;
}
.design-preview-strip {
  display: flex;
  align-items: center;
  gap: 16px;
  background: #fdfaf6;
  border: 1px solid var(--line);
  border-radius: 14px;
  padding: 14px;
  margin-top: 18px;
}
.strip-img {
  width: 60px;
  height: 75px;
  object-fit: cover;
  border-radius: 8px;
}
.event-chips-bar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  margin-bottom: 20px;
}
.chip-hint {
  font-size: 13px;
  font-weight: 600;
  color: var(--gold);
}
.chip-btn {
  background: #fdfaf6;
  border: 1px solid var(--line);
  padding: 6px 12px;
  border-radius: 999px;
  font-size: 12px;
  cursor: pointer;
  color: #55493f;
}
.chip-btn:hover {
  background: var(--maroon);
  color: #fff;
  border-color: var(--maroon);
}
.event-card-row {
  background: #fdfaf6;
  border: 1px solid var(--line);
  border-radius: 14px;
  padding: 18px;
  margin-bottom: 14px;
}
.ev-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}
.ev-top h3 {
  font-family: var(--font-serif);
  font-size: 18px;
  color: var(--maroon);
}
.del-btn {
  background: transparent;
  border: 0;
  color: #b03a48;
  font-size: 12px;
  cursor: pointer;
  font-weight: 600;
}
.error-banner {
  background: #feecef;
  color: #a81c2d;
  padding: 12px 16px;
  border-radius: 10px;
  margin-bottom: 20px;
  font-size: 14px;
  font-weight: 600;
}
.submit-bar {
  text-align: center;
  margin-top: 30px;
}
.submit-btn {
  background: var(--maroon);
  color: #fff;
  border: 0;
  border-radius: 999px;
  padding: 16px 36px;
  font-size: 17px;
  font-weight: 700;
  cursor: pointer;
  width: 100%;
  max-width: 440px;
  box-shadow: 0 10px 24px rgba(122, 31, 43, 0.25);
  transition: transform 0.2s, background 0.2s;
}
.submit-btn:hover {
  background: #631721;
  transform: translateY(-2px);
}
.submit-sub {
  margin-top: 10px;
  font-size: 13px;
  color: #706253;
}

/* Done Card */
.done-card {
  text-align: center;
}
.done-icon {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background: #25d366;
  color: #fff;
  font-size: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
}
.done-card h1 {
  font-family: var(--font-serif);
  font-size: 38px;
  color: var(--maroon);
  margin-bottom: 10px;
}
.done-sub {
  font-size: 16px;
  color: #55493f;
  margin-bottom: 30px;
}
.btn-wa-lg {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: #25d366;
  color: #fff;
  text-decoration: none;
  font-size: 18px;
  font-weight: 700;
  padding: 16px 36px;
  border-radius: 999px;
  box-shadow: 0 10px 25px rgba(37, 211, 102, 0.35);
  margin-bottom: 40px;
}
.pay-box {
  background: #fdfaf6;
  border: 1px solid var(--line);
  border-radius: 20px;
  padding: 30px;
  text-align: left;
}
.pay-box h2 {
  font-family: var(--font-serif);
  color: var(--maroon);
  font-size: 24px;
  margin-bottom: 6px;
}
.pay-accounts {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-top: 20px;
}
.pay-method {
  background: #fff;
  border: 1px solid var(--line);
  border-radius: 14px;
  padding: 18px;
}
.pay-tag {
  display: block;
  font-size: 11px;
  text-transform: uppercase;
  font-weight: 700;
  color: var(--gold);
  margin-bottom: 12px;
}
.pay-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-size: 14px;
}
.pay-row b {
  color: var(--maroon);
}

@media (max-width: 768px) {
  .order-form-card {
    padding: 24px;
  }
  .form-row, .form-grid-2, .form-grid-3, .pay-accounts {
    grid-template-columns: 1fr;
  }
}
</style>
