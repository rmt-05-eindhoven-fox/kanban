import Vue from 'vue';
import App from './App.vue';
import GoogleSignInButton from 'vue-google-signin-button-directive'
import VueSweetalert2 from 'vue-sweetalert2';

Vue.use(VueSweetalert2);

new Vue({
  GoogleSignInButton,
  render: h => h(App),
}).$mount('#app');