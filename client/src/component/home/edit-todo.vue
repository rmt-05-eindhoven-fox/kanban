<template>
  <div
    v-bind:class="[modal, fade, margin, isShow]"
    id="modalTodo"
    tabindex="-1"
    role="dialog"
    style="display: block"
    :aria-modal="ariaModal"
    :aria-hidden="ariaHidden"
  >
    <div class="modal-dialog" role="document">
      <section class="content">
        <div class="modal-content card card-inside-title body">
          <div class="modal-header">
            <h6 class="title" id="defaultModalLabel">
              <strong class="text-pink"> Edit Task </strong>
              {{ editCategoryName }}
            </h6>
          </div>
          <form @submit.prevent="submitTask" id="add-todo">
            <div class="modal-body">
              <div class="row clearfix">
                <input v-model="editTaskId" type="hidden" name="taskId" /> 
                <input
                  v-model="editOrganizationId"
                  type="hidden"
                  name="organizationId"
                />
                <div class="col-12">
                  <div class="form-group">
                    <input
                      v-model="editTaskName"
                      type="text"
                      id="add-todo-title"
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
                      v-model="editTaskDescription"
                      type="text"
                      id="add-todo-description"
                      class="form-control"
                      style="height: 100px"
                      maxlength="255"
                      placeholder="Description.."
                      required
                    ></textarea>
                  </div>
                </div>
                <div class="col-12">
                  <div class="form-group">
                    <select
                      class="form-control"
                      v-model="editCategoryId"
                      id="myselect"
                    >
                      <option
                        v-for="(value, key, i) in payload.categories"
                        :key="key + i" :value="key"
                      >
                        {{ value }}
                      </option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="submit"
                class="btn btn-raised btn-primary btn-round waves-effect"
              >
                Update Task
              </button>
              <button
                @click.prevent="cancelTask"
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
export default {
  name: "modal-edit-task",
  props: ["payload"],
  mounted() {
    
  },

  data() {
    return {
      editCategoryName: "Todo",
      modal: "modal",
      fade: "fade",
      margin: "m-t-70",
      isShow: "show",
      ariaModal: true,
      ariaHidden: false,
      editCategoryId: "",

      // Edit Todo
      editTaskId: this.payload.id,
      editCategoryId: this.payload.CategoryId,
      editOrganizationId: this.payload.OrganizationId,
      editTaskName: this.payload.name,
      editTaskDescription: this.payload.description,
    };
  },
  methods: {
    cancelTask() {
      this.isShow = "";
      this.ariaModal = false;
      this.ariaHidden = !this.ariaModal;
      this.$emit("isDisplayModal", false);
      console.log("clicked cancel");
    },

    submitTask() {
      const payload = {
        id: this.editTaskId,
        CategoryId: this.editCategoryId,
        OrganizationId: this.editOrganizationId,
        name: this.editTaskName,
        description: this.editTaskDescription,
      };
      this.$emit("editTask", payload);
      this.editTaskName = "";
      this.editTaskDescription = "";
      this.editTaskId = "";
      this.editCategoryId = "";
      this.editOrganizationId = "";
    },
  },
};
</script>

<style>
</style>
          