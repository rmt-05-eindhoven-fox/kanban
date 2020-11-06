import Vue from 'vue';
import App from './App.vue';
import VueSimpleAlert from "vue-simple-alert";
import Toast from 'vue-easy-toast';
import GoogleSignInButton from 'vue-google-signin-button-directive'


Vue.use(Toast)
Vue.use(VueSimpleAlert)

new Vue({
  GoogleSignInButton,
  render: h => h(App),
}).$mount('#app');