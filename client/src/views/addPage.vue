<template>
  <div id="addPage" class="containerAddPage">
    <div class="containerAddForm">
      <div class="titleNewCard">New Card</div>

      <form class="fomrAddTasks" @submit.prevent="addTask">
        <div class="form-group">
          <label for="task">Task</label>
          <input
            v-model="newTask.title"
            type="text"
            class="form-control"
            id="email"
            placeholder="Anythink"
          />
        </div>

        <div class="form-group">
          <label for="category">Category</label>
          <select
            class="form-control"
            v-model="newTask.CategoryId"
            id="category"
            name="category"
          >
            <option>--SELECTED--</option>
            <option value="1">Backlog</option>
            <option value="2">To-do</option>
            <option value="3">Process</option>
            <option value="4">Complete</option>
          </select>
        </div>

        <button class="btn btn-primary" type="submit">Add</button>
        <a href="" class="btn btn-warning" @click.prevent="changePage"
          >Cancel</a
        >
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "addPage",
  data() {
    return {
      newTask: {
        title: "",
        CategoryId: "",
      },
    };
  },
  props: ["IdUser"],
  methods: {
    addTask() {
      const newTask = {
        title: this.newTask.title,
        CategoryId: this.newTask.CategoryId,
        UserId: this.IdUser,
      };
      this.$emit("addTask", newTask);
      this.$emit("changePage", "homePage");
    },
    changePage() {
      this.$emit("changePage", "homePage");
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