<template>
  <div class="container">
    <h1>List of Matches Currently Underway</h1>
    <hr>
    <div class="allMatchesUnderway">
      <div v-for="match in allMatchesUnderway" :key="match.id" class="matchesUnderway">
        <h2>| MatchId: {{match.id}}</h2>
        <p> Wrestler1: {{match.wrestler1}}</p>
        <p> Wrestler2: {{match.wrestler2}}</p>
      </div>
    </div>
    <hr>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'MatchesUnderway',
  computed: mapGetters(['allMatchesUnderway'])
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
