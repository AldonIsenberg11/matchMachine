<template>
  <div class="matchUnderway">
    <h1 class="title">Match Underway: {{matchUnderway.id}}</h1>
    <div class="matchTimer">
      <h2>Match Timer1: {{formattedTime}} </h2>
      <h2>Current timer: {{currentTimer}} </h2>
      <h2>Match Time in Seconds: {{matchTimeInSeconds}} </h2>
      <div class="timer">
        <p>------------------------Timer------------------------</p>
          <div>
            <!-- <h4>Timer: {{ formattedTime }}</h4> -->
            <h4>State: {{ timerState }}</h4>
            <!-- <button @click="startTimer">Start</button>
            <button @click="lap">Lap</button>
            <button @click="pause">Pause</button>
            <button @click="clearTimer">Clear</button> -->
          </div>
        <p>------------------------Timer------------------------</p>
      </div>

      <button class="matchTimerButton" @click="startTimer()" v-show="!matchInProgress"> Start</button>
      <button class="matchTimerButton" @click="pause()" v-show="matchInProgress"> Stop</button>

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
import { mapGetters, mapActions } from 'vuex'

export default {
  created() {this.getMatchUnderway(this.$route.params.id)},
  computed: { ...mapGetters([
    'matchUnderway',
    'matchTime1',
    'redScore',
    'blueScore',
    'matchInProgress']),
    matchTimeInSeconds() { return this.currentTimer / 10 }
  },
  data: function () {
    return {
      currentMatchTime : Date.now(),
      timerState: 'stopped',
      currentTimer: 0,
      formattedTime: "00:00:0",
      ticker: 0,
      laps: [],
      latestLap: ""
    }
  },
  watch: {
    matchInProgress: function (timerOn, timerOff) {
      console.log("Timer On: ", timerOn)
      console.log("Timer Off: ", timerOff)
    }
  },
  methods: { ...mapActions([
    'matchTimerToggle',
    'getMatchUnderway',
    'takedown',
    'reversal',
    'escape',
    'nearfall']),

    redTakedown() {
      this.takedown({
        wrestler: 'wrestler1',
        matchSeconds: this.matchTimeInSeconds })},

    blueTakedown() {
      this.takedown({
        wrestler: 'wrestler2',
        matchSeconds: this.matchTimeInSeconds })},

    redReversal() {
      this.reversal({
        wrestler: 'wrestler1',
        matchSeconds: this.matchTimeInSeconds })},

    blueReversal() {
      this.reversal({
        wrestler: 'wrestler2',
        matchSeconds: this.matchTimeInSeconds })},

    redEscape() {
      this.escape({
        wrestler: 'wrestler1',
        matchSeconds: this.matchTimeInSeconds })},

    blueEscape() {
      this.escape({
        wrestler: 'wrestler2',
        matchSeconds: this.matchTimeInSeconds })},

    redNearfall (points) {
      this.nearfall({
        points: points,
        wrestler: 'wrestler1',
        matchSeconds: this.matchTimeInSeconds })},

    blueNearfall (points) {
      this.nearfall({
        points: points,
        wrestler: 'wrestler2',
        matchSeconds: this.matchTimeInSeconds })},

    startTimer () {
      this.matchTimerToggle(this.matchTimeInSeconds)
      if (this.timerState !== 'running') {
        this.tick()
        this.timerState = 'running'
      }333
    },
    // Keeping this here to remind myself how to reset timer for next period.
    // lap () {
    //   this.laps.push({
    //     seconds: this.currentTimer,
    //     formattedTime: this.formatTime(this.currentTimer)
    //   })
    //   this.latestLap = this.formatTime(this.currentTimer)
    //   this.currentTimer = 0
    // },
    pause () {
      window.clearInterval(this.ticker)
      this.matchTimerToggle(this.matchTimeInSeconds)
      this.timerState = 'paused'
    },
    clearTimer () {
      window.clearInterval(this.ticker)
      this.currentTimer = 0
      this.formattedTime = "00:00:00"
      this.timerState = 'stopped'
    },
    tick () {
      this.ticker = setInterval(() => {
        this.currentTimer++
        this.formattedTime = this.formatTime(this.currentTimer)
      }, 100)
    },
    formatTime (milliseconds) {
      let measuredTime = new Date(null)
      measuredTime.setMilliseconds(milliseconds * 100)
      let MHSTime = measuredTime.toISOString()
      return MHSTime.substr(14,7)
    }
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
.matchTimerButton {
  position: reliative;
  border: 1px solid #5bd658;
  background-color: #bcffb8;
  padding: 10px 10px 30px 10px;
  margin-bottom: 15px;
  font-weight: 900;
  font-size: 20px;
  padding: 1rem;
}
</style>
