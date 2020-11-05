<template>
  <section>
    <div class="container-fluid">
      <div class="row">
        <div class="col-2 sidebar d-flex flex-column">
          <UserProfile
            :userInfo="userInfo"
            :isEditUsername="isEditUsername"
            @showEditUsername="showEditUsername"
          ></UserProfile>
          <hr />
          <div class="side-navbar d-flex flex-column">
            <p>Dashboard</p>
            <div class="organization-sidebar">
              <div class="d-flex justify-content-between align-self-center">
                <p>
                  Organizations <span class="badge badge-secondary">2</span>
                </p>
                <span><i class="fa fa-plus-circle"></i></span>
              </div>
              <div class="organization-list">
                <p>> Kanban</p>
                <p class="text-muted">> Group Project</p>
                <p class="text-muted">> E-commerce</p>
              </div>
            </div>
          </div>
          <div class="member-sidebar">
            <div class="d-flex justify-content-between align-self-center">
              <p>Members <span class="badge badge-secondary">10</span></p>
              <span><i class="fa fa-plus-circle"></i></span>
            </div>
            <div class="member-list d-flex flex-wrap">
              <img
                class="member-avatar"
                src="https://ui-avatars.com/api/?name=Yosia+Elnino&background=random&rounded=true"
                alt="user-avatar"
              />
              <img
                class="member-avatar"
                src="https://ui-avatars.com/api/?name=Amanda+Jehan&background=random&rounded=true"
                alt="user-avatar"
              />
              <img
                class="member-avatar"
                src="https://ui-avatars.com/api/?name=Nadiva+Ramadhani&background=random&rounded=true"
                alt="user-avatar"
              />
              <img
                class="member-avatar"
                src="https://ui-avatars.com/api/?name=Rizky+Yoditia&background=random&rounded=true"
                alt="user-avatar"
              />
              <img
                class="member-avatar"
                src="https://ui-avatars.com/api/?name=Dewi+Joanne&background=random&rounded=true"
                alt="user-avatar"
              />
              <p class="member-avatar circle">+5</p>
            </div>
          </div>
        </div>
        <div class="col main-col">
          <div class="topbar">
            <div class="d-flex justify-content-between">
              <h1>Kanban</h1>
            </div>
            <div class="navbar-top d-flex">
              <p>BOARD</p>
              <P>SETTINGS</P>
              <i
                class="fa fa-bell nav-icon dropdown-toggle"
                data-toggle="dropdown"
                ><span id="notification_count" class="notification-alert"></span
              ></i>
              <div
                id="notification-content"
                class="dropdown-menu dropdown-menu-right"
              ></div>
            </div>
          </div>
          <div class="main-content">
            <div
              class="container-fluid scrollable scroll-touch category-content overflow-auto"
            >
              <div class="d-flex">
                <div class="card category">
                  <div class="card-body">
                    <div class="card-title">
                      <h5>
                        Backlog
                        <span id="doing-count" class="badge badge-count"></span>
                      </h5>
                      <a
                        id="Doing"
                        class="btn add-button"
                        onclick="showAddTodo(id)"
                        >Add Task</a
                      >
                    </div>
                    <div class="scrollable category-body" id="doing-content">
                      <div class="card card-task">
                        <div class="card-body">
                          <h1>hahaha</h1>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="card category">
                  <div class="card-body">
                    <div class="card-title">
                      <h5>
                        Todo
                        <span id="doing-count" class="badge badge-count"></span>
                      </h5>
                      <a
                        id="Doing"
                        class="btn add-button"
                        onclick="showAddTodo(id)"
                        >Add Task</a
                      >
                    </div>
                    <div
                      class="scrollable category-body"
                      id="doing-content"
                    ></div>
                  </div>
                </div>
                <div class="card category">
                  <div class="card-body">
                    <div class="card-title">
                      <h5>
                        Doing
                        <span id="doing-count" class="badge badge-count"></span>
                      </h5>
                      <a
                        id="Doing"
                        class="btn add-button"
                        onclick="showAddTodo(id)"
                        >Add Task</a
                      >
                    </div>
                    <div
                      class="scrollable category-body"
                      id="doing-content"
                    ></div>
                  </div>
                </div>
                <div class="card category">
                  <div class="card-body">
                    <div class="card-title">
                      <h5>
                        Done
                        <span id="doing-count" class="badge badge-count"></span>
                      </h5>
                      <a
                        id="Doing"
                        class="btn add-button"
                        onclick="showAddTodo(id)"
                        >Add Task</a
                      >
                    </div>
                    <div
                      class="scrollable category-body"
                      id="doing-content"
                    ></div>
                  </div>
                </div>
                <div class="card category">
                  <div
                    class="card-body d-flex flex-column justify-content-center"
                  >
                    <h3 class="text-center">+ Add Category</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import UserProfile from "./UserProfile";

export default {
  name: "HomePage",
  components: {
    UserProfile,
  },
  props: ["userInfo", "isEditUsername"],
  methods: {
    showEditUsername() {
      this.$emit("showEditUsername");
    },
  },
};
</script>

<style>
</style>