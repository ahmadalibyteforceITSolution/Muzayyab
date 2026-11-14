<template>
  <footer class="foot">
    <div class="foot-wrap">
      <div class="foot-top">
        <div class="foot-brand">
          <router-link to="/" class="brand" aria-label="Muzayyan home">
            <svg aria-hidden="true" viewBox="0 0 40 50" class="brand-mark">
              <path d="M4 49V20.5C4 12 11 6.5 20 1.5 29 6.5 36 12 36 20.5V49" fill="none" stroke="#a8843f" stroke-width="1.4"/>
              <path d="M8.5 49V21.6C8.5 15.4 13.3 11.2 20 7.3c6.7 3.9 11.5 8.1 11.5 14.3V49" fill="none" stroke="#a8843f" stroke-width=".7" opacity=".7"/>
              <text x="20" y="38" text-anchor="middle" font-family="Cormorant Garamond, Georgia, serif" font-style="italic" font-weight="500" font-size="22" fill="#7a1f2b">M</text>
            </svg>
            <span class="wm"><b>MUZAYYAN</b><small>STUDIO</small></span>
          </router-link>
          <p class="tagline">Cinematic digital wedding invitations your guests open with their own hands. One link on WhatsApp.</p>
          <div class="social-links">
            <a :href="'https://wa.me/' + WA_NUMBER" target="_blank" rel="noopener" aria-label="WhatsApp">WhatsApp</a>
            <router-link to="/budget">Budget Calculator</router-link>
            <router-link to="/guests">Guest Planner</router-link>
          </div>
        </div>

        <div class="foot-links">
          <h4>Explore</h4>
          <router-link to="/#designs">All Designs</router-link>
          <router-link to="/#inside">Wedding Helpers</router-link>
          <router-link to="/#pricing">Pricing & Tiers</router-link>
          <router-link to="/order">Order Your Card</router-link>
        </div>

        <div class="foot-contact">
          <h4>Talk to us</h4>
          <ul>
            <li>
              <small>WhatsApp Orders & Support</small>
              <a :href="'https://wa.me/' + WA_NUMBER" target="_blank" rel="noopener">{{ WA_DISPLAY }}</a>
            </li>
            <li>
              <small>Email</small>
              <a href="mailto:hello@muzayyan.com">hello@muzayyan.com</a>
            </li>
          </ul>
        </div>
      </div>

      <div class="bigword" aria-hidden="true">MUZAYYAN</div>

      <div class="legal">
        <span>© 2026 Muzayyan · Karachi, Pakistan. All rights reserved.</span>
        <button type="button" class="ftop" @click="scrollToTop">Back to top ↑</button>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { WA_NUMBER, WA_DISPLAY } from '../data/constants.js';

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
</script>

<style scoped>
.foot {
  background: #181311;
  color: #ede5da;
  padding: 80px 20px 40px;
  position: relative;
  overflow: hidden;
}
.foot-wrap {
  max-width: 1200px;
  margin: 0 auto;
}
.foot-top {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 40px;
  margin-bottom: 60px;
}
.brand {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  color: #fff;
  margin-bottom: 16px;
}
.brand-mark {
  width: 28px;
  height: 35px;
}
.wm b {
  font-family: "Cormorant Garamond", Georgia, serif;
  font-size: 22px;
  color: #fff;
}
.wm small {
  color: #c49d53;
  letter-spacing: 0.3em;
  font-size: 8px;
}
.tagline {
  max-width: 380px;
  font-size: 14px;
  line-height: 1.6;
  opacity: 0.75;
  margin-bottom: 20px;
}
.social-links {
  display: flex;
  gap: 16px;
}
.social-links a {
  color: #c49d53;
  text-decoration: none;
  font-size: 13px;
  font-weight: 500;
}
.foot-links h4, .foot-contact h4 {
  font-family: "Cormorant Garamond", serif;
  font-size: 20px;
  color: #c49d53;
  margin-bottom: 16px;
}
.foot-links a {
  display: block;
  color: #ede5da;
  text-decoration: none;
  font-size: 14px;
  margin-bottom: 10px;
  opacity: 0.8;
  transition: opacity 0.2s;
}
.foot-links a:hover {
  opacity: 1;
}
.foot-contact ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
.foot-contact li {
  margin-bottom: 16px;
}
.foot-contact small {
  display: block;
  font-size: 11px;
  color: #c49d53;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 4px;
}
.foot-contact a {
  color: #ede5da;
  text-decoration: none;
  font-size: 15px;
  font-weight: 600;
}
.bigword {
  font-family: "Cormorant Garamond", serif;
  font-size: clamp(48px, 12vw, 140px);
  font-weight: 700;
  color: rgba(196, 157, 83, 0.08);
  letter-spacing: 0.15em;
  text-align: center;
  line-height: 1;
  user-select: none;
  margin: 20px 0;
}
.legal {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 24px;
  font-size: 13px;
  opacity: 0.6;
}
.ftop {
  background: transparent;
  border: 0;
  color: #c49d53;
  cursor: pointer;
  font-size: 13px;
}
@media (max-width: 768px) {
  .foot-top {
    grid-template-columns: 1fr;
    gap: 30px;
  }
}
</style>
