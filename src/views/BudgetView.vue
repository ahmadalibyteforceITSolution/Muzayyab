<template>
  <div class="budget-page">
    <div class="budget-wrap">
      <div class="budget-header">
        <span class="eyebrow">Wedding Planning Tool</span>
        <h1>Wedding Budget Calculator</h1>
        <p>Plan and track all your wedding expenses in one place.</p>

        <div class="budget-summary-box">
          <div class="sum-item">
            <small>Total Estimated</small>
            <b>Rs {{ totalEstimated.toLocaleString() }}</b>
          </div>
          <div class="sum-divider">/</div>
          <div class="sum-item">
            <small>Actual Spent</small>
            <b class="spent">Rs {{ totalSpent.toLocaleString() }}</b>
          </div>
          <div class="sum-divider">/</div>
          <div class="sum-item">
            <small>Remaining</small>
            <b :class="{ negative: remaining < 0 }">Rs {{ remaining.toLocaleString() }}</b>
          </div>
        </div>
      </div>

      <div class="cat-list">
        <div v-for="(cat, idx) in categories" :key="cat.name" class="cat-card">
          <div class="cat-header">
            <h3>{{ cat.name }}</h3>
            <span class="cat-total">Rs {{ catTotal(cat).toLocaleString() }}</span>
          </div>

          <table class="budget-table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Estimated (PKR)</th>
                <th>Actual (PKR)</th>
                <th style="width: 80px;">Paid</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in cat.items" :key="item.name">
                <td>{{ item.name }}</td>
                <td><input type="number" v-model.number="item.estimated" class="num-input" /></td>
                <td><input type="number" v-model.number="item.actual" class="num-input" /></td>
                <td style="text-align: center;">
                  <input type="checkbox" v-model="item.paid" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const categories = ref([
  {
    name: "Venue & Catering",
    items: [
      { name: "Mehndi Venue & Food", estimated: 500000, actual: 480000, paid: true },
      { name: "Baraat Marquee & Buffet", estimated: 1200000, actual: 1150000, paid: false },
      { name: "Walima Banquet", estimated: 900000, actual: 900000, paid: false }
    ]
  },
  {
    name: "Invitations & Media",
    items: [
      { name: "Muzayyan Digital Wedding Card", estimated: 6300, actual: 6300, paid: true },
      { name: "Photo & Cinematic Video Coverage", estimated: 350000, actual: 300000, paid: true }
    ]
  },
  {
    name: "Attire & Beauty",
    items: [
      { name: "Bridal Outfits (Mehndi, Baraat, Walima)", estimated: 450000, actual: 400000, paid: true },
      { name: "Groom Sherwani & Suits", estimated: 180000, actual: 160000, paid: true },
      { name: "Bridal Salon & Makeup", estimated: 150000, actual: 140000, paid: false }
    ]
  },
  {
    name: "Decor & Sound",
    items: [
      { name: "Stage Floral Decor & Entryway", estimated: 350000, actual: 320000, paid: false },
      { name: "DJ, Lighting & Sound System", estimated: 120000, actual: 110000, paid: true }
    ]
  }
]);

function catTotal(cat) {
  return cat.items.reduce((sum, item) => sum + (item.actual || item.estimated || 0), 0);
}

const totalEstimated = computed(() => {
  return categories.value.reduce((total, cat) => {
    return total + cat.items.reduce((sum, i) => sum + (i.estimated || 0), 0);
  }, 0);
});

const totalSpent = computed(() => {
  return categories.value.reduce((total, cat) => {
    return total + cat.items.reduce((sum, i) => sum + (i.actual || 0), 0);
  }, 0);
});

const remaining = computed(() => {
  return totalEstimated.value - totalSpent.value;
});
</script>

<style scoped>
.budget-page {
  background: #f7efe4;
  min-height: 90vh;
  padding: 50px 20px 80px;
}
.budget-wrap {
  max-width: 900px;
  margin: 0 auto;
}
.budget-header {
  text-align: center;
  margin-bottom: 40px;
}
.budget-header h1 {
  font-family: var(--font-serif);
  font-size: 38px;
  color: var(--maroon);
  margin: 6px 0 10px;
}
.budget-summary-box {
  background: #fff;
  border-radius: 20px;
  border: 1px solid var(--line);
  padding: 24px 30px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-top: 24px;
  box-shadow: 0 12px 30px rgba(122, 31, 43, 0.08);
}
.sum-item {
  text-align: center;
}
.sum-item small {
  display: block;
  font-size: 12px;
  color: #706253;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 4px;
}
.sum-item b {
  font-size: 24px;
  color: var(--maroon);
}
.sum-item b.spent {
  color: #2e7d32;
}
.sum-item b.negative {
  color: #d32f2f;
}
.sum-divider {
  font-size: 24px;
  color: var(--line);
}
.cat-card {
  background: #fff;
  border-radius: 18px;
  border: 1px solid var(--line);
  padding: 24px;
  margin-bottom: 24px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.03);
}
.cat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  border-bottom: 1px solid var(--line);
  padding-bottom: 12px;
}
.cat-header h3 {
  font-family: var(--font-serif);
  font-size: 22px;
  color: var(--maroon);
}
.cat-total {
  font-weight: 700;
  color: var(--gold);
}
.budget-table {
  width: 100%;
  border-collapse: collapse;
}
.budget-table th {
  text-align: left;
  font-size: 12px;
  color: #706253;
  padding: 8px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
.budget-table td {
  padding: 10px 8px;
  border-bottom: 1px solid #f4ece1;
}
.num-input {
  width: 120px;
  padding: 6px 10px;
  border: 1px solid var(--line);
  border-radius: 8px;
  font-size: 14px;
}
</style>
