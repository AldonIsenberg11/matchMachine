<template>
  <div class="container">
    <h1>List of Matches</h1>
    <p>(double click to delete)</p>
    <hr>
    <p class="error" v-if="error">{{ error }}</p>
    <div class="matches-container">
      <div class="match"
        v-for="match in matches.data"
        v-bind:item="match.data"
        v-bind:key="match._id"
        v-on:dblclick="deleteMatch(match._id)">
        <p class="text">{{ JSON.stringify(match, null, 2) }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import MatchService from '../../services/MatchService'

export default {
  name: 'MatchComponent',
  data() {
    return {
      matches: [],
      error: '',
      text: ''
    }
  },
  async created() {
    try {
      this.matches = await MatchService.getMatches()
    } catch(err) {
      this.error = err.message
    }
  },
  methods: {
    async addMatch() {
      await MatchService.addMatch(this.text)
      this.matches = await MatchService.getMatches()
    },
    async deleteMatch(id) {
      await MatchService.deleteMatch(id)
      this.matches = await MatchService.getMatches()
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

  div.match {
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
