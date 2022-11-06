<template>
  <div class="todo-content">
    <h1>Todo App</h1>
    <div class="add-content">
      <button class="btn btn-primary" @click="showModal = true">
        Add User
      </button>
      <AddUser v-if="showModal" @close="showModal = false"></AddUser>
    </div>
    <table class="table">
      <thead class="thead">
        <tr>
          <th scope="col">ID</th>
          <th scope="col">First Name</th>
          <th scope="col">Last Name</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody v-for="(user, index) in users" :key="user.id">
        <tr>
          <th scope="row">{{ user.id }}</th>
          <td v-if="editing === user.id">
            <input type="text" v-model="user.first_name" />
          </td>
          <td v-else>{{ user.first_name }}</td>

          <td v-if="editing === user.id">
            <input type="text" v-model="user.last_name" />
          </td>
          <td v-else>{{ user.last_name }}</td>

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
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";
import AddUser from "@/components/AddUser.vue";

export default {
  name: "Todo",

  components: {
    AddUser,
  },

  data() {
    return {
      users: [],
      showModal: false,
      editing: null,
    };
  },

  methods: {
    getUsers() {
      axios.get("http://localhost:3000/users").then((response) => {
        this.users = response.data;
      });
    },
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
  },

  mounted() {
    this.getUsers();
  },
};
</script>

<style scoped>
button {
  margin: 0 1rem 0 0;
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
