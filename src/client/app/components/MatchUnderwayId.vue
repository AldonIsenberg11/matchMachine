<template>
  <div class="matchUnderway">
    <h1 class="title">Match Underway: {{matchUnderway.id}}</h1>
    <div class="matchTimer">
      <h2>Match Timer1: {{currentMatchTime}} </h2>
      <Timer />
    </div>
    <div class="score">
      <div class="matchActions">
        <h3>Wrestler1: {{matchUnderway.wrestler1.name}}</h3>
        <h3>Wrestler2: {{matchUnderway.wrestler2.name}}</h3>
        <div class="redScore">Red Score: {{redScore}}</div>
        <div class="blueScore">Blue Score: {{blueScore}}</div>
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

        {{  `${event.action.toUpperCase()} matchTime: ${event.matchTime}` }}

      </div>
    </div>
  </div>
</template>

<script>
import Timer from './Timer.vue'
import { mapGetters, mapActions } from 'vuex'
export default {
  components: {Timer},
  created() {this.getMatchUnderway(this.$route.params.id)},
  computed: mapGetters(['matchUnderway', 'matchTime1', 'redScore', 'blueScore', 'matchInProgress']),
  data: function () {
    return {
      currentMatchTime : Date.now()
    }
  },
  methods: { ...mapActions([
    'matchTimerToggle',
    'getMatchUnderway',
    'redTakedown',
    'redReversal',
    'redEscape',
    'redNearfall',
    'blueTakedown',
    'blueReversal',
    'blueEscape',
    'blueNearfall' ])
  }
}
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
  font-weight: 900;
  font-size: 20px;
}
.events {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-gap: 1rem;
}
.event {
  position: reliative;
  border: 10px solid #36c234;
  background-color: #bcffb8;
  padding: 10px 10px 10px 10px;
  font-weight: 900;
  font-size: 20px;
}
.title {
  position: reliative;
  border: 10px solid #36c234;
  background-color: #86bdc7;
  padding: 10px 10px 10px 10px;
  font-weight: 900;
  font-size: 20px;
}
.redScore {
  background: #a00f0f;
  color: white;
  cursor: pointer;
  padding: 1rem;
  font-weight: 900;
  font-size: 20px;
}
.blueScore {
  background: #1330ad;
  color: white;
  cursor: pointer;
  padding: 1rem;
  font-weight: 900;
  font-size: 20px;
}
.matchTimer {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-gap: 1rem;
}
</style>
