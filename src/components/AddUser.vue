<template>
  <div class="add-user-modal">
    <transition name="modal">
      <div class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-container">
            <div class="modal-body">
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text">First Name</span>
                </div>
                <input
                  type="text"
                  class="form-control"
                  v-model="user.first_name"
                />
              </div>
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text">Last Name</span>
                </div>
                <input
                  type="text"
                  class="form-control"
                  v-model="user.last_name"
                />
              </div>
            </div>

            <div class="row">
              <div class="col">
                <button class="btn btn-primary" @click="addUser">Save</button>
              </div>
              <div class="col">
                <button class="btn btn-primary" @click="$emit('close')">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "AddUser",
  data() {
    return {
      user: {
        first_name: "",
        last_name: "",
      },
    };
  },
  props: {
    users: { type: Array },
  },
  methods: {
    addUser() {
      axios.post("http://localhost:3000/users", this.user).then((response) => {
        this.user = response.data;
        this.users.push(this.user);
      });
      this.$emit("close");
    },
  },
};
</script>

<style>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.79);
  display: table;
  transition: opacity 0.3s ease;
}
.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}
.modal-container {
  width: 40%;
  margin: auto;
  padding: 20px 30px;
  padding-bottom: 40px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}
</style>
