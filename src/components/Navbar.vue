<template>
  <header class="topbar">
    <div class="wrap">
      <router-link to="/" class="brand" aria-label="Muzayyan home">
        <svg aria-hidden="true" viewBox="0 0 40 50" class="brand-mark">
          <path d="M4 49V20.5C4 12 11 6.5 20 1.5 29 6.5 36 12 36 20.5V49" fill="none" stroke="#a8843f" stroke-width="1.4"/>
          <path d="M8.5 49V21.6C8.5 15.4 13.3 11.2 20 7.3c6.7 3.9 11.5 8.1 11.5 14.3V49" fill="none" stroke="#a8843f" stroke-width=".7" opacity=".7"/>
          <text x="20" y="38" text-anchor="middle" font-family="Cormorant Garamond, Georgia, serif" font-style="italic" font-weight="500" font-size="22" fill="#7a1f2b">M</text>
        </svg>
        <span class="wm"><b>MUZAYYAN</b><small>STUDIO</small></span>
      </router-link>

      <nav class="links" aria-label="Main">
        <router-link to="/#designs">Designs</router-link>
        <router-link to="/#inside">What's inside</router-link>
        <router-link to="/#how">How it works</router-link>
        <router-link to="/#pricing">Pricing</router-link>
        <router-link to="/#faq">FAQ</router-link>
        <router-link to="/budget">Budget</router-link>
        <router-link to="/guests">Guests</router-link>
      </nav>

      <div class="top-actions">
        <router-link to="/order" class="btn order-btn">Order card</router-link>
      </div>
    </div>
  </header>
</template>

<script setup>
</script>

<style scoped>
.topbar {
  position: sticky;
  top: 0;
  z-index: 900;
  background: rgba(253, 250, 246, 0.94);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(168, 132, 63, 0.2);
}
.wrap {
  max-width: 1200px;
  margin: 0 auto;
  padding: 12px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.brand {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  color: var(--maroon, #7a1f2b);
}
.brand-mark {
  width: 28px;
  height: 35px;
}
.wm {
  display: flex;
  flex-direction: column;
  letter-spacing: 0.15em;
  line-height: 1;
}
.wm b {
  font-family: "Cormorant Garamond", Georgia, serif;
  font-size: 20px;
  font-weight: 700;
  color: #7a1f2b;
}
.wm small {
  font-size: 8px;
  letter-spacing: 0.3em;
  color: #a8843f;
  margin-top: 2px;
}
.links {
  display: flex;
  align-items: center;
  gap: 22px;
}
.links a {
  text-decoration: none;
  color: #4a4036;
  font-size: 14px;
  font-weight: 500;
  transition: color 0.2s;
}
.links a:hover {
  color: #7a1f2b;
}
.top-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}
.order-btn {
  background: #7a1f2b;
  color: #fff;
  padding: 8px 18px;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 600;
  text-decoration: none;
  transition: opacity 0.2s, transform 0.2s;
}
.order-btn:hover {
  opacity: 0.9;
  transform: translateY(-1px);
}
@media (max-width: 860px) {
  .links {
    display: none;
  }
}
</style>
