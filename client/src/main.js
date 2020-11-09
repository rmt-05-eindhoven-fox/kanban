import Vue from 'vue';
import App from './App.vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'
import GoogleSignInButton from 'vue-google-signin-button-directive'

new Vue({
  GoogleSignInButton,
  render: h => h(App),
}).$mount('#app');