import Vue from 'vue';
import App from './App.vue';
import GoogleSignInButton from 'vue-google-signin-button-directive'
Vue.config.silent = true,

new Vue({
    GoogleSignInButton,
  render: h => h(App),
}).$mount('#app');