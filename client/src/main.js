// let app = new Vue({
//   el: '#app',
//   data: {
//     server: 'http://localhost:3000',
//     appName: 'Kanban',
//     message: 'Hello Vue!',
//     pageName: 'register-page'
//   },
//   methods: {
//     changePage(name){
//       this.pageName = name
//     }
//   }
// })

import Vue from 'vue';
import App from './App.vue'

new Vue({
  render: h => h(App),
}).$mount('#app')