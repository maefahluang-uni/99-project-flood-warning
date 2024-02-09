<template>
    <body class="body-card">
    <div class="register-card-container">
      <div class="register-card">
        <div class="register-card-logo">
          <img src="@/assets/Logo/Logo (Replace).png" alt="logo">
        </div>
        <div class="register-card-header">
          <h1>สร้างบัญชีผู้ใช้ใหม่</h1>
          <div>เพื่อเข้าใช้งานระบบเตือนภัยน้ำ</div>
        </div>
        <form class="register-card-form" @submit.prevent="handleRegister">
          <div class="form-item">
            <i class="fa fa-user form-item-icon"></i>
            <input type="text" placeholder="ชื่อผู้ใช้งาน" v-model="registerForm.username" required>
          </div>
          <div class="form-item">
            <i class="fa fa-envelope form-item-icon"></i>
            <input type="email" placeholder="อีเมลล์" v-model="registerForm.email" required>
          </div>
          <div class="form-item">
            <i class="fa fa-lock form-item-icon"></i>
            <input type="password" placeholder="รหัสผ่าน" v-model="registerForm.password" required>
          </div>    
          <button type="submit">สร้างบัญชี</button>
        </form>
        <div class="register-card-footer">
          มีบัญชีแล้วหรอ? <router-link to="/login">ลงชื่อเข้าใช้ที่นี้.</router-link>
        </div>
      </div>
    </div>
</body >
</template>

<script>
import axios from "axios";

export default {
  name: 'RegisterPage',
  data() {
    return {
      registerForm: {
        username: '',
        email: '',
        password: ''
      }
    };
  },
  methods: {
    async handleRegister() {
      console.log('Attempting to register with:', this.registerForm);

      // Full Endpoint URL including the port number
      const endpoint = 'http://localhost:3001/api/register';

      try {
        // Make POST request to the backend API
        const response = await axios.post(endpoint, this.registerForm);

        console.log('Response received:', response); // Log the response for debugging

        if (response && response.status === 201) {
          console.log('Registration successful:', response.data);
          // Redirect user to the login page after successful registration
          this.$router.push('/login');
        } else {
          // If the request was made but the server's response was not 200 OK
          console.error('Registration failed:', response);
        }
      } catch (error) {
        // Log any error that occurs during the axios call
        console.error('Error during registration:', error);

        if (error.response) {
          // Log detailed error information
          console.error('Error response data:', error.response.data);
          console.error('Error response status:', error.response.status);
          console.error('Error response headers:', error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          console.error('No response received:', error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.error('Error message:', error.message);
        }
      }
    }
  }
};
</script>


<style scoped>


.body-card {
    font-family: 'Poppins', sans-serif;
    min-height: 100vh;
    background: linear-gradient(to right, #11abcd, #f7eff5);
    display: flex;
    justify-content: center;
    align-items: center;
}


/* Login Card */
.register-card {
    width: 450px;
    background: rgba(255, 255, 255, .5);
    padding: 4rem;
    border-radius: 10px;
    position: relative;
    z-index: 1;
}

.register-card::before {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(255, 255, 255, .15);
    transform: rotate(-6deg);
    border-radius: 10px;
    z-index: -1;
}
/* ---------- */

/* Login Card Logo */
.register-card-logo {
    margin-bottom: 2rem;
}

.register-card-logo img {
    width: 60px;
}
/* ---------- */

/* Login Card Standard */
.register-card-footer {
    text-align: center;
}

.register-card a {
    text-decoration: none;
    color: #35339a;
}

.register-card a:hover {
    text-decoration: underline;
}
/* ---------- */

/* Login Card Header */
.register-card-header {
    margin-bottom: 2rem;
}

.register-card-header h1 {
    font-size: 2rem;
    font-weight: 600;
    margin-bottom: .5rem;
}

.register-card-header h1+div {
    font-size: calc(1rem * .8);
    opacity: .8;
}
/* ---------- */

/* Login Card Form */
.register-card-form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.register-card-form .form-item {
    position: relative;
}

.register-card-form .form-item .form-item-icon {
    position: absolute;
    top: 1.2rem;
    left: 1.4rem;
    font-size: 1.3rem;
    opacity: .4;
}

.register-card-form .checkbox {
    display: flex;
    align-items: center;
    gap: 7px;
}

.register-card-form .form-item-other {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: calc(1rem * .8);
    margin-bottom: .5rem;
}
/* ---------- */

/* Login Card Footer */
.register-card-footer {
    margin-top: 1.5rem;
    font-size: calc(1rem * .8);
}
/* ---------- */

/* Login Card Form Elements */
.register-card input[type="text"],
.register-card input[type="password"],
.register-card input[type="email"] {
    border: none;
    outline: none;
    background: rgba(255, 255, 255, .3);
    padding: 1rem 1.5rem;
    padding-left: calc(1rem * 3.5);
    border-radius: 100px;
    width: 100%;
    transition: background .5s;
}

.register-card input:focus {
    background: white;
}

.register-card input[type="checkbox"] {
    width: 16px;
    height: 16px;
    accent-color: black;
}

.register-card button {
    background: black;
    color: white;
    padding: 1rem;
    border-radius: 100px;
    text-align: center;
    text-transform: uppercase;
    letter-spacing: 2px;
    transition: background .5s;
}

.register-card button:hover {
    background-color: rgba(0, 0, 0, 0.85);
    cursor: pointer;
}
/* ---------- */

/* Login Card Social Buttons */
.register-card-social {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    text-align: center;
    margin-top: 3rem;
}

.register-card-social>div {
    opacity: .8;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-size: calc(1rem * .8);
}

.register-card-social-btns {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
}

.register-card-social-btns a {
    display: flex;
    align-items: center;
    justify-content: center;
    color: black;
    width: 50px;
    height: 50px;
    background-color: rgba(255, 255, 255, .6);
    border-radius: 100px;
    transition: all .5s;
}

.register-card-social-btns a:hover {
    background-color: white;
    transform: scale(1.1);
}
/* ---------- */


/* Responsive */
@media (max-width: 768px) {

    body {
        padding: 2rem 0;
    }

    .register-card {
        width: 280px;
        padding: 2rem;
    }

}
/* ---------- */
  </style>
  