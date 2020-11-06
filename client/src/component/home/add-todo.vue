<template>
  <!-- modal fade m-t-70 show -->
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
              <strong class="text-pink"> Add Task to </strong> {{ AddCategoryName }}
            </h6>
          </div>
          <form @submit.prevent="submitTask" id="add-todo">
            <div class="modal-body">
              <div class="row clearfix">
                <input
                  v-model="AddCategoryId"
                  type="hidden"
                  name="categoryId"
                />
                <input
                  v-model="AddOrganizationId"
                  type="hidden"
                  name="organizationId"
                />
                <div class="col-12">
                  <div class="form-group">
                    <input
                      v-model="AddTaskName"
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
                      v-model="AddTaskDescription"
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
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="submit"
                class="btn btn-raised btn-primary btn-round waves-effect"
              >
                Add new Task
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
  name: "modal-add-task",
  props: ["payload"],
  created() {
    // console.log(this.payload);
  },

  data() {
    return {
      modal: "modal",
      fade: "fade",
      margin: "m-t-70",
      isShow: "show",
      ariaModal: true,
      ariaHidden: false,

      // Model add todo
      AddCategoryName: this.payload.taskName,
      AddCategoryId: this.payload.catId,
      AddOrganizationId: this.payload.organizationId,
      AddTaskName: "",
      AddTaskDescription: "",
    };
  },

  methods: {
    submitTask() {
      const payload = {
        CategoryId: this.AddCategoryId,
        OrganizationId: this.AddOrganizationId,
        name: this.AddTaskName,
        description: this.AddTaskDescription,
      };
      this.$emit("storeTask", payload);
      this.AddTaskName = "";
      this.AddTaskDescription = ""; 
    },

    cancelTask() {
      this.isShow = "";
      this.ariaModal = false;
      this.ariaHidden = !this.ariaModal;
      this.$emit("isDisplayModal", false);
      console.log("clicked cancel");
    },
  },
};
</script>

<style>
</style>