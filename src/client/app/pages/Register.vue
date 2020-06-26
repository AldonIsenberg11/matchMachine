<template>
  <div class="container">
    <h1>Add a User</h1>
    <p>(double click to delete)</p>
    <div class="create-user">
      <div>
        <label for="create-user-name">Name: </label>
        <input type="text" id="create-user-name" v-model="user.name" placeholder="Add a name">
      </div>
      <div>
        <label for="create-user-email">E-mail: </label>
        <input type="text" id="create-user-email" v-model="user.email" placeholder="Add an e-mail">
      </div>
      <div>
        <label for="create-user-password">Password: </label>
        <input type="text" id="create-user-password" v-model="user.password" placeholder="Add a password">
      </div>
      <button v-on:click="addUser">Add!</button>
    </div>
    <hr>
    <p class="error" v-if="error">{{ error }}</p>
    <div class="users-container">
      <div class="user"
        v-for="(user, index) in users"
        v-bind:item="user"
        v-bind:index="index"
        v-bind:key="user._id"
        v-on:dblclick="deleteUser(user._id)"
      >
        <p class="text">{{`${user.name}`}}</p>
        <p>{{ user.email }}</p>
        {{ `${user.createdAt.getMonth()}/${user.createdAt.getDate()}/${user.createdAt.getFullYear()}` }}
      </div>
    </div>
  </div>
</template>

<script>
import UserService from '../../services/UserService'

export default {
  name: 'userComponent',
  data() {
    return {
      users: [],
      error: '',
      user: {}
    }
  },
  async created() {
    try {
      this.users = await UserService.getUsers()
    } catch(err) {
      this.error = err.message
    }
  },
  methods: {
    async addUser() {
      await UserService.addUser(this.user)
      this.users = await UserService.getUsers()
    },
    async deleteUser(id) {
      await UserService.deleteUser(id)
      this.users = await UserService.getUsers()
    }
  }
}
</script>

<style scoped>
  div.container {
    max-width: 800px;
    margin: 0 auto;
  }

  p.error {
    border: 1px solid #ff5b5f;
    background-color: #ffc5c1;
    padding: 10px;
    margin-bottom: 15px;
  }

  div.user {
    position: reliative;
    border: 1px solid #5bd658;
    background-color: #bcffb8;
    padding: 10px 10px 30px 10px;
    margin-bottom: 15px;
  }

  div.created-at {
    position: absolute;
    top: 0;
    left: 0;
    padding: 5px 15px 5px 15px;
    background-color: darkgreen;
    color: white;
    font-size: 13px;
  }

  p.text {
    font-size: 22px;
    font-weight: 700;
    margin-bottom: 0;
  }
</style>
