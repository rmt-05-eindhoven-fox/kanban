<template>
  <img class="member-avatar" :src="user.profile_picture" alt="user-avatar" />
</template>

<script>
export default {
  name: "AssigneeAvatar",
  props: ["user"],
};
</script>

<style>
</style>