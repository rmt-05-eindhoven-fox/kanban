import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import App from './App.vue'
import GSignInButton from 'vue-google-signin-button'

Vue.use(GSignInButton)


Vue.config.productionTip = false
Vue.use(Vuetify)



Vue.prototype.$BASE_URL = 'https://kanban-dewi.herokuapp.com'

new Vue({
  el: '#app',
  vuetify: new Vuetify(),
  render: h => h(App),
}).$mount('#app');
