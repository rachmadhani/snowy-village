<script setup lang="ts">
import { ref } from 'vue';
import FooterSection from '../components/FooterSection.vue';
import Sidebar from '../components/Sidebar.vue';

const formData = ref({
  name: '',
  email: '',
  phone: '',
  location: '',
  inquiry: ''
});

const handleSubmit = () => {
  console.log('Franchise Inquiry:', formData.value);
  // Implementation for form submission would go here (e.g., API call)
  alert('Thank you for your interest! We will get back to you soon.');
  formData.value = { name: '', email: '', phone: '', location: '', inquiry: '' };
};
</script>

<template>
  <div class="franchise-page">
    <Sidebar />
    
    <div class="franchise-content">
      <!-- Page Header -->
      <header class="page-header">
        <img src="/franchise-section/franchise-title.svg" alt="Franchise | Join our growing family!" class="franchise-title-svg" />
      </header>

      <!-- Sub-Header Info -->
      <div class="info-section">
        <div class="subtitle-wrap">
          <div class="info-badge">INFO</div>
          <h2 class="sub-title">Join the fastest growing Bingsoo Café in USA!</h2>
        </div>
        <div class="v-divider"></div>
        <div class="step-count">02</div>
      </div>

      <p class="update-date">Updated: 03.04.2018</p>

      <!-- Main Opportunity Box -->
      <main class="opportunity-container">
        <div class="opportunity-content">
          <h3 class="opp-title">Opportunity awaits you. Join our growing family.</h3>
          <div class="opp-body">
            <p>
              Snowy Village is the fastest growing bingsoo café in USA. In just a little over 2 years we have grown from one location to now across Canada. we are always looking for passionate partners to take on the new market with us.
            </p>
            <p>
              Email us with inquiry and we will get back to you with all the tangible information you would need to own your very own Snowy Village Franchise.
            </p>
          </div>
        </div>

        <!-- Franchise Form -->
        <form @submit.prevent="handleSubmit" class="franchise-form">
          <p class="form-instruction">Please fill in the form box below</p>
          
          <div class="form-group">
            <input type="text" v-model="formData.name" placeholder="Enter Name" required />
          </div>
          <div class="form-group">
            <input type="email" v-model="formData.email" placeholder="Enter Email" required />
          </div>
          <div class="form-group">
            <input type="tel" v-model="formData.phone" placeholder="Enter Phone Number" />
          </div>
          <div class="form-group">
            <input type="text" v-model="formData.location" placeholder="Location" />
          </div>
          <div class="form-group">
            <textarea v-model="formData.inquiry" placeholder="Let us know about your inquiry!" rows="6"></textarea>
          </div>

          <button type="submit" class="submit-btn">Submit</button>
        </form>
      </main>

      <p class="disclaimer">
        Please note that due to high volume demands we cannot reply in a timely manner. Please be patient as we will get to your inquiries asap. Thank you.
      </p>
    </div>

    <FooterSection />
  </div>
</template>

<style scoped>
.franchise-page {
  background-color: #f2f2f2;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  color: #111;
  font-family: 'Outfit', sans-serif;
  padding-top: 100px; /* Space for fixed sidebar/nav if any */
}

.franchise-content {
  flex: 1;
  max-width: 1000px;
  margin: 0 auto;
  padding: 60px 20px 200px;
  width: 100%;
}

/* Header Styles */
.page-header {
  display: flex;
  justify-content: center;
  margin-bottom: 80px;
}
 
.franchise-title-svg {
  width: 100%;
  max-width: 450px;
  height: auto;
}
 
/* Info Section */
.info-section {
  display: flex;
  /* align-items: center; */
  gap: 20px;
  margin-bottom: 25px;
}
 
.subtitle-wrap {
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-width: 400px;
}
 
.info-badge {
  background: #000;
  color: #fff;
  padding: 3px 10px;
  font-size: 11px;
  font-weight: 700;
  width: auto;
  border-radius: 2px;
}
 
.sub-title {
  font-size: 26px;
  font-weight: 600;
  color: #111;
  margin: 0;
  max-width: 500px;
  line-height: 1.2;
}
 
.v-divider {
  width: 4px;
  height: 40px;
  background: #ddd;
}
 
.step-count {
  background: #B9C83E;
  color: #fff;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 700;
}
 
.update-date {
  font-size: 11px;
  color: #999;
  margin-bottom: 40px;
}
 
/* Opportunity Container */
.opportunity-container {
  background: #e6e6e6;
  padding: 60px 50px;
  border-radius: 4px;
  margin-bottom: 40px;
}
 
.opp-title {
  font-size: 20px;
  font-weight: 400;
  color: #111;
  margin-bottom: 30px;
}
 
.opp-body {
  font-size: 14px;
  line-height: 1.8;
  color: #444;
}
 
.opp-body p {
  margin-bottom: 15px;
}

/* Form Styles */
.franchise-form {
  max-width: 750px;
  margin: 0 auto;
}

.form-instruction {
  font-size: 11px;
  color: #888;
  margin-bottom: 15px;
  text-align: center;
}

.form-group {
  margin-bottom: 12px;
}

.franchise-form input,
.franchise-form textarea {
  width: 100%;
  padding: 14px 20px;
  border: 1px solid #ccc;
  background: #fdfdfd;
  font-size: 13px;
  font-family: inherit;
  color: #333;
  transition: border-color 0.3s;
}

.franchise-form input::placeholder,
.franchise-form textarea::placeholder {
  color: #bbb;
  font-style: italic;
  font-size: 12px;
}

.franchise-form input:focus,
.franchise-form textarea:focus {
  outline: none;
  border-color: #777;
}

.submit-btn {
  width: 100%;
  background: #000;
  color: #fff;
  border: none;
  padding: 16px;
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
  margin-top: 10px;
  cursor: pointer;
  transition: background 0.3s;
}

.submit-btn:hover {
  background: #222;
}

.disclaimer {
  text-align: center;
  font-size: 11px;
  color: #999;
  line-height: 1.6;
  margin-top: 40px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

/* Responsive */
@media (max-width: 768px) {
  .franchise-content {
    padding-top: 40px;
  }
  .opportunity-container {
    padding: 40px 20px;
  }
  .page-header {
    margin-bottom: 40px;
  }
  .main-title {
    font-size: 28px;
  }
  .info-section {
    flex-wrap: wrap;
  }
  .sub-title {
    font-size: 20px;
  }
}
</style>
