<template>
  <div class="user-profile">
    <div class="btn-group-user">
      <button
        class="btn option-btn option-btn-user"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        <i class="fa fa-ellipsis-v"></i>
      </button>
      <div class="dropdown-menu">
        <a @click.prevent="logout" class="dropdown-item" href="#">Logout</a>
      </div>
    </div>
    <div class="text-center">
      <img
        class="user-avatar"
        :src="userInfo.profile_picture"
        alt="user-avatar"
      />
      <h4 v-show="!isEditUsername" class="user-name">
        {{ userInfo.name }}
        <span @click="showEditUsername"
          ><i class="fa fa-pencil edit-username"></i
        ></span>
      </h4>
      <input
        v-show="isEditUsername"
        v-model="userInfo.name"
        @keyup.enter="editUsername"
        type="text"
        class="uname-input"
        id="input-username"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "UserProfile",
  props: ["userInfo", "isEditUsername"],
  methods: {
    showEditUsername() {
      this.$emit("showEditUsername");
    },
    editUsername() {
      let names = this.userInfo.name.split(" ");
      if (names.length !== 2) {
      } else {
        const payload = {
          first_name: names[0],
          last_name: names[1],
        };
        this.$emit("editUsername", payload);
      }
    },
    logout() {
      this.$emit("logout");
    },
  },
};
</script>

<style>
</style>