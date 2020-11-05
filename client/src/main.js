import Vue from 'vue'
import App from './App.vue'
import VueSweetalert2 from 'vue-sweetalert2';
import waves from 'node-waves';
// import 'sweetalert2/dist/sweetalert2.min.css';  
window.Waves = waves

Vue.use(VueSweetalert2);

new Vue({
  render: h => h(App)
}).$mount("#app")