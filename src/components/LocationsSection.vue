<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { locationService, type Location } from '@/services/locationService';

const locations = ref<Location[]>([]);
const loading = ref(true);
const visibleCards = ref<Set<number>>(new Set());
let observer: IntersectionObserver | null = null;

const formatDay = (day: string) => {
  return day.charAt(0).toUpperCase() + day.slice(1);
};

const getDisplayHours = (location: Location) => {
  const hours = location.opening_hours;
  if (!hours) return [];

  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  const grouped: string[] = [];
  
  let i = 0;
  while (i < days.length) {
    let j = i + 1;
    const timeArray = hours[days[i]] ?? [];
    const currentTime = timeArray.length > 0 ? timeArray[0] : 'Closed';
    
    while (j < days.length) {
      const nextTimeArray = hours[days[j]] ?? [];
      const nextTime = nextTimeArray.length > 0 ? nextTimeArray[0] : 'Closed';
      if (nextTime === currentTime) {
        j++;
      } else {
        break;
      }
    }
    
    const count = j - i;
    const startTime = currentTime;
    
    if (count === 1) {
      grouped.push(`${formatDay(days[i])} ${startTime}`);
    } else if (count === 2) {
      grouped.push(`${formatDay(days[i])} & ${formatDay(days[j-1])} ${startTime}`);
    } else {
      grouped.push(`${formatDay(days[i])} to ${formatDay(days[j-1])} ${startTime}`);
    }
    
    i = j;
  }
  
  return grouped;
};

const fetchLocations = async () => {
  try {
    const response = await locationService.getAll();
    locations.value = response.data;
  } catch (error) {
    console.error('Failed to fetch locations:', error);
  } finally {
    loading.value = false;
  }
};

const setupObserver = () => {
  if (observer) observer.disconnect();
  
  observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = parseInt(entry.target.getAttribute('data-id') || '0');
        visibleCards.value.add(id);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.location-card').forEach(card => observer?.observe(card));
};

onMounted(async () => {
  await fetchLocations();
  setupObserver();
});

watch(locations, () => {
  setTimeout(setupObserver, 100);
});
</script>

<template>
  <section class="locations-section" id="locations">
    <div class="locations-container">
      <div class="header-area">
        <img src="/footer-section/locations-title-1.svg" alt="Locations | Our store informations" class="title-svg" />
      </div>

      <div class="locations-grid" v-if="!loading">
        <div 
          v-for="(loc, index) in locations" 
          :key="loc.id" 
          class="location-card"
          :data-id="loc.id"
          :class="{ 'is-visible': visibleCards.has(loc.id) }"
          :style="{ transitionDelay: (index % 3) * 0.1 + 's' }"
        >
          <div class="card-header">
            <img src="/footer-section/locations-pin.svg" class="pin-icon" alt="" />
            <h3 class="city-name">{{ loc.city_name }}</h3>
          </div>
          
          <div class="card-body">
            <p class="address">{{ loc.address }}</p>
            <div class="hours">
              <p v-for="h in getDisplayHours(loc)" :key="h">{{ h }}</p>
            </div>
            <p v-if="loc.phone_number" class="phone">{{ loc.phone_number }}</p>
          </div>

          <a v-if="loc.map_url" :href="loc.map_url" target="_blank" class="map-button">Google Map</a>
          <a v-else-if="loc.city_name !== 'Seoul Korea'" href="#" class="map-button">Google Map</a>
        </div>
      </div>
      <div v-else class="loading-state">
        <p>Loading locations...</p>
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
  padding: 30vh 10% 28vh;
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
  gap: 60px 150px;
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
  font-size: 17pt;
  font-weight: 300;
  letter-spacing: 1px;
}

.card-body {
  font-size: 9pt;
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

.loading-state {
  text-align: center;
  padding: 50px;
  color: #888;
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
