<template>
    <div class="mainpage">
                <section class="card-list">
                    <article ref="kard" class="card">
                        <header style="background-color: #30BFBF;" class="card-header">
                        <h2>Backlog</h2>
                        </header>
                        <div class="task-body"> 
                            <form>
                                <button @click="showModal('backlog', 'addform')" type="button" class="btn btn-default btn-sm">
                                    <span class="glyphicon">&#x2b;</span> Add Task
                                </button>
                            </form>
                            <div ref="addform" class="add-form" style="margin-right: 10px;" id="myModal">
                                <div class="modal-dialog">
                                <div class="modal-content">
                                
                                    <!-- Modal Header -->
                                    <div class="modal-header">
                                    <h4 class="modal-title">Add Task</h4>
                                    </div>
                                    
                                    <!-- Modal body -->
                                    <div class="modal-body">
                                        <form>
                                            <input v-model="title" type="text" placeholder="title">
                                            <input v-model="description" type="text" placeholder="description">

                                        </form>
                                    </div>
                                    
                                    <!-- Modal footer -->
                                    <div class="modal-footer">
                                    <button type="button" class="btn btn-primary" @click="submitTask('addform')">Submit</button>
                                    <button type="button" class="btn btn-danger" @click="closeModal('addform')" >Close</button>
                                    </div>
                                    
                                </div>
                                </div>
                            </div>
                            <div class="element-body" v-for="(task, i) in dataTasks.backlogTasks" :key="i">
                                <p>{{task.title}}</p>
                                <p>{{task.description}}</p>
                                    <!-- <button type="button" class="btn btn-primary">Edit</button> -->
                                    <button @click="showModalEdit('backlog', 'backlog' + task.id, task)" type="button" class="btn btn-primary">
                                             Edit
                                    </button>
                                    <div :ref="`backlog${task.id}`" class="add-form" style="margin-right: 10px;" id="myModal">
                                        <div class="modal-dialog">
                                        <div class="modal-content">
                                        
                                            <!-- Modal Header -->
                                            <div class="modal-header">
                                            <h4 class="modal-title">Edit Task</h4>
                                            </div>
                                            
                                            <!-- Modal body -->
                                            <div class="modal-body">
                                                <form>
                                                    <input v-model="edit.title" type="text" placeholder="title">
                                                    <input v-model="edit.description" type="text" placeholder="description"> 

                                                </form>
                                            </div>
                                            
                                            <!-- Modal footer -->
                                            <div class="modal-footer">
                                            <button type="button" class="btn btn-primary" @click="editTask(task.id, 'backlog' + task.id)">Submit</button>
                                            <button type="button" class="btn btn-danger" @click="closeModal('backlog' + task.id)" >Close</button>
                                            </div>
                                            
                                        </div>
                                        </div>
                                    </div>
                                    <button @click="deleteTask(task.id)" type="button" class="btn btn-danger"><span class="glyphicon">&#xe020;</span></button>                                    
                                    <button @click="patchTask(task.id, 'development')" type="button" class="btn btn-warning">></button>
                                <div class="card-author">
                                    <a class="author-avatar" href="#">
                                    <img src="avatar.png">
                                    </a>
                                    <div class="author-name">
                                     {{task.User.email}}
                                        <span class="badge badge-success">{{task.category}}</span>
                                    </div>
                            </div>
                        </div>
                    </article>
                    <article ref="kard" class="card">
                        <header class="card-header">
                        <h2>Development</h2>
                        </header>
                        <div class="task-body"> 
                            <form>
                                <button @click="showModal('development', 'devform')" type="button" class="btn btn-default btn-sm">
                                    <span class="glyphicon">&#x2b;</span> Add Task
                                </button>
                            </form>
                            <div ref="devform" class="add-form" style="margin-right: 10px;" id="myModal">
                                <div class="modal-dialog">
                                <div class="modal-content">
                                
                                    <!-- Modal Header -->
                                    <div class="modal-header">
                                    <h4 class="modal-title">Add Task</h4>
                                    </div>
                                    
                                    <!-- Modal body -->
                                    <div class="modal-body">
                                        <form>
                                            <input v-model="title" type="text" placeholder="title">
                                            <input v-model="description" type="text" placeholder="description">

                                        </form>
                                    </div>
                                    
                                    <!-- Modal footer -->
                                    <div class="modal-footer">
                                    <button type="button" class="btn btn-primary" @click="submitTask('devform')" >Submit</button>
                                    <button type="button" class="btn btn-danger" @click="closeModal('devform')" >Close</button>
                                    </div>
                                    
                                </div>
                                </div>
                            </div>
                            <div class="element-body" v-for="(task, i) in dataTasks.developmentTasks" :key="i">
                                <p>{{task.title}}</p>
                                <p>{{task.description}}</p>
                                    <button @click="patchTask(task.id, 'backlog')" type="button" class="btn btn-warning"><</button>
                                    <button @click="showModalEdit('development', 'development' + task.id, task)" type="button" class="btn btn-primary">
                                             Edit
                                    </button>
                                    <div :ref="`development${task.id}`" class="add-form" style="margin-right: 10px;" id="myModal">
                                        <div class="modal-dialog">
                                        <div class="modal-content">
                                        
                                            <!-- Modal Header -->
                                            <div class="modal-header">
                                            <h4 class="modal-title">Edit Task</h4>
                                            </div>
                                            
                                            <!-- Modal body -->
                                            <div class="modal-body">
                                                <form>
                                                    <input v-model="edit.title" type="text" placeholder="title">
                                                    <input v-model="edit.description" type="text" placeholder="description"> 

                                                </form>
                                            </div>
                                            
                                            <!-- Modal footer -->
                                            <div class="modal-footer">
                                            <button type="button" class="btn btn-primary" @click="editTask(task.id, 'development' + task.id)">Submit</button>
                                            <button type="button" class="btn btn-danger" @click="closeModal('development' + task.id)" >Close</button>
                                            </div>
                                            
                                        </div>
                                        </div>
                                    </div>
                                    <button @click="deleteTask(task.id)" type="button" class="btn btn-danger"><span class="glyphicon">&#xe020;</span></button>
                                    <button @click="patchTask(task.id, 'production')" type="button" class="btn btn-warning">></button>
                                    
                                <div class="card-author">
                                    <a class="author-avatar" href="#">
                                    <img src="avatar.png">
                                    </a>
                                    <div class="author-name">
                                        {{task.User.email}}
                                        <span class="badge badge-success">{{task.category}}</span>
                                    </div>
                            </div>
                        </div>
                    </article>
                    <article ref="kard" class="card">
                        <header style="background-color: #8F7EE6;" class="card-header">
                        <h2>Doing</h2>
                        </header>
                        <div class="task-body"> 
                            <form>
                                <button @click="showModal('production', 'productform')" type="button" class="btn btn-default btn-sm">
                                    <span class="glyphicon">&#x2b;</span> Add Task
                                </button>
                            </form>
                            <div ref="productform" class="add-form" style="margin-right: 10px;" id="myModal">
                                <div class="modal-dialog">
                                <div class="modal-content">
                                
                                    <!-- Modal Header -->
                                    <div class="modal-header">
                                    <h4 class="modal-title">Add Task</h4>
                                    </div>
                                    
                                    <!-- Modal body -->
                                    <div class="modal-body">
                                        <form>
                                            <input v-model="title" type="text" placeholder="title">
                                            <input v-model="description" type="text" placeholder="description">

                                        </form>
                                    </div>
                                    
                                    <!-- Modal footer -->
                                    <div class="modal-footer">
                                    <button type="button" class="btn btn-primary"  @click="submitTask('productform')" >Submit</button>
                                    <button type="button" class="btn btn-danger" @click="closeModal('productform')" >Close</button>
                                    </div>
                                    
                                </div>
                                </div>
                            </div>
                            <div class="element-body" v-for="(task, i) in dataTasks.productionTasks" :key="i">
                                <p>{{task.title}}</p>
                                <p>{{task.description}}</p>
                                    <button @click="patchTask(task.id, 'development')" type="button" class="btn btn-warning"><</button>
                                    <button @click="showModalEdit('product', 'product' + task.id, task)" type="button" class="btn btn-primary">
                                             Edit
                                    </button>
                                    <div :ref="`product${task.id}`" class="add-form" style="margin-right: 10px;" id="myModal">
                                        <div class="modal-dialog">
                                        <div class="modal-content">
                                        
                                            <!-- Modal Header -->
                                            <div class="modal-header">
                                            <h4 class="modal-title">Edit Task</h4>
                                            </div>
                                            
                                            <!-- Modal body -->
                                            <div class="modal-body">
                                                <form>
                                                    <input v-model="edit.title" type="text" placeholder="title">
                                                    <input v-model="edit.description" type="text" placeholder="description"> 

                                                </form>
                                            </div>
                                            
                                            <!-- Modal footer -->
                                            <div class="modal-footer">
                                            <button type="button" class="btn btn-primary" @click="editTask(task.id, 'product' + task.id)">Submit</button>
                                            <button type="button" class="btn btn-danger" @click="closeModal('product' + task.id)" >Close</button>
                                            </div>
                                            
                                        </div>
                                        </div>
                                    </div>
                                    <button @click="deleteTask(task.id)" type="button" class="btn btn-danger"><span class="glyphicon">&#xe020;</span></button>
                                    <button @click="patchTask(task.id, 'done')" type="button" class="btn btn-warning">></button>
                            
                                <div class="card-author">
                                    <a class="author-avatar" href="#">
                                    <img src="avatar.png">
                                    </a>
                                    <div class="author-name">
                                        {{task.User.email}}
                                        <span class="badge badge-success">{{task.category}}</span>
                                    </div>
                            </div>
                        </div>
                    </article>
                    <article ref="kard" class="card">
                        <header style="background-color: #77CF1F;" class="card-header">
                        <h2>Done</h2>
                        </header>
                        <div class="task-body"> 
                            <!-- <form>
                                <button @click="showModal('done', 'doneform')" type="button" class="btn btn-default btn-sm">
                                    <span class="glyphicon">&#x2b;</span> Add Task
                                </button>
                            </form> -->
                            <div ref="doneform" class="add-form" style="margin-right: 10px;" id="myModal">
                                <div class="modal-dialog">
                                <div class="modal-content">
                                
                                    <!-- Modal Header -->
                                    <div class="modal-header">
                                    <h4 class="modal-title">Add Task</h4>
                                    </div>
                                    
                                    <!-- Modal body -->
                                    <div class="modal-body">
                                        <form>
                                            <input v-model="title" type="text" placeholder="title">
                                            <input v-model="description" type="text" placeholder="description">

                                        </form>
                                    </div>
                                    
                                    <!-- Modal footer -->
                                    <div class="modal-footer">
                                    <button type="button" class="btn btn-primary"  @click="submitTask('doneform')" >Submit</button>
                                    <button type="button" class="btn btn-danger" @click="closeModal('doneform')" >Close</button>
                                    </div>
                                    
                                </div>
                                </div>
                            </div>
                            <div class="element-body" v-for="(task, i) in dataTasks.doneTasks" :key="i">
                                <p>{{task.title}}</p>
                                <p>{{task.description}}</p>
                                    <button @click="patchTask(task.id, 'production')" type="button" class="btn btn-warning"><</button>
                                    <button @click="showModalEdit('done', 'done' + task.id, task)" type="button" class="btn btn-primary">
                                             Edit
                                    </button>
                                    <div :ref="`done${task.id}`" class="add-form" style="margin-right: 10px;" id="myModal">
                                        <div class="modal-dialog">
                                        <div class="modal-content">
                                        
                                            <!-- Modal Header -->
                                            <div class="modal-header">
                                            <h4 class="modal-title">Edit Task</h4>
                                            </div>
                                            
                                            <!-- Modal body -->
                                            <div class="modal-body">
                                                <form>
                                                    <input v-model="edit.title" type="text" placeholder="title">
                                                    <input v-model="edit.description" type="text" placeholder="description"> 

                                                </form>
                                            </div>
                                            
                                            <!-- Modal footer -->
                                            <div class="modal-footer">
                                            <button type="button" class="btn btn-primary" @click="editTask(task.id, 'done' + task.id)">Submit</button>
                                            <button type="button" class="btn btn-danger" @click="closeModal('done' + task.id)" >Close</button>
                                            </div>
                                            
                                        </div>
                                        </div>
                                    </div>
                                    <button @click="deleteTask(task.id)" type="button" class="btn btn-danger"><span class="glyphicon">&#xe020;</span></button>
                                    <!-- <button type="button" class="btn btn-warning">></button> -->
                                <div class="card-author">
                                    <a class="author-avatar" href="#">
                                    <img src="avatar.png">
                                    </a>
                                    <div class="author-name">
                                        {{task.User.email}}
                                        <span class="badge badge-success">{{task.category}}</span>
                                    </div>
                            </div>
                        </div>
                    </article>
                </section>
                <rightNav @logout="logout" :userData="dataTasks.username"></rightNav>

    </div>
</template>

<script>
import rightNav from './rightNav'
export default {
    name: "homepage",
    data() {
        return {
            email: '',
            title: '',
            description: '',
            category: '',
            edit: {
                title: '',
                description: '',
                category: '',
            }
        };
    },
    methods: {
        logout(value){
            this.$emit('logout', value);
        },
        showModal(value, form){
            this.category = value;
            this.$refs[form].style.display = "block";
        },
        showModalEdit(value, form, payload){
            let divsToHide = document.getElementsByClassName("add-form");
            for(let i = 0; i < divsToHide.length; i++){
                divsToHide[i].style.display = "none";
            }
            this.category = value;
            // let ref = form+id;
            this.$refs[form][0].style.display = "block";
            this.edit.title = payload.title;
            this.edit.description = payload.description;
            this.edit.category = payload.category;
            console.log(this.$refs[form][0])
        },
        closeModal(form){
            if(Array.isArray(this.$refs[form])){
                this.$refs[form][0].style.display = "none";
            } else {
                this.$refs[form].style.display = "none";
            }
        },
        submitTask(form){
            let payload = {
                title: this.title,
                description: this.description,
                category: this.category
            }
            this.$refs[form].style.display = "none";
            this.$emit('submitTask', payload);
        },
        editTask(id, form){
            this.$refs[form][0].style.display = "none";
            let payload = {
                id,
                title: this.edit.title,
                description: this.edit.description,
                category: this.edit.category
            }
            this.$emit('editTask', payload);
        },
        deleteTask(id) {
            this.$emit('deleteTask', id);
        },
        patchTask(id, cat){
            let payload = {
                id,
                category: cat
            }
            this.$emit('patchTask', payload);
        }

    },
    components: {
        rightNav
    },
    props: ['dataTasks'],
    created() {
    }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&display=swap');

#myModal {
    display: none;
}

body {
    padding: 0;
    margin: 0;
    font-family: 'DM Mono', monospace;
    margin-left: -55px;
}

.card {   
    align-self: start;
    min-height: 650px;
    max-height: 680px;
    min-width: 350px;
    border-radius: 16px;
    background: #EAEEEF;
    box-shadow: 0 14px 28px rgba(0,0,0,0.25), 
              0 10px 10px rgba(0,0,0,0.22);
    transition: .2s;
    margin-top: -65px;
}

.task-body {
    display:grid;
    padding: 1.5rem;
    max-height: 650px;
    overflow-y: scroll;
    align-self: start;
    margin-bottom: 50px;
}

.task-body form button {
    margin-left: 15px;
    background-color: #00AAFF;
}

.card-header {
    background-color: #00AAFF;
    padding: 5px 5px;
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
    grid-template-columns: 35px 205px 35px;
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
    transform: translateY(-10px);
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