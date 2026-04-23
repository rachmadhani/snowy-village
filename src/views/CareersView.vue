<script setup lang="ts">
import { ref } from 'vue';
import FooterSection from '../components/FooterSection.vue';
import Sidebar from '../components/Sidebar.vue';

const formData = ref({
  name: '',
  email: '',
  phone: '',
  jobType: [] as string[],
  availability: '',
  message: ''
});

const handleSubmit = () => {
  console.log('Careers Application:', formData.value);
  // Implementation for form submission would go here (e.g., API call)
  alert('Thank you for applying! We will review your application and get back to you soon.');
  formData.value = { name: '', email: '', phone: '', jobType: [], availability: '', message: '' };
};
</script>

<template>
  <div class="careers-page">
    <Sidebar />
    
    <div class="careers-content">
      <!-- Page Header -->
      <header class="page-header">
        <img src="/carrers-section/carrers-title.svg" alt="Careers | Join our growing family!" class="careers-title-svg" />
      </header>

      <!-- Sub-Header Info -->
      <div class="info-section">
        <img src="/carrers-section/carrers-subtitle.svg" alt="Our Coquitlam location is hiring!" class="careers-subtitle-svg" />
      </div>

      <p class="update-date">Updated: 03.04.2018</p>

      <!-- Main Employee Care Box -->
      <main class="employee-box">
        <div class="employee-header">
          <img src="/carrers-section/carrers-description.svg" alt="We take special care of all our employees!" class="careers-description-svg" />
        </div>

        <!-- Careers Form -->
        <form @submit.prevent="handleSubmit" class="careers-form">
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

          <div class="checkbox-group">
            <label class="checkbox-container">
              <input type="checkbox" v-model="formData.jobType" value="Full-Time" />
              <span class="checkmark"></span>
              Full-Time
            </label>
            <label class="checkbox-container">
              <input type="checkbox" v-model="formData.jobType" value="Part-Time" />
              <span class="checkmark"></span>
              Part-Time
            </label>
          </div>

          <div class="form-group">
            <textarea v-model="formData.availability" placeholder="Enter your available days to work." rows="4"></textarea>
          </div>
          <div class="form-group">
            <textarea v-model="formData.message" placeholder="Tell us why do you want to work for us?" rows="4"></textarea>
          </div>

          <button type="submit" class="submit-btn">Submit</button>
        </form>
      </main>

      <p class="disclaimer">
        By clicking or pressing send you are agreeing that all the information you have provided are real and that Snowy Village will not be liable for any false information provided by you.
      </p>
    </div>

    <FooterSection />
  </div>
</template>

<style scoped>
.careers-page {
  background-color: #f2f2f2;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  color: #111;
  font-family: 'Outfit', sans-serif;
  padding-top: 100px;
}

.careers-content {
  flex: 1;
  max-width: 1000px;
  margin: 0 auto;
  padding: 60px 20px 200px;
  width: 100%;
}

/* Page Header Styles */
.page-header {
  display: flex;
  justify-content: center;
  margin-bottom: 80px;
}

.careers-title-svg {
  width: 100%;
  max-width: 450px;
  height: auto;
}

/* Info Section Styles */
.info-section {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 20px;
}

.careers-subtitle-svg {
  width: 100%;
  max-width: 476px;
  height: auto;
}

.update-date {
  font-size: 11px;
  color: #999;
  margin-bottom: 40px;
}

/* Employee Box Container */
.employee-box {
  background: #e6e6e6;
  padding: 60px 50px;
  border-radius: 4px;
}

.employee-header {
  margin-bottom: 40px;
}

.careers-description-svg {
  width: 100%;
  max-width: 559px;
  height: auto;
}

/* Form Styles */
.careers-form {
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

.careers-form input,
.careers-form textarea {
  width: 100%;
  padding: 14px 20px;
  border: 1px solid #ccc;
  background: #fdfdfd;
  font-size: 13px;
  font-family: inherit;
  color: #333;
  transition: border-color 0.3s;
}

.careers-form input::placeholder,
.careers-form textarea::placeholder {
  color: #bbb;
  font-style: italic;
  font-size: 12px;
}

.careers-form input:focus,
.careers-form textarea:focus {
  outline: none;
  border-color: #777;
}

/* Checkbox Styles */
.checkbox-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 15px 0 20px;
}

.checkbox-container {
  display: flex;
  align-items: center;
  position: relative;
  padding-left: 30px;
  cursor: pointer;
  font-size: 13px;
  color: #555;
  user-select: none;
}

.checkbox-container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 18px;
  width: 18px;
  background-color: #fdfdfd;
  border: 1px solid #ccc;
}

.checkbox-container:hover input ~ .checkmark {
  background-color: #eee;
}

.checkbox-container input:checked ~ .checkmark {
  background-color: #000;
  border-color: #000;
}

.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

.checkbox-container input:checked ~ .checkmark:after {
  display: block;
}

.checkbox-container .checkmark:after {
  left: 6px;
  top: 2px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
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
  .careers-content {
    padding-top: 40px;
  }
  .employee-box {
    padding: 40px 20px;
  }
}
</style>
