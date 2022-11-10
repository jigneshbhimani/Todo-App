<template>
  <div class="todo-content">
    <h1>Todo App</h1>
    <div class="add-content">
      <button class="btn btn-primary" @click="showModal = true">
        Add User
      </button>
      <AddUser
        v-if="showModal"
        @close="showModal = false"
        :users="users"
      ></AddUser>
    </div>
    <table class="table">
      <thead class="thead">
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Title</th>
          <th scope="col">Body</th>
          <th scope="col">Actions</th>
          <th scope="col">Update</th>
        </tr>
      </thead>
      <tbody v-for="(user, index) in users" :key="user.id">
        <tr>
          <th scope="row">{{ user.id }}</th>
          <td v-if="editing === user.id">
            <input type="text" v-model="user.title" />
          </td>
          <td v-else>{{ user.title }}</td>

          <td v-if="editing === user.id">
            <input type="text" v-model="user.body" />
          </td>
          <td v-else>{{ user.body }}</td>

          <td v-if="editing === user.id">
            <button @click="editUser(user)" class="btn btn-outline-primary">
              Save
            </button>
            <button @click="cancelEdit(user)" class="btn btn-outline-primary">
              Cancel
            </button>
          </td>
          <td v-else>
            <button @click="updateUser(user)" class="btn btn-secondary">
              Edit
            </button>
            <button @click="deleteUser(index)" class="btn btn-danger">
              Delete
            </button>
          </td>
          <td>
            <button class="btn btn-info" @click="showUpdateModal(user)">
              Update
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <UpdateModal
      v-if="showUpdate"
      @close="showUpdate = false"
      :users="users"
      :userId="currentId"
    ></UpdateModal>
  </div>
</template>

<script>
import AddUser from "@/components/AddUser.vue";
import UpdateModal from "@/components/UpdateModal.vue";
import { mapState } from "vuex";

export default {
  name: "Todo",
  components: {
    AddUser,
    UpdateModal,
  },
  data() {
    return {
      showModal: false,
      editing: null,
      showUpdate: false,
      currentId: 0,
    };
  },
  mounted() {
    this.$store.dispatch("getUsers");
  },
  computed: {
    ...mapState(["users"]),
  },
  methods: {
    updateUser(user) {
      this.updatedUser = Object.assign({}, user);
      this.editing = user.id;
    },
    cancelEdit(user) {
      Object.assign(user, this.updatedUser);
      this.editing = null;
    },
    editUser(user) {
      if (user.first_name === "" || user.last_name === "") return;
      this.$emit("edit:user", user.id, user);
      this.editing = null;
    },
    deleteUser(index) {
      this.users.splice(index, 1);
    },
    showUpdateModal(user) {
      this.currentId = user.id;
      this.showUpdate = true;
    },
  },
};
</script>

<style scoped>
button {
  margin: 1rem 0 0;
}
input {
  margin: 0;
}
.table {
  width: 70%;
  margin-right: auto;
  margin-left: auto;
  margin-top: 50px;
}
.thead {
  background-color: gray;
}
</style>
