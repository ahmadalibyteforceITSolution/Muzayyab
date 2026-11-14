<template>
  <div class="app-container">
    <Navbar />
    <main>
      <router-view />
    </main>
    <Footer />
    <WhatsAppFab />
  </div>
</template>

<script setup>
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';
import WhatsAppFab from './components/WhatsAppFab.vue';
</script>

<style>
:root {
  --maroon: #7a1f2b;
  --gold: #a8843f;
  --paper: #fdfaf6;
  --ink: #1f1b18;
  --line: rgba(168, 132, 63, 0.25);
  --font-serif: "Cormorant Garamond", Georgia, serif;
  --font-sans: "Hanken Grotesk", system-ui, sans-serif;
  --font-script: "Great Vibes", cursive;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: var(--font-sans);
  background-color: var(--paper);
  color: var(--ink);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

main {
  flex: 1;
}
</style>
