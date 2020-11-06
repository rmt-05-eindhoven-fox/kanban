<template>
	<!-- Material form login -->
    <div>
			<div class="container-fluid mt-2">
				<h2 id="icon-square" class="section-heading mb-4">
					<mdb-btn color="primary" @click.native="modal = true">Add Task</mdb-btn>
				</h2>
			</div>
        <div class="flex justify-center">
      <div class="min-h-screen flex overflow-x-scroll py-12">
        <div
          v-for="column in columns"
          :key="column.title"
          class="bg-gray-100 rounded-lg px-3 py-3 column-width rounded mr-4"
        >
          <p class="text-gray-700 font-semibold font-sans tracking-wide text-sm">{{column.title}}</p>
          <!-- Draggable component comes from vuedraggable. It provides drag & drop functionality -->
          <draggable :list="column.tasks" :animation="200" ghost-class="ghost-card" group="tasks">
            <!-- Each element from here will be draggable and animated. Note :key is very important here to be unique both for draggable and animations to be smooth & consistent. -->
            <task-card
              v-for="(task) in column.tasks"
              :key="task.id"
              :task="task"
              class="mt-3 cursor-move"
            ></task-card>
            <!-- </transition-group> -->
          </draggable>
        </div>
      </div>
    </div>
    <div>
			<mdb-modal :show="modal" @close="modal = false">
				<mdb-modal-header>
					<mdb-modal-title>Add Organization</mdb-modal-title>
				</mdb-modal-header>
				<mdb-modal-body>
					<div class="grey-text">
						<mdb-input v-model="title" label="Your Title"  type="text"/>
						<mdb-input v-model="description" label="Your Description"  type="text"/>
						<mdb-input v-model="due_date" label="Your due date"  type="date"/>
						<select class="browser-default custom-select" v-model="status">
                            <option selected>Task Status</option>
                            <option value="New">New</option>
                            <option value="Inprogress">Inprogress</option>
                            <option value="Done">Done</option>
						</select>
					</div>
				</mdb-modal-body>
				<mdb-modal-footer>
					<mdb-btn color="secondary" @click.native="modal = false">Close</mdb-btn>
					<mdb-btn color="primary" @click="addTask()">Save</mdb-btn>
				</mdb-modal-footer>
			</mdb-modal>
		</div>
    </div>
	<!-- Material form login -->
</template>
<script>
  const baseUrl = "http://localhost:3000";

//   import { mdbInput, mdbBtn } from 'mdbvue';
  import { mdbModal, mdbModalHeader, mdbModalTitle, mdbModalBody, mdbModalFooter, mdbBtn,mdbInput  } from 'mdbvue';
  import axios from "axios"
  import toastr from "vue-toastr"
  import draggable from "vuedraggable";
  import TaskCard from "./TaskCard.vue";
  import Vue from "vue";

  Vue.use(toastr, {
  });

  export default {
    name: 'Basic',
    components: {
      mdbBtn,
      mdbModal,
      mdbModalHeader,
      mdbModalTitle,
      mdbModalBody,
      mdbModalFooter,     
      mdbInput,
      TaskCard,
      draggable
    //   mdbInput,
    //   mdbBtn
    },
    data(){
        return {
            email:"",
            password:"",
            title:"",
            description:"",
            due_date:"",
            organization_id:"",
            modal: false,
            status:"",
        columns: []
        }
    },
    created() {
          this.fetchTask()
      },
    methods: {
        showErrorMessage(error) {
            if(Array.isArray(error.responseJSON.message)){
                toastr.error(error.responseJSON.message.join());
            }else{
                toastr.error(error.responseJSON.message);
            }
        },
      created() {
          this.fetchTask()
      },loginProcess(){
                console.log(this.email)
                console.log(this.password)
                axios
                .post(`${baseUrl}/users/login`,{
                    email:this.email,
                    password:this.password
                }).then(response => {
                    localStorage.setItem("token", response.token)
                    if(localStorage.getItem("token")){
                        this.$emit('screen', 'ProjectForm')
                    }
                }).catch(err=>{
                    this.showErrorMessage(err.response.data)
                    console.log(err.response.data)
                })
        },addTask(){  
          let config = {headers: {'token':localStorage.getItem("token"),}}
          console.log(this.$parent.$data.organizationId)
          axios
                .post(`${baseUrl}/tasks`,{
                    title:this.title,
                    description:this.description,
                    status:this.status,
                    due_date:this.due_date,
                    organization_id:this.$parent.$data.organizationId
                },config).then(response => {
              this.$toastr.s("Success",response.data.message)                    
                    this.fetchTask()
                }).catch(err=>{
                    console.log(err.response.data)
                    this.showErrorMessage(err.response.data)
                    this.fetchTask()
                })
        },fetchTask(){
          let config = {headers: {'token':localStorage.getItem("token"),}}
          console.log(this.$parent.$data.organizationId)
          axios
                .get(`${baseUrl}/tasks/organization/${this.$parent.$data.organizationId}`,config,config).then(response => {
              this.$toastr.s("Success",response.data.message)                    
                    console.log(response.data)

                    let New = {
                      title : "New",
                      tasks : []
                    }


                    let Inprogress = {
                      title : "Inprogress",
                      tasks : []
                    }

                    let Done = {
                      title : "Done",
                      tasks : []
                    }

                    for(let i = 0;i < response.data.data.length;i++){
                        let dataRes = response.data.data[i]
                        console.log(dataRes)
                        if(dataRes.status == "New"){
                            New["tasks"].push({
                                id: dataRes.id,
                                title: dataRes.title,
                                date: dataRes.due_date,
                                type: dataRes.description
                              })
                        }else if(dataRes.status == "Inprogress"){
                            Inprogress["tasks"].push({
                                id: dataRes.id,
                                title: dataRes.title,
                                date: dataRes.due_date,
                                type: dataRes.description
                              })                          
                        }else if(dataRes.status == "Done"){
                            Done["tasks"].push({
                                id: dataRes.id,
                                title: dataRes.title,
                                date: dataRes.due_date,
                                type: dataRes.description
                              })
                        }
                    }


                    //this.fetchOrganization()
                }).catch(err=>{
                    console.log(err.response.data)
                    this.showErrorMessage(err.response.data)
                    this.fetchTask()
                })

            
        }
    },
  }
  
</script>
