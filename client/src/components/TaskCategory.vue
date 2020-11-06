<template>
  <div class="card category">
    <div class="card-body">
      <div class="card-title">
        <div class="d-flex justify-content-between">
          <h5>
            {{ category.name }}
            <span id="doing-count" class="badge badge-secondary">{{
              tasks.length
            }}</span>
          </h5>
          <button class="btn option-btn">
            <i class="fa fa-ellipsis-v"></i>
          </button>
        </div>
        <a @click="showAddForm" v-if="!isAddForm" class="btn add-button"
          >+ Add Task</a
        >
        <div v-else class="card">
          <div class="card-body">
            <textarea
              v-model="title"
              @keyup.enter.prevent="addTask"
              class="form-control"
              rows="3"
              placeholder="Enter a title for this card..."
            ></textarea>
            <div class="row btn-add-group">
              <div @click="showAddForm" class="col">
                <button class="btn btn-close">Cancel</button>
              </div>
              <div class="col">
                <button @click="addTask" class="btn btn-addTask">
                  Add Card
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="scrollable category-body">
        <TaskCard
          v-for="task in tasks"
          :key="task.id"
          :taskDetail="task"
          @deleteTask="deleteTask"
          @showDetail="showDetail"
        ></TaskCard>
      </div>
    </div>
  </div>
</template>

<script>
import TaskCard from "./TaskCard";

export default {
  name: "TaskCategory",
  props: ["category", "tasks"],
  methods: {
    showAddForm() {
      this.isAddForm = !this.isAddForm;
    },
    addTask() {
      this.showAddForm();
      const payload = {
        title: this.title,
        OrganizationId: this.category.OrganizationId,
        CategoryId: this.category.id,
      };
      this.$emit("addTask", payload);
      this.title = "";
    },
    deleteTask(payload) {
      this.$emit("deleteTask", payload);
    },
    showDetail(payload) {
      this.$emit("showDetail", payload);
    },
  },
  components: { TaskCard },
  data() {
    return {
      isAddForm: false,
      title: "",
    };
  },
};
</script>

<style>
</style>