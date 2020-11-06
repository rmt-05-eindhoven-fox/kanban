<template>
  <div>
    <NavBar
      @logout="logout"
    ></NavBar>
    <LandingPage 
      v-if="pageName === 'landing-page'"
      @login="login"
      @register="register"
    ></LandingPage>
    <MainPage 
      v-else-if="pageName === 'main-page'" 
      :cards="cards"
      :boards="boards"
      @addCardPage4="changePage"
      @deleteCard="deleteCard"
      @updateCard="updateCard"
    ></MainPage>
    <AddCard
      v-else-if="pageName === 'add-card-page'"
      @mainPage="changePage"
      :categoryNames="boards"
      @addCard="AddCard"
    ></AddCard>
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue';
import MainPage from './components/MainPage.vue';
import AddCard from './components/AddCard.vue';
import LandingPage from './components/LandingPage';
import axios from './config/axios'
export default {
  name: 'App',
  data() {
    return {
      pageName: localStorage.getItem('access_token') ? 'main-page' : 'landing-page',
      cards: {},
      boards: [],

    }
  },
  components: {
    NavBar, MainPage, AddCard, LandingPage
  },
  methods: {
    changePage(payload) {
      // console.log(payload)
      this.pageName = payload.name
    },
    // back-end interaction
    fetchCards() {
      axios({
        url: '/show',
        method: 'get',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({data}) => {
          this.cards = {}
          this.boards = []
          let boardsAlignment = [
            'Backlog', 'Todo', 'Doing', 'Done'
          ]
          this.boards = [...boardsAlignment]
          data.forEach(card => {
            // isi this.boards dengan nama" category
            if (!this.boards.includes(card.category)) {
              this.boards.push(card.category)
            }
            // isi this.cards dengan data sesuai category
            if (this.cards[card.category]) {
              this.cards[card.category].push(card)
            } else {
              this.cards[card.category] = []
              this.cards[card.category].push(card)
            }
          })
          // console.log(this.cards, 'asdasdasd')
          // console.log(this.boards, 'qweqweqweq')
        })
        .catch(err => {
          console.log(err.response)
        })
    },
    AddCard(payload) {
      // console.log(payload)
      let { title, category } = payload
      axios({
        url: '/create-card',
        method: 'post',
        headers: {
          access_token: localStorage.getItem('access_token')
        },
        data: {
          title, category
        }
      })
        .then(({data}) => {
          console.log(data)
          this.fetchCards()
          this.pageName = 'main-page'
        })
        .catch(err => {
          console.log(err.response)
        })
    },
    deleteCard(id) {
      axios({
        url: '/delete/' + id,
        method: 'delete',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({data}) => {
          console.log(data)
          this.fetchCards()
        })
        .catch(err => {
          console.log(err.response)
        })
    },
    updateCard(payload) {
      // {id: 10, title: "kanbanQWE", category: "Todo"}
      let { id, title, category } = payload
      axios({
        url: '/update/' + id,
        method: 'put',
        headers: {
          access_token: localStorage.getItem('access_token')
        },
        data: {
          title, category
        }
      })
        .then(({data}) => {
          console.log(data)
          this.fetchCards()
        })
        .catch(err => {
          console.log(err.response)
        })
    },
    login(payload) {
      if (typeof payload === 'string') {
        axios({
          url: '/googleLogin',
          method: 'post',
          data: {
            id_token: payload
          }
        })
          .then(({ data }) => {
            localStorage.setItem('access_token', data.access_token)
            this.fetchCards()
            this.pageName = 'main-page'
          })
          .catch(err => {
            console.log(err.response)
          })
      } else {
        let { email, password } = payload
        axios({
          url: '/login',
          method: 'post',
          data: {
            email, password
          }
        })
          .then(({ data }) => {
            localStorage.setItem('access_token', data.access_token)
            this.fetchCards()
            this.pageName = 'main-page'
          })
          .catch(err => {
            console.log(err.response)
          })
      }
    },
    register(payload) {
      let { email, password } = payload
      axios({
        url: '/register',
        method: 'post',
        data: {
          email, password
        }
      })
        .then(({ data }) => {
          console.log(data)
        })
        .catch(err => {
          console.log(err.response)
        })
    },
    logout() {
      localStorage.removeItem("access_token")
      // location.reload()
      this.pageName = 'landing-page'
      this.fetchCards()
    }
  },
  created() {  
    if ( localStorage.getItem('access_token')) {
      this.fetchCards()
    }
  }
}
</script>

<style>

</style>