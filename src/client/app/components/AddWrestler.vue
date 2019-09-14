<template>
  <div>
    <h3>Add Wrestler 787: </h3>
    <div class="add">
      <form @submit="onSubmit">
        <label for="add-wrestler-name">Name: </label>
        <input id="add-wrestler-name" type="text" v-model="name" placeholder= "Add Wrestler...">
        <input type="submit" value="Submit">
      </form>
    </div>
    <div class="vuexWrestlers">
      <div v-for="wrestler in allWrestlers" :key="wrestler._id" class="vuexWrestler">{{ wrestler.name }}</div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: "AddWrestler",
  computed: mapGetters(['allWrestlers']),
  methods: {
    ...mapActions(['addWrestler']),
    onSubmit(e) {
      e.preventDefault()
      this.addWrestler({name: this.name})
    }
  },
  data() {
    return {
      name: ''
    }
  }
}

</script>

<style>

</style>
