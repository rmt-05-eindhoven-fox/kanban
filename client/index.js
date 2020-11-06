var app = new Vue({
    el: '#app',
    data: {
      page: 'kanban'
    },
    methods: {
        toPage(page){
            this.page = page
        }
    }
})