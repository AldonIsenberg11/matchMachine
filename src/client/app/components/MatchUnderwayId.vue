<template>
  <div class="matchUnderway">
    <h1>Match Underway</h1>
    <h3>MatchId: {{matchUnderway.id}}</h3>
    <h5>Wrestler1: {{matchUnderway.wrestler1.name}}</h5>
    <h5>Wrestler2: {{matchUnderway.wrestler2.name}}</h5>
    <h5>Match Data: {{matchUnderway}}</h5>


    <div class="matchStats">
      <h2>There should be a component here that has a few different tabs:</h2>
      <ul>
        <li>Match History (graph)</li>
        <li>Wrestler's info (both on web, tab per wrestler on mobile)</li>
        <li>other wrestler (on mobile)</li>
        <li>Current Bracket</li>
        <li>Stats</li>
      </ul>
    </div>


    <div class="score">
      <h2>Here is where the score should be</h2>
      <p>BLUE: {{matchUnderway.wrestler1Score}}   |    RED: {{matchUnderway.wrestler2Score}}</p>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: mapGetters(['matchUnderway']),
  created() {this.getMatchUnderway(this.$route.params.id)},
  methods: {
    ...mapActions(['getMatchUnderway'])
}}
</script>

<style lang="css">
</style>
