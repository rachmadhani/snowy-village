<script setup lang="ts">
import { ref, onMounted } from 'vue';

const locations = [
  { name: 'Richmond', address: '#113-8571 Alexandra Rd, Richmond, BC', hours: ['Monday to Thursday 5pm-11pm', 'Friday 5pm-11:30pm', 'Saturday 1pm-11:30pm', 'Sunday 1pm-11pm'], phone: '(778) 681-7832' },
  { name: 'Coquitlam', address: '#100-1188 Pinetree Way, Coquitlam, BC', hours: ['Monday to Thursday 3pm-10pm', 'Friday & Saturday 1pm-11pm', 'Sunday 1pm-10pm', 'Tuesday Closed'], phone: '(604) 461-8896' },
  { name: 'Surrey', address: '#148-10090 152 St, Surrey, BC', hours: ['Monday to Thursday 3pm-10pm', 'Friday 3pm-10:30pm', 'Saturday 1pm-10:30pm', 'Sunday 1pm-10pm'], phone: '(604) 582-8842' },
  { name: 'Langley', address: '#105-21183 88 Ave, Langley, BC', hours: ['Monday 2pm-10pm', 'Tuesday to Sunday 1pm-10pm'], phone: '(604) 371-4007' },
  { name: 'Saskatoon', address: '#50-3270 Preston Ave S, Saskatoon, SK', hours: ['Monday to Thursday 11am-9:30pm', 'Friday to Sunday 11am-10pm'], phone: '(306) 668-0660' },
  { name: 'New Westminster Station', address: '#336-800 Carnarvon St, New Westminster, BC', hours: ['Monday to Thursday 3pm-9pm', 'Friday 3pm-10:30pm', 'Saturday 1pm-10:30pm', 'Sunday 1pm-9pm'], phone: '(604) 544-4277' },
  { name: 'New Westminster Victoria Hill (Corporate Store)', address: '#130-28E Royal Ave, New Westminster, BC', hours: ['Monday to Thursday 8am-9:30pm', 'Saturday & Sunday 11am-9:30pm', 'Wednesday Closed'], phone: '(604) 553-3550' },
  { name: 'Edmonton', address: '11022 Jasper Ave, Edmonton, AB', hours: ['Monday to Thursday 4pm-10pm', 'Friday 4pm-11pm', 'Saturday 1pm-11pm', 'Sunday 1pm-10pm'], phone: '(780) 752-1818' },
  { name: 'Victoria', address: '#2a-4071 Shelbourne St, Victoria, BC', hours: ['Sun to Thursday 12pm-8pm', 'Friday & Saturday 12pm-9pm', 'Tuesday Closed'], phone: '(250) 590-2277' },
  { name: 'Calgary', address: '#101-3604 52 Ave NW, Calgary, AB', hours: ['Sunday to Thursday 1pm-10pm', 'Friday, Saturday 1pm-11pm'] },
  { name: 'Calgary No2', address: '#145-180 Legacy Main Street SE, Calgary, AB', phone: '(825) 222-4416' },
  { name: 'Seoul Korea', address: '+82 10-9121-3969' }
];

const visibleCards = ref<Set<number>>(new Set());

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = parseInt(entry.target.getAttribute('data-id') || '0');
        visibleCards.value.add(id);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.location-card').forEach(card => observer.observe(card));
});
</script>

<template>
  <section class="locations-section" id="locations">
    <div class="locations-container">
      <div class="header-area">
        <img src="/footer-section/locations-title-1.svg" alt="Locations | Our store informations" class="title-svg" />
      </div>

      <div class="locations-grid">
        <div 
          v-for="(loc, index) in locations" 
          :key="index" 
          class="location-card"
          :data-id="index"
          :class="{ 'is-visible': visibleCards.has(index) }"
          :style="{ transitionDelay: (index % 3) * 0.1 + 's' }"
        >
          <div class="card-header">
            <img src="/footer-section/locations-pin.svg" class="pin-icon" alt="" />
            <h3 class="city-name">{{ loc.name }}</h3>
          </div>
          
          <div class="card-body">
            <p class="address">{{ loc.address }}</p>
            <div v-if="loc.hours" class="hours">
              <p v-for="h in loc.hours" :key="h">{{ h }}</p>
            </div>
            <p v-if="loc.phone" class="phone">{{ loc.phone }}</p>
          </div>

          <a v-if="loc.name !== 'Seoul Korea'" href="#" class="map-button">Google Map</a>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.locations-section {
  position: relative;
  width: 100%;
  background-color: #000;
  margin-top: -18vh;
  padding: 30vh 10% 15vh;
  /* Top slant: rising from left to right to match Drinks bottom */
  clip-path: polygon(0 18vh, 100% 0, 100% 100%, 0 100%);
  z-index: 6;
  color: #fff;
}

.locations-container {
  max-width: 1200px;
  margin: 0 auto;
}

.header-area {
  display: flex;
  justify-content: center;
  margin-bottom: 80px;
}

.title-svg {
  width: 100%;
  max-width: 500px;
  height: auto;
}

.locations-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 60px 40px;
}

.location-card {
  display: flex;
  flex-direction: column;
  gap: 15px;
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s ease-out;
}

.location-card.is-visible {
  opacity: 1;
  transform: translateY(0);
}

.card-header {
  display: flex;
  align-items: center;
  gap: 10px;
}

.pin-icon {
  width: 13px;
  height: 19px;
}

.city-name {
  font-size: 1.5rem;
  font-weight: 300;
  letter-spacing: 1px;
}

.card-body {
  font-size: 0.85rem;
  line-height: 1.6;
  color: #ccc;
  min-height: 120px;
}

.hours {
  margin: 10px 0;
}

.map-button {
  display: inline-block;
  width: fit-content;
  padding: 10px 40px;
  border: 1px solid #444;
  color: #fff;
  text-decoration: none;
  font-size: 0.8rem;
  transition: all 0.3s ease;
  margin-top: 10px;
  align-self: flex-start;
  min-width: 180px;
  text-align: center;
}

.map-button:hover {
  background-color: #fff;
  color: #000;
  border-color: #fff;
}

@media (max-width: 1024px) {
  .locations-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .locations-section {
    padding: 20vh 5% 10vh;
    clip-path: polygon(0 12vh, 100% 0, 100% 100%, 0 100%);
    margin-top: -12vh;
  }
  
  .locations-grid {
    grid-template-columns: 1fr;
    gap: 40px;
  }
  
  .city-name {
    font-size: 1.25rem;
  }
}
</style>
