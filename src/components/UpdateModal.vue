<template>
  <div class="add-user-modal">
    <transition name="modal">
      <div class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-container">
            <div class="modal-body">
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text">Title</span>
                </div>
                <input type="text" class="form-control" v-model="user.title" />
              </div>
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text">Body</span>
                </div>
                <input type="text" class="form-control" v-model="user.body" />
              </div>
            </div>

            <div class="row">
              <div class="col">
                <button class="btn btn-primary" @click="updateUser">
                  Save
                </button>
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
  name: "UpdateModal",
  data() {
    return {
      user: {
        title: "",
        body: "",
      },
    };
  },
  props: {
    users: { type: Array },
    userId: { type: Number },
  },
  mounted() {
    this.user = this.users.find((data) => data.id == this.userId);
  },
  methods: {
    updateUser() {
      axios
        .put(
          `https://jsonplaceholder.typicode.com/posts/${this.user.id}`,
          this.user
        )
        .then((response) => {
          this.user = response.data;
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
