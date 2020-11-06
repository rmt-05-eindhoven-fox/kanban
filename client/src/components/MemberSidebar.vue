<template>
  <div class="member-sidebar">
    <div class="d-flex justify-content-between align-self-center">
      <p>
        Members <span class="badge badge-secondary">{{ members.length }}</span>
      </p>
      <span><i class="fa fa-plus-circle"></i></span>
    </div>
    <div class="member-list d-flex flex-wrap">
      <AssigneeAvatar
        v-for="(member, i) in members"
        :key="i"
        :user="member"
      ></AssigneeAvatar>
      <!-- <p class="member-avatar circle">+5</p> -->
    </div>
  </div>
</template>

<script>
import AssigneeAvatar from "./AssigneeAvatar";
export default {
  name: "MemberSidebar",
  props: ["members"],
  components: { AssigneeAvatar },
};
</script>

<style>
</style>