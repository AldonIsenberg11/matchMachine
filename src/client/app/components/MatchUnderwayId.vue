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
      <p>RED: {{matchUnderway.wrestler1Score}}   |    Blue: {{matchUnderway.wrestler2Score}}</p>
      <button @click="addMatchEvent(takedown('red'))"> Blue Takedown</button>
    </div>
    <br>
    <br>
    <div class="events">
      <div class="event" v-for="(event, index) in matchUnderway.matchEvents"
        v-bind:item="event"
        v-bind:index="index"
        v-bind:key="event._id || index">

        {{ `${JSON.stringify(event, null, 2)}` }}

      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: mapGetters(['matchUnderway']),
  created() {this.getMatchUnderway(this.$route.params.id)},
  methods: {
    ...mapActions(['getMatchUnderway', 'addMatchEvent']),
    takedown: (color) => {
      console.log("this in here", color)
      if (color === 'red') {
        event = {
          matchId: "5d8246615dbb1f04f726f978",
          action: "takedown",
          matchTime: "0:11:45"
        }
        console.log("takedownEvent: ", event)
        return event
      }
    }
}}
</script>

<style lang="css">
</style>
