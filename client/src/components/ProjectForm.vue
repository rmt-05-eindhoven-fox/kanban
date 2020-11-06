<template>
	<!-- Material form login -->
	<div class="container">
		<div id="OrganizationForm">
			<div class="container-fluid mt-2">
				<h2 id="icon-square" class="section-heading mb-4">
					<mdb-btn color="primary" @click.native="modal = true">Add Organization</mdb-btn>
				</h2>
			</div>
			<div class="container-fluid mt-2">
				<div class="list-group" id="list-project">
                        <div class="list-group-item list-group-item-action flex-column align-items-start" v-for="row in organization" :key="row.id">
                            <div class="d-flex w-100 justify-content-between ">
                                <a href="#" @click="initTodo(row.id)"><h5 class="mb-2 h5">{{row.organization_name}}</h5></a>
                                <small>{{row.organization_status}}</small>
                            </div>                            
                            <small class="mb-2">
                                <button type="button" class="btn btn-sm btn-deep-purple" data-toggle="modal" data-target="#ModalAddMember" @click="addMember(row.id)">Members</button>            
                                <button type="button" class="btn btn-danger btn-sm float-right" @click="deleteOrganization(row.id)">Delete</button>
                                <button type="button" class="btn btn-cyan btn-sm float-right" @click="getProjectById(row.id)">Edit</button>
                            </small>
                        </div>
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
						<mdb-input v-model="organization_name" label="Your organization name"  type="text"/>
						<select class="browser-default custom-select" v-model="organization_status">
							<option selected>Organization Status</option>
							<option value="open">open</option>
							<option value="close">close</option>
						</select>
					</div>
				</mdb-modal-body>
				<mdb-modal-footer>
					<mdb-btn color="secondary" @click.native="modal = false">Close</mdb-btn>
					<mdb-btn color="primary" @click="addOrganization()">Save</mdb-btn>
				</mdb-modal-footer>
			</mdb-modal>
		</div>
	</div>
	<!-- Material form login -->
</template>
<script>
  const baseUrl = "http://localhost:3000";

  import { mdbModal, mdbModalHeader, mdbModalTitle, mdbModalBody, mdbModalFooter, mdbBtn,mdbInput  } from 'mdbvue';
  import axios from "axios"
  import toastr from "vue-toastr"
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
      mdbInput
    },
    data(){
        return {
            email:"",
            password:"",
            organization_name:"",
            organization_status:"",
            modal: false,
            organization: []
        }
    },
      created() {
          this.fetchOrganization()
      },
    methods: {
        showErrorMessage(error) {
            if(Array.isArray(error.message)){
              this.$toastr.e("Error",error.message.join());
            }else{
              this.$toastr.e("Error",error.message);
            }
        },addOrganization(){
          let config = {headers: {'token':localStorage.getItem("token"),}}
                axios
                .post(`${baseUrl}/organizations`,{
                    name:this.organization_name,
                    status:this.organization_status
                },config).then(response => {
              this.$toastr.s("Success",response.data.message)
                    
                    this.fetchOrganization()
                }).catch(err=>{
                    console.log(err.response.data)
                    this.showErrorMessage(err.response.data)
                    this.fetchOrganization()
                })
        },fetchOrganization(){
              let config = {headers: {'token':localStorage.getItem("token"),}}

            axios
                .get(`${baseUrl}/organizations`,config,config).then(response => {
                    console.log(response.data.data)
                        this.organization = response.data.data
                
                }
                ).catch(err=>{
                    console.log(err.response.data)
                    this.showErrorMessage(err.response.data)
                        this.organization = []
                })
        },deleteOrganization(id){
              let config = {headers: {'token':localStorage.getItem("token"),}}

            axios
                .delete(`${baseUrl}/organizations/${id}`,config,config).then(response => {
                      this.$toastr.s("Success",response.data.message)
                        this.fetchOrganization()
                }
                ).catch(err=>{
                    console.log(err.response.data)
                    this.showErrorMessage(err.response.data)
                    this.fetchOrganization()
                })            
        },initTodo(id){
          console.log(id)
                      this.$emit("setOrganizationId",id);
            this.$emit("screen","TaskForm");
        }
    },
  }
</script>
