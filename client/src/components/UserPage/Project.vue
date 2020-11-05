<template>
  <!-- ! Project content -->
  <div>
        <!-- ! Content -->
    <div class="d-inline-flex overflow-auto" style="min-width: 100vw">
      <Category></Category>
      <div class="align-self-start mx-4 my-4 px-0">
        <span class="btn btn-primary mx-0"><i class="fa fa-plus"></i> Add Category</span>
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
          <div class="modal-body">
            <form>
              <div class="form-group p-4">
                <label for="project-title">Project Title</label>
                <input type="text" class="form-control" id="project-title" aria-describedby="emailHelp" placeholder="Your project name">
              </div>
              <div class="form-group p-4">
                <label for="members">Add other project collaborator:</label>
                <input list="members" name="member" id="member">
                <datalist id="members">
                  <option value="aaaaaaaaaabbbb">aaaaa</option>
                  <option value="b">b</option>
                  <option value="c">c</option>
                  <option value="d">d</option>
                  <option value="e">e</option>
                </datalist>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary">Create Project</button>
          </div>
        </div>
      </div>
    </div>
    <!-- ! Modal Add Member -->
    <div class="modal fade" id="addMember" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">Project Name</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="container overflow-auto h-100" style="max-height: 50vh;">
              <table class="table table-sm table-dark">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td>a@mail.com</td>
                  </tr>
                  <tr>
                    <th scope="row">2</th>
                    <td>Jacob</td>
                    <td>a@mail.com</td>
                  </tr>
                  <tr>
                    <th scope="row">2</th>
                    <td>Jacob</td>
                    <td>a@mail.com</td>
                  </tr>
                  <tr>
                    <th scope="row">2</th>
                    <td>Jacob</td>
                    <td>a@mail.com</td>
                  </tr>
                  <tr>
                    <th scope="row">2</th>
                    <td>Jacob</td>
                    <td>a@mail.com</td>
                  </tr>
                  <tr>
                    <th scope="row">2</th>
                    <td>Jacob</td>
                    <td>a@mail.com</td>
                  </tr>
                  <tr>
                    <th scope="row">2</th>
                    <td>Jacob</td>
                    <td>a@mail.com</td>
                  </tr>
                  <tr>
                    <th scope="row">2</th>
                    <td>Jacob</td>
                    <td>a@mail.com</td>
                  </tr>
                  <tr>
                    <th scope="row">2</th>
                    <td>Jacob</td>
                    <td>a@mail.com</td>
                  </tr>
                  <tr>
                    <th scope="row">2</th>
                    <td>Jacob</td>
                    <td>a@mail.com</td>
                  </tr>
                  <tr>
                    <th scope="row">2</th>
                    <td>Jacob</td>
                    <td>a@mail.com</td>
                  </tr>
                  <tr>
                    <th scope="row">2</th>
                    <td>Jacob</td>
                    <td>a@mail.com</td>
                  </tr>
                  <tr>
                    <th scope="row">2</th>
                    <td>Jacob</td>
                    <td>a@mail.com</td>
                  </tr>
                  <tr>
                    <th scope="row">2</th>
                    <td>Jacob</td>
                    <td>a@mail.com</td>
                  </tr>
                  <tr>
                    <th scope="row">2</th>
                    <td>Jacob</td>
                    <td>a@mail.com</td>
                  </tr>
                  <tr>
                    <th scope="row">2</th>
                    <td>Jacob</td>
                    <td>a@mail.com</td>
                  </tr>
                  <tr>
                    <th scope="row">2</th>
                    <td>Jacob</td>
                    <td>a@mail.com</td>
                  </tr>
                  <tr>
                    <th scope="row">2</th>
                    <td>Jacob</td>
                    <td>a@mail.com</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <form>
              <div class="form-group p-4">
                <label for="members">Add other project collaborator:</label>
                <input list="members" name="member" id="member">
                <datalist id="members">
                  <option value="aaaaaaaaaabbbb">aaaaa</option>
                  <option value="b">b</option>
                  <option value="c">c</option>
                  <option value="d">d</option>
                  <option value="e">e</option>
                </datalist>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary">Create Project</button>
          </div>
        </div>
      </div>
    </div>
    <!-- ! Modal Add Task -->
    <div class="modal fade" id="addTask" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group p-4">
                <label for="exampleInputEmail1">Task Title</label>
                <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Your task title">
              </div>
              <div class="form-group p-4">
                <label for="exampleFormControlTextarea1">Description</label>
                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="Description"></textarea>
              </div>              
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary">Create Task</button>
          </div>
        </div>
      </div>
    </div>

    <!-- ! Modal Edit Task NOT YET -->
    <!-- ! Button Add Project -->
    <div class="fixed-bottom p-5 d-flex">
      <button type="button" class="btn btn-outline-success ml-auto text-white" data-toggle="modal" data-target="#addProject">Add New Project</button>
    </div>
  </div>
</template>

<script>
import Category from './Project/Category'
export default {
  name: 'Project',
  components: {
    Category
  }
}
</script>

<style>

</style>