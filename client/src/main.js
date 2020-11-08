import Vue from 'vue';
import App from './App.vue';
import GSignInButton from 'vue-google-signin-button';

new Vue({
  render: h => h(App),
}).$mount('#app');

Vue.use(GSignInButton);