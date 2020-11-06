<template>
  <section>
    <div class="card">
      <div class="card-body">
        <div class="back-button">
          <button @click="backHome">back</button>
        </div>
        <div class="row">
          <div class="col-8">
            <h1 v-show="!isEditName" class="task-title">
              {{ organization.name }}
              <span @click="titleClick"
                ><i class="fa fa-pencil edit-username"></i
              ></span>
            </h1>
            <input
              v-model="organization.name"
              v-show="isEditName"
              type="text"
              class="edit-title-form"
              @keyup.enter="titleClick"
            />
            <div class="row edit-bottom">
              <div class="col">
                <h3>Descriptions</h3>
                <div
                  v-show="!isEditDescription"
                  @click.prevent="descriptionClick"
                  class="card"
                >
                  <div class="card-body">
                    {{ organization.description }}
                  </div>
                </div>
                <div v-show="isEditDescription">
                  <textarea
                    v-model="organization.description"
                    class="form-control"
                    rows="5"
                    placeholder="Add a more detailed description"
                  ></textarea>
                  <button @click="descriptionClick">Edit description</button>
                </div>
              </div>
            </div>
            <h3 class="members">Members</h3>
            <div class="d-flex flex-wrap">
              <div class="card member-card">
                <div class="card-body">
                  <div class="text-center">
                    <img
                      src="https://ui-avatars.com/api/?name=Demo+Account&background=random&rounded=true"
                      alt=""
                    />
                    <h6>John Doe</h6>
                    <small class="text-muted">Admin</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-3">
            <h3>Labels</h3>
          </div>
        </div>
        <div class="row btn-group-edit">
          <div class="col-4"></div>
          <div class="col-4">
            <div class="row">
              <div class="col">
                <button @click="backHome" class="btn btn-close">Cancel</button>
              </div>
              <div class="col">
                <button @click="editOrganization" class="btn btn-addTask">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "OrganizationSeting",
  data() {
    return {
      isEditName: false,
      isEditDescription: false,
    };
  },
  methods: {
    backHome() {
      this.$emit("back");
    },
    titleClick() {
      this.isEditName = !this.isEditName;
    },
    descriptionClick() {
      this.isEditDescription = !this.isEditDescription;
    },
    editOrganization() {
      const payload = {
        id: this.organization.id,
        name: this.organization.name,
        description: this.organization.description,
      };
      this.$emit("editOrganization", payload);
    },
  },
  props: ["organization"],
};
</script>

<style>
</style>