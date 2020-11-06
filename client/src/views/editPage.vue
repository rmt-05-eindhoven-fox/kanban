<template>
  <div id="addPage" class="containerAddPage">
    <div class="containerAddForm">
      <div class="titleNewCard">Edit Card</div>

      <form class="fomrAddTasks" @submit.prevent="updateTask">
        <div class="form-group">
          <label for="task">Task</label>
          <input
            v-model="title"
            type="text"
            class="form-control"
            id="title"
            placeholder="Anythink"
          />
        </div>

        <div class="form-group">
          <label for="category">Category</label>
          <select
            class="form-control"
            id="category"
            name="category"
            v-model="CategoryId"
          >
            <option value="1">Backlog</option>
            <option value="2">Todo</option>
            <option value="3">Process</option>
            <option value="4">Complete</option>
          </select>
        </div>

        <button class="btn btn-primary" type="submit">Edit</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "editPage",
  props: ["tasksDetail"],
  data() {
    return {
      id: this.tasksDetail.id,
      title: this.tasksDetail.title,
      CategoryId: this.tasksDetail.CategoryId,
    };
  },
  methods: {
    updateTask() {
      let updatedTask = {
        id: this.id,
        title: this.title,
        CategoryId: this.CategoryId,
      };
      this.$emit("updateTask", updatedTask);
    },
  },
};
</script>

<style>
.containerAddPage {
  background-color: rgb(196, 192, 192);
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 10px solid black;
}

.containerAddForm {
  box-shadow: 5px 5px 8px 3px #8888;
  width: 500px;
  border-radius: 10px;
}

.fomrAddTasks {
  display: flex;
  justify-content: space-between;
}

.titleNewCard {
  padding: 10px;
  border-bottom: 2px solid rgb(179, 177, 177);
}
</style>