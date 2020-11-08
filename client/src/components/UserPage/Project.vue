<template>
  <!-- ! Project content -->
  <div>
        <!-- ! Content -->
    <div class="d-inline-flex overflow-auto" style="min-width: 100vw">        
      <Category
        v-if="!projectDetail">
      </Category>
      <Category
        v-else
        v-for="category in projectDetail.Categories"
        :key="category.id"
        :categoryDetail="category"
        :allUsers="allUsers"
        @addTask="addTask"
        @editTask="editTask"
        @deleteTask="deleteTask"
        @patchTask="patchTask">
      </Category>
      <div class="align-self-start mx-4 my-4 px-0">
        <span
          v-if="projectDetail"
          data-toggle="modal" data-target="#addCategory"
          class="btn btn-primary mx-0"><i class="fa fa-plus"></i> Add Category</span>
      </div>
    </div>
    <!-- ! Modal Add Project -->
    <div class="modal fade" id="addProject" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        <form
        @submit.prevent="createProject()">
          <div class="modal-body">
              <div class="form-group p-4">
                <label for="project-title">Project Title</label>
                <input 
                v-model="addProjectForm.projectName"
                type="text" class="form-control" id="project-title" aria-describedby="emailHelp" placeholder="Your project name">
              </div>
              <div 
                v-if="otherUsers.length > 0"
                class="form-group p-4">
                <label for="members1">Add other project collaborator:</label>
                <select 
                  v-model="addProjectForm.selectedMember"
                  id="members1">
                  <option value="">Choose other member</option>
                  <option
                    v-for="member in otherUsers"
                    :value="member.id"
                    :key="member.id">{{ member.name }}
                  </option>
                </select>
              </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="submit" class="btn btn-primary">Create Project</button>
          </div>
        </form>
        </div>
      </div>
    </div>
    <!-- ! Modal Add Member -->
    <div 
      v-if="projectDetail"
      class="modal fade" id="addMember" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">{{ projectDetail.name }}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <form
            @submit.prevent="addMember">
            <div class="modal-body">
              <div class="container overflow-auto h-100" style="max-height: 50vh;">
                <table 
                  v-if="collaborators.length > 0"
                  class="table table-sm table-dark">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Name</th>
                      <th scope="col">Email</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(collaborator, index) in collaborators"
                      :key="collaborator.id">
                      <th scope="row">{{index + 1}}</th>
                      <td>{{collaborator.name}}</td>
                      <td>{{collaborator.email}}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
                <div
                  v-if="otherUsers.length > 0"
                  class="form-group p-4">
                  <label for="members2">Add other project collaborator:</label>
                    <select 
                  v-model="addMemberForm.selectedMember"
                  id="members2">
                  <option value="" disabled>Choose other member</option>
                  <option
                    v-for="member in otherUsers"
                    :value="member.id"
                    :key="member.id">{{ member.name }}
                  </option>
                </select>
                </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="submit" class="btn btn-primary">Add</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <!-- ! Modal Add Category -->
        <div 
          v-if="projectDetail"
          class="modal fade" id="addCategory" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">{{ projectDetail.name }}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        <form
        @submit.prevent="createCategory()">
          <div class="modal-body">
              <div class="form-group p-4">
                <label :for="`project-title${projectDetail.id}`">Category Name</label>
                <input 
                v-model="addCategoryForm.categoryName"
                type="text" class="form-control" :id="`project-title${projectDetail.id}`" aria-describedby="emailHelp" placeholder="Your category name">
              </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="submit" class="btn btn-primary">Create Category</button>
          </div>
        </form>
        </div>
      </div>
    </div>


    <!-- ! Button Add Project -->
    <div class="fixed-bottom p-5 d-flex">
      <button type="button" class="btn btn-success ml-auto text-white" data-toggle="modal" data-target="#addProject">Add New Project</button>
    </div>
  </div>
</template>

<script>
import draggable from './Project/Category'
import Category from './Project/Category'
export default {
  name: 'Project',
  data() {
    return {
      addProjectForm: {
        projectName: '',
        selectedMember: '',
      },
      addCategoryForm: {
        categoryName: ''
      },
      addMemberForm: {
        selectedMember: ''
      }
    }
  },
  components: {
    Category,
    draggable
  },
  props: ['otherUsers', 'projectDetail', 'userDetail', 'allUsers' ],
  computed: {
    collaborators() {
      if (!this.projectDetail) {
        return [];
      } else {
        return this.projectDetail.Collaborators;
      }
    }
  },
  methods: {
    createProject() {
      $('#addProject').modal('toggle');
      Swal.showLoading();
      const payload = {
        projectName: this.addProjectForm.projectName,
        userId: this.addProjectForm.selectedMember
      }
      this.$emit('createProject', payload);
      for (const key in this.addProjectForm) {
        this.addProjectForm[key] = '';
      }
    },
    createCategory() {
      $('#addCategory').modal('toggle');
      Swal.showLoading();
      const payload = {
        categoryName: this.addCategoryForm.categoryName,
        projectId: this.projectDetail.id
      }
      this.addCategoryForm.categoryName = '';
      this.$emit('createCategory', payload);
      for (const key in this.addProjectForm) {
        this.addProjectForm[key] = '';
      }
    },
    addTask(payload) {
      payload.projectId = this.projectDetail.id;
      this.$emit('addTask', payload);
    },
    editTask(payload) {
      payload.projectId = this.projectDetail.id;
      this.$emit('editTask', payload);
    },
    deleteTask(payload) {
      payload.projectId = this.projectDetail.id;
      this.$emit('deleteTask', payload);
    },
    patchTask(payload) {
      payload.projectId = this.projectDetail.id;
      this.$emit('patchTask', payload);
    },
    addMember() {
      $('#addMember').modal('toggle');
      const payload = {
        userId: this.addMemberForm.selectedMember
      };
      payload.projectId = this.projectDetail.id;
      this.addMemberForm.selectedMember = '';
      this.$emit('addMember', payload);
    },
    filteredMember() {
      if(!this.otherUsers) this.filtered = [];
      const arr = [];
      this.otherUsers.forEach(user => {
      this.projectDetail.Collaborators.forEach(el => {
        if (user.id !== el.id) arr.push(user);
        })
      })
      this.filtered = arr;
  }

  }
}
</script>

<style>

</style>