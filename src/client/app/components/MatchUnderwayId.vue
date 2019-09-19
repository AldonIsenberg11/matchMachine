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
      <p>RED: {{redScore}}   |    BLUE: {{blueScore}}</p>
      <div class="matchActions">
        <div class="redActions">
          <button class="redActionButtons" @click="redTakedown()"> Red Takedown</button>
          <button class="redActionButtons" @click="redEscape()"> Red Escape</button>
          <button class="redActionButtons" @click="redReversal()"> Red Reversal</button>
          <button class="redActionButtons" @click="redNearfall(2)"> Red Nearfall2</button>
          <button class="redActionButtons" @click="redNearfall(3)"> Red Nearfall3</button>
          <button class="redActionButtons" @click="redNearfall(4)"> Red Nearfall4</button>
          <button class="redActionButtons" @click="console.log('PIN!')"> Red Pin</button>
        </div>
        <div class="blueActions">
          <button class="blueActionButtons" @click="blueTakedown()"> Blue Takedown</button>
          <button class="blueActionButtons" @click="blueEscape()"> Blue Escape</button>
          <button class="blueActionButtons" @click="blueReversal()"> Blue Reversal</button>
          <button class="blueActionButtons" @click="blueNearfall(2)"> Blue Nearfall2</button>
          <button class="blueActionButtons" @click="blueNearfall(3)"> Blue Nearfall3</button>
          <button class="blueActionButtons" @click="blueNearfall(4)"> Blue Nearfall4</button>
          <button class="blueActionButtons" @click="console.log('PIN!')"> Blue Pin</button>
        </div>
      </div>
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
  created() {this.getMatchUnderway(this.$route.params.id)},
  computed: mapGetters(['matchUnderway','redScore','blueScore']),
  methods: { ...mapActions([
    'getMatchUnderway',
    'redTakedown',
    'redReversal',
    'redEscape',
    'redNearfall',
    'blueTakedown',
    'blueReversal',
    'blueEscape',
    'blueNearfall' ])}}
</script>

<style lang="css">
.matchActions {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 1rem;
}
.redActions {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-gap: 1rem;
  border: 20px solid #ccc;
  background: #a00f0f;
  padding: 1rem;
  border-radius: 5px;
  text-align: center;
  position: relative;
}
.blueActions {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-gap: 1rem;
  border: 20px solid #ccc;
  background: #1330ad;
  padding: 1rem;
  border-radius: 5px;
  text-align: center;
  position: relative;
}
.redActionButtons {
  background: #ddc4c4;
  cursor: pointer;
  padding: 1rem;
  font-weight: 900;
  font-size: 20px;
}
.blueActionButtons {
  background: #96a4d3;
  cursor: pointer;
  padding: 1rem;
  font-weight: bolder;
  font-weight: 900;
  font-size: 20px;
}
</style>
