import Vue from 'vue';
import App from './App.vue';
import GoogleSignInButton from 'vue-google-signin-button-directive'
import 'sweetalert2/dist/sweetalert2.min.css';
import VueSweetalert2 from 'vue-sweetalert2';


Vue.use(VueSweetalert2);


new Vue({
    GoogleSignInButton,
  render: h => h(App),
}).$mount('#app');