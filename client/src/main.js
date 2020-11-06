import Vue from 'vue';
import ini from './App.vue';
import VueModal from '@kouts/vue-modal';
import '@kouts/vue-modal/dist/vue-modal.css';
import GoogleSignInButton from 'vue-google-signin-button-directive';

Vue.config.productionTip = false


Vue.component('modal', VueModal)

new Vue({
  GoogleSignInButton,
  render: h => h(ini),
}).$mount('#app')