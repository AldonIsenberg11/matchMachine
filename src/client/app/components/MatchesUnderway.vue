<template>
  <div class="container">
    <h1>List of Matches Currently Underway</h1>
    <hr>
    <div class="allMatchesUnderway">
      <div class="matchesUnderway"
        v-for="match in allMatchesUnderway"
        :key="match._id"
        v-on:dblclick="deleteMatchUnderway(match._id)">
        <h3>MatchId: {{match._id}}</h3>
        <p> Wrestler1: {{match.wrestler1}}</p>
        <p> Wrestler2: {{match.wrestler2}}</p>
      </div>
    </div>
    <hr>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'MatchesUnderway',
  methods: {
    ...mapActions(['fetchMatchesUnderway', 'deleteMatchUnderway']),
    // ...mapActions(['deleteMatchUnderway'])
  },
  computed: mapGetters(['allMatchesUnderway']),
  created() {
    this.fetchMatchesUnderway()
  }
}
</script>

<style>
.allMatchesUnderway {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1rem;
}
.matchesUnderway {
  border: 1px solid #ccc;
  background: #41b883;
  padding: 1rem;
  border-radius: 5px;
  text-align: center;
  position: relative;
  cursor: pointer;
}
p.text {
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 0;
}
</style>
