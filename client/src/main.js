import Vue from 'vue'
import App from './App.vue'
import VueSweetalert2 from 'vue-sweetalert2';
import waves from 'node-waves';
import GAuth from 'vue-google-oauth2'
// import 'sweetalert2/dist/sweetalert2.min.css';  

window.Waves = waves
const gauthOption = {
  clientId: '146799045750-lsgbhu8fm1lcvfscfhamop4mh2og4amq.apps.googleusercontent.com',
  scope: 'profile email',
  prompt: 'select_account'
}

Vue.use(GAuth, gauthOption)
Vue.use(VueSweetalert2);

new Vue({
  render: h => h(App)
}).$mount("#app")