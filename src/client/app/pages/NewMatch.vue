<template>
  <div class="newMatch">
    <h1>Bout #549  |  Edit (button)</h1>
    <div class="competitors">
      <div class="green-wrestler">
        <h2>
          Green Wrestler
        </h2>
        <select v-model="greenSelected">
          <option disabled value="">Please select one</option>
          <option v-for="wrestler in allWrestlers"
            :key="wrestler._id"
            :value="wrestler._id">
              {{ wrestler.name }}
          </option>
        </select>
      </div>
      <div class="red-wrestler">
        <h2>
          Red Wrestler
        </h2>
        <select v-model="redSelected">
          <option disabled value="">Please select one</option>
          <option v-for="wrestler in allWrestlers"
            v-bind:key="wrestler._id"
            v-bind:value="wrestler._id">
              {{ wrestler.name }}
          </option>
        </select>
      </div>
    </div>
    <button @click="createNewMatch()">Start</button>
    <hr>
    <p class="error" v-if="error">{{ error }}</p>
  </div>
</template>

<script>
import { mapGetters, mapActions }  from 'vuex'

export default {
  name: 'WrestlerComponent',
  computed: mapGetters(['allWrestlers']),
  methods: {
    ...mapActions(['createMatch', 'getWrestlers']),
    createNewMatch () {
      let newMatch = {
        wrestler1: this.greenSelected,
        wrestler2: this.redSelected }
      this.createMatch(newMatch)
        .then((matchId) => { this.$router.push(`/matchUnderway/${matchId}`) })
        .catch((err) => {console.error(`Error adding new match::\n${err.message}`)})}},

  data() {
    return {
      wrestlers: [],
      error: '',
      greenSelected: {
        name: '',
        _id: ''
      },
      redSelected: {
        name: '',
        _id: ''
      }
    }
  },
  async created() {
    this.getWrestlers()
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

  div.red-wrestler {
    position: reliative;
    border: 1px solid #e60000;
    background-color: #ff7470;
    padding: 10px 10px 30px 10px;
    margin-bottom: 15px;
  }

  div.green-wrestler {
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