<template>
  <a
    :href="whatsappUrl"
    target="_blank"
    rel="noopener"
    class="wafab"
    aria-label="Chat with Muzayyan on WhatsApp"
  >
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <path d="M16 3C9 3 3.3 8.6 3.3 15.6c0 2.5.7 4.8 2 6.8L3 29l6.8-2.2c2 1.1 4.2 1.8 6.2 1.8 7 0 12.7-5.7 12.7-12.7S23 3 16 3zm0 23.2c-1.8 0-3.6-.5-5.2-1.5l-.4-.2-4 1.3 1.3-3.9-.2-.4c-1.1-1.7-1.7-3.7-1.7-5.9 0-5.7 4.6-10.3 10.3-10.3s10.3 4.6 10.3 10.3-4.6 10.3-10.4 10.3zm5.7-7.7c-.3-.2-1.8-.9-2.1-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-.9 1.2-.2.2-.4.2-.7 0-.3-.2-1.4-.5-2.6-1.6-.9-.8-1.6-1.9-1.8-2.2-.2-.3 0-.5.2-.7.2-.1.3-.4.5-.5.2-.2.2-.3.3-.5.1-.2.1-.4 0-.5s-.7-1.7-1-2.3c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.4-1.2 1.2-1.2 2.9 0 1.7 1.2 3.4 1.4 3.6.2.2 2.4 3.7 5.9 5.2.8.4 1.5.6 2 .8.8.3 1.6.2 2.2.1.7-.1 2.1-.9 2.4-1.7.3-.8.3-1.6.2-1.7-.1-.2-.3-.3-.6-.5z"/>
    </svg>
    <span class="fab-label">Chat on WhatsApp</span>
  </a>
</template>

<script setup>
import { computed } from 'vue';
import { WA_NUMBER } from '../data/constants.js';

const whatsappUrl = computed(() => {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Hi Muzayyan! 🤍 I have a question about a wedding card.")}`;
});
</script>

<style scoped>
.wafab {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 999;
  background: #25d366;
  color: #fff;
  border-radius: 999px;
  padding: 12px 18px;
  display: flex;
  align-items: center;
  gap: 10px;
  box-shadow: 0 8px 24px rgba(37, 211, 102, 0.4);
  text-decoration: none;
  font-weight: 600;
  font-size: 14px;
  transition: transform 0.2s, box-shadow 0.2s;
}
.wafab:hover {
  transform: translateY(-2px) scale(1.02);
  box-shadow: 0 12px 30px rgba(37, 211, 102, 0.5);
}
.wafab svg {
  width: 24px;
  height: 24px;
  fill: #fff;
}
@media (max-width: 600px) {
  .fab-label {
    display: none;
  }
  .wafab {
    padding: 14px;
    border-radius: 50%;
  }
}
</style>
