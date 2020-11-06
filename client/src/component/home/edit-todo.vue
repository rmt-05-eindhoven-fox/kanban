<template>
  <div class="modal fade m-t-70" id="modalTodo" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
      <section class="content">
        <div class="modal-content card card-inside-title body">
          <div class="modal-header">
            <h6 class="title" id="defaultModalLabel">Edit Task</h6>
          </div>
          <form @submit.prevent="" id="edit-todo">
            <div class="modal-body">
              <div class="row clearfix">
                <input
                  type="hidden"
                  id="edit-todo-id"
                  class="form-control"
                  maxlength="20"
                  placeholder="Title.."
                  required
                  readonly
                />
                <div class="col-12">
                  <div class="form-group">
                    <input
                      type="text"
                      id="edit-todo-title"
                      class="form-control"
                      maxlength="100"
                      placeholder="Title.."
                      required
                    />
                  </div>
                </div>
                <div class="col-12">
                  <div class="form-group">
                    <textarea
                      type="text"
                      id="edit-todo-description"
                      class="form-control"
                      style="height: 100px"
                      maxlength="255"
                      placeholder="Description.."
                    ></textarea>
                  </div>
                </div>
                <div class="col-12">
                  <div class="form-group">
                    <input
                      type="date"
                      id="edit-todo-due_date"
                      class="form-control"
                      style="outline: none"
                      required
                    />
                  </div>
                </div>
                <div class="col-12">
                  <div class="form-group">
                    <label for="">Status</label>
                    <div class="float-right">
                      <div class="radio inlineblock m-r-20">
                        <input
                          type="radio"
                          name="edit-todo-status"
                          id="pending"
                          class="with-gap"
                          value="pending"
                        />
                        <label for="pending">Pending</label>
                      </div>
                      <div class="radio inlineblock">
                        <input
                          type="radio"
                          name="edit-todo-status"
                          id="finished"
                          class="with-gap"
                          value="finished"
                          checked=""
                        />
                        <label for="finished">Finished</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="submit"
                class="btn btn-raised btn-primary btn-round waves-effect"
              >
                Update Todo
              </button>
              <button
                class="btn btn-raised btn-secondary btn-round waves-effect"
                data-dismiss="modal"
              >
                Close
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>
          