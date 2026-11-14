<template>
  <div class="guests-page">
    <div class="guests-wrap">
      <div class="guests-header">
        <span class="eyebrow">Guest List Manager</span>
        <h1>Wedding Guest Planner</h1>
        <p>Keep track of invitations sent, family counts, and RSVPs.</p>

        <div class="guest-stats-row">
          <div class="stat-pill">
            <small>Total Invited</small>
            <b>{{ totalInvited }}</b>
          </div>
          <div class="stat-pill confirmed">
            <small>Confirmed Attending</small>
            <b>{{ totalConfirmed }}</b>
          </div>
          <div class="stat-pill pending">
            <small>Awaiting Reply</small>
            <b>{{ totalPending }}</b>
          </div>
        </div>
      </div>

      <!-- Add Guest Card -->
      <div class="add-guest-card">
        <h3>Add New Guest / Family</h3>
        <form @submit.prevent="addGuest" class="add-form">
          <input v-model="newGuest.name" placeholder="Guest / Family Name (e.g. Uncle Nadeem & Family)" required class="guest-input" />
          <select v-model="newGuest.side" class="guest-select">
            <option value="Bride">Bride's Side</option>
            <option value="Groom">Groom's Side</option>
            <option value="Mutual">Mutual Friends</option>
          </select>
          <input v-model.number="newGuest.count" type="number" min="1" placeholder="Guests" class="guest-input-sm" />
          <button type="submit" class="btn btn-primary">+ Add Guest</button>
        </form>
      </div>

      <!-- Guest Table -->
      <div class="table-card">
        <div class="table-filter-bar">
          <button
            v-for="s in ['All', 'Bride', 'Groom']"
            :key="s"
            type="button"
            class="filter-pill"
            :class="{ active: filterSide === s }"
            @click="filterSide = s"
          >
            {{ s }}
          </button>
        </div>

        <table class="guests-table">
          <thead>
            <tr>
              <th>Guest Name</th>
              <th>Side</th>
              <th>Count</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(g, idx) in filteredGuests" :key="idx">
              <td><b>{{ g.name }}</b></td>
              <td><span class="side-tag">{{ g.side }}</span></td>
              <td>{{ g.count }} person(s)</td>
              <td>
                <select v-model="g.status" class="status-select" :class="g.status.toLowerCase()">
                  <option value="Confirmed">Confirmed</option>
                  <option value="Sent">Sent</option>
                  <option value="Pending">Pending</option>
                </select>
              </td>
              <td>
                <button type="button" class="del-btn" @click="deleteGuest(idx)">✕</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const filterSide = ref('All');

const newGuest = ref({
  name: '',
  side: 'Bride',
  count: 2,
  status: 'Sent'
});

const guests = ref([
  { name: 'Dr. Tariq & Family', side: 'Bride', count: 4, status: 'Confirmed' },
  { name: 'Rashid Uncle & Khala', side: 'Bride', count: 2, status: 'Confirmed' },
  { name: 'Babar Qureshi & Family', side: 'Groom', count: 5, status: 'Pending' },
  { name: 'Farhan & Friends', side: 'Groom', count: 3, status: 'Sent' }
]);

function addGuest() {
  if (!newGuest.value.name.trim()) return;
  guests.value.unshift({
    name: newGuest.value.name.trim(),
    side: newGuest.value.side,
    count: newGuest.value.count || 1,
    status: 'Sent'
  });
  newGuest.value.name = '';
  newGuest.value.count = 2;
}

function deleteGuest(idx) {
  guests.value.splice(idx, 1);
}

const filteredGuests = computed(() => {
  if (filterSide.value === 'All') return guests.value;
  return guests.value.filter(g => g.side === filterSide.value);
});

const totalInvited = computed(() => {
  return guests.value.reduce((acc, g) => acc + (g.count || 1), 0);
});

const totalConfirmed = computed(() => {
  return guests.value
    .filter(g => g.status === 'Confirmed')
    .reduce((acc, g) => acc + (g.count || 1), 0);
});

const totalPending = computed(() => {
  return guests.value
    .filter(g => g.status !== 'Confirmed')
    .reduce((acc, g) => acc + (g.count || 1), 0);
});
</script>

<style scoped>
.guests-page {
  background: #f7efe4;
  min-height: 90vh;
  padding: 50px 20px 80px;
}
.guests-wrap {
  max-width: 900px;
  margin: 0 auto;
}
.guests-header {
  text-align: center;
  margin-bottom: 40px;
}
.guests-header h1 {
  font-family: var(--font-serif);
  font-size: 38px;
  color: var(--maroon);
  margin: 6px 0 10px;
}
.guest-stats-row {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 24px;
}
.stat-pill {
  background: #fff;
  border: 1px solid var(--line);
  border-radius: 16px;
  padding: 16px 28px;
  text-align: center;
}
.stat-pill small {
  display: block;
  font-size: 11px;
  color: #706253;
  text-transform: uppercase;
  margin-bottom: 4px;
}
.stat-pill b {
  font-size: 26px;
  color: var(--maroon);
}
.stat-pill.confirmed b {
  color: #2e7d32;
}
.stat-pill.pending b {
  color: #e65100;
}
.add-guest-card {
  background: #fff;
  border-radius: 18px;
  border: 1px solid var(--line);
  padding: 24px;
  margin-bottom: 30px;
}
.add-guest-card h3 {
  font-family: var(--font-serif);
  font-size: 20px;
  color: var(--maroon);
  margin-bottom: 16px;
}
.add-form {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}
.guest-input {
  flex: 2;
  min-width: 220px;
  padding: 10px 14px;
  border: 1px solid var(--line);
  border-radius: 10px;
}
.guest-select {
  padding: 10px 14px;
  border: 1px solid var(--line);
  border-radius: 10px;
  background: #fff;
}
.guest-input-sm {
  width: 90px;
  padding: 10px 14px;
  border: 1px solid var(--line);
  border-radius: 10px;
}
.table-card {
  background: #fff;
  border-radius: 18px;
  border: 1px solid var(--line);
  padding: 24px;
}
.table-filter-bar {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}
.filter-pill {
  border: 1px solid var(--line);
  background: #fff;
  padding: 6px 16px;
  border-radius: 999px;
  cursor: pointer;
  font-size: 13px;
}
.filter-pill.active {
  background: var(--maroon);
  color: #fff;
  border-color: var(--maroon);
}
.guests-table {
  width: 100%;
  border-collapse: collapse;
}
.guests-table th {
  text-align: left;
  font-size: 12px;
  color: #706253;
  padding: 10px;
  text-transform: uppercase;
  border-bottom: 1px solid var(--line);
}
.guests-table td {
  padding: 14px 10px;
  border-bottom: 1px solid #f4ece1;
}
.side-tag {
  background: #fdfaf6;
  border: 1px solid var(--line);
  padding: 3px 8px;
  border-radius: 6px;
  font-size: 12px;
}
.status-select {
  padding: 4px 8px;
  border-radius: 6px;
  border: 1px solid var(--line);
  font-size: 12px;
}
.status-select.confirmed {
  color: #2e7d32;
  font-weight: 600;
}
.status-select.pending {
  color: #e65100;
}
.del-btn {
  background: transparent;
  border: 0;
  color: #b03a48;
  cursor: pointer;
  font-size: 16px;
}
</style>
