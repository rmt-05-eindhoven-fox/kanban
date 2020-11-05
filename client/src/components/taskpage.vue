<template>
    <div class="mainpage">
                <button @click.prevent="logout"></button>
                <section class="card-list">
                    <article class="card">
                        <header style="background-color: #30BFBF;" class="card-header">
                        <h2>Backlog</h2>
                        </header>
                        <div class="task-body">
                            <div class="element-body" v-for="(task, i) in dataTasks.backlogTasks" :key="i">
                                <p contenteditable="true">{{task.title}}</p>
                                <p>{{task.description}}</p>
                                <div class="card-author">
                                    <a class="author-avatar" href="#">
                                    <img src="avatar.png">
                                    </a>
                                    <div class="author-name">
                                        <span class="badge badge-danger">{{task.description}}</span>
                                    </div>
                                </div>
                            </div>
                            <form>
                                <button type="button" class="btn btn-default btn-sm">
                                    <span class="glyphicon">&#x2b;</span> Add Task
                                </button>
                            </form>
                        </div>
                    </article>
                    <article class="card">
                        <header class="card-header">
                        <h2>Development</h2>
                        </header>
                        <div class="task-body"> 
                            <div class="element-body">
                                <p>New Account Creation Flow</p>
                                <div class="card-author">
                                    <a class="author-avatar" href="#">
                                    <img src="avatar.png">
                                    </a>
                                    <div class="author-name">
                                        <span class="badge badge-danger">Server</span>
                                    </div>
                                </div>
                            </div>
                            <form>
                                <button type="button" class="btn btn-default btn-sm">
                                    <span class="glyphicon">&#x2b;</span> Add Task
                                </button>
                            </form>
                        </div>
                    </article>
                    <article class="card">
                        <header style="background-color: #8F7EE6;" class="card-header">
                        <h2>Product</h2>
                        </header>
                        <div class="task-body"> 
                            <div class="element-body">
                                <p>New Account Creation Flow</p>
                                <div class="card-author">
                                    <a class="author-avatar" href="#">
                                    <img src="avatar.png">
                                    </a>
                                    <div class="author-name">
                                        <span class="badge badge-danger">Server</span>
                                    </div>
                                </div>
                            </div>
                            <form>
                                <button type="button" class="btn btn-default btn-sm">
                                    <span class="glyphicon">&#x2b;</span> Add Task
                                </button>
                            </form>
                        </div>
                    </article>
                    <article class="card">
                        <header style="background-color: #77CF1F;" class="card-header">
                        <h2>Done</h2>
                        </header>
                        <div class="task-body"> 
                            <div class="element-body" v-for="(task, i) in dataTasks.doneTasks" :key="i">
                                <p contenteditable="true">{{task.title}}</p>
                                <p>{{task.description}}</p>
                                    <button type="button" class="btn btn-primary">Edit</button>
                                    <button type="button" class="btn btn-danger"><span class="glyphicon">&#xe020;</span></button>
                                    <button type="button" class="btn btn-warning">></button>
                                <div class="card-author">
                                    <a class="author-avatar" href="#">
                                    <img src="avatar.png">
                                    </a>
                                    <div class="author-name">
                                        Japra
                                        <span class="badge badge-success">{{task.category}}</span>
                                    </div>
                            </div>
                        </div>
                        <form>
                            <button type="button" class="btn btn-default btn-sm">
                                <span class="glyphicon">&#x2b;</span> Add Task
                            </button>
                        </form>
                    </article>
                </section>
    </div>
</template>

<script>
export default {
    name: "homepage",
    data() {
        return {
        };
    },
    methods: {
        logout(){
            localStorage.removeItem('access_token');
            this.$emit('logout', 'landing-page');
        }
    },
    props: ['dataTasks'],
    created() {

    }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&display=swap');

body {
    padding: 0;
    margin: 0;
    font-family: 'DM Mono', monospace;
}

.card {   
    align-self: start;

    min-height: 650px;
    max-height: 750px;
    min-width: 350px;
    border-radius: 16px;
    background: #EAEEEF;
    box-shadow: 0 14px 28px rgba(0,0,0,0.25), 
              0 10px 10px rgba(0,0,0,0.22);
    transition: .2s;
    margin-left: -15px;

}

.task-body {
    display:grid;
    padding: 1.5rem;
    max-height: 750px;
    overflow-y: scroll;
    align-self: start;
    margin-bottom: 50px;
}

.task-body form button {
    background-color: #00AAFF;
}

.card-header {
    background-color: #00AAFF;
    padding: 15px 10px;
    color: white;
    text-align: center;
}

.element-body {
    padding: 15px;
    margin: 10px;
    background-color: #FFFFFF;
    border-radius: 15px;
}

.card-author {
    /* margin: 3rem 0 0; */
    display: grid;
    margin-top: 5px;
    grid-template-columns: 35px 45px 35px;
    align-items: center;
    position: relative;
}

.task-badge {
    font-style: normal;
    font-weight: 700;
    font-size: 10px;
    color: #7a7a8c;
    
}

.author-avatar {
    grid-area: auto;
    /* align-self: start; */
    position: relative;
    box-sizing: border-box;
}

.author-avatar img {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    filter: grayscale(100%);
    display: block;
    overflow: hidden;
    /* margin: 16px 5px; */
}

.author-name {
    grid-area: auto;
    box-sizing: border-box;
    font-size: 13px;
}

.author-name-prefix {
    font-style: normal;
    font-weight: 700;
    font-size: 10px;
    color: #7a7a8c;
}

.card-list {
    display: flex;
    padding: 100px;
}

.card-list::-webkit-scrollbar {
    width: 10px;
    height: 10px;
}
.card-list::-webkit-scrollbar-thumb {
    background: #201c29;
    border-radius: 10px;
    box-shadow: inset 2px 2px 2px hsla(0,0%,100%,.25), inset -2px -2px 2px rgba(0,0,0,.25);
}

.card-list::-webkit-scrollbar-track {
    background: linear-gradient(90deg,#201c29,#201c29 1px,#17141d 0,#17141d);
}

.card:focus-within~.card, .card:hover~.card {
    transform: translateX(10px);
}

.card:hover {
    transform: translateY(-1rem);
}

.card:not(:first-child) {
    /* margin-left: -100px; */
}

.container div .card {
    margin-top: 65px;
    justify-items: center;
    display: grid;
    padding: 10px;
    box-sizing: border-box;
}

.container div .card-body {
    display: flex;
    font-family: 'Noto Sans', sans-serif;
    padding: 10px 15px;
    margin: 5px 25px;
    background-color: #FFFFFF;
    border-radius: 15px;
}
</style>