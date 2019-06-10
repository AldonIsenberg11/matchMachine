<template>
  <div class="container">
    <h1>Add a Wrestler</h1>
    <p>(double click to delete)</p>
    <div class="create-wrestler">
      <label for="create-post">Name: </label>
      <input type="text" id="create-wrestler" v-model="text" placeholder="Add a wrestler">
      <button v-on:click="addWrestler">Add!</button>
    </div>
    <hr>
    <p class="error" v-if="error">{{ error }}</p>
    <div class="wrestlers-container">
      <div class="wrestler"
        v-for="(wrestler, index) in wrestlers"
        v-bind:item="wrestler"
        v-bind:index="index"
        v-bind:key="wrestler._id"
        v-on:dblclick="deleteWrestler(wrestler._id)"
      >
        {{ `${wrestler.createdAt.getDate()}/${wrestler.createdAt.getMonth()}/${wrestler.createdAt.getFullYear()}` }}
        <p class="text">{{ wrestler.name }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import WrestlerService from '../../WrestlerService'

export default {
  name: 'WrestlerComponent',
  data() {
    return {
      wrestlers: [],
      error: '',
      text: ''
    }
  },
  async created() {
    try {
      this.wrestlers = await WrestlerService.getWrestlers()
    } catch(err) {
      this.error = err.message
    }
  },
  methods: {
    async addWrestler() {
      await WrestlerService.addWrestler(this.text)
      this.wrestlers = await WrestlerService.getWrestlers()
    },
    async deleteWrestler(id) {
      await WrestlerService.deleteWrestler(id)
      this.wrestlers = await WrestlerService.getWrestlers()
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

  div.wrestler {
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
