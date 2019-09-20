<template>
  <div class="home">
    <p>------------------------Timer------------------------</p>
      <div>
        <h4>Timer: {{ formattedTime }}</h4>
        <h4>State: {{ timerState }}</h4>
        <button class="matchTimerButton" @click="matchTimerToggle()" v-show="!matchInProgress"> Start</button>
        <button class="matchTimerButton" @click="matchTimerToggle()" v-show="matchInProgress"> Stop</button>
        <!-- <button class="startTimer" @click="start1">Start</button>
        <button class="lapTimer"   @click="lap1">Lap</button>
        <button class="pauseTimer" @click="pause1">Pause</button>
        <button class="clearTimer" @click="clear1">Clear</button> -->
      </div>
    <p>------------------------Timer------------------------</p>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  export default {
    name: 'Timer',
    props: ['timer', 'state'],
    computed: mapGetters(['matchInProgress']),
    watch: {
      matchInProgress: function (timerOn, timerOff) {
        if (timerOn) {
          this.start1()
        } else {
          this.pause1()
        }
      }
    },
    data () {
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
    methods: { ...mapActions(['matchTimerToggle']),
      start1 () {
        console.log('startTimer!@!@')
        if (this.timerState !== 'running') {
          this.tick()
          this.timerState = 'running'
        }
      },
      lap1 () {
        this.laps.push({
          seconds: this.currentTimer,
          formattedTime: this.formatTime(this.currentTimer)
        })
        this.latestLap = this.formatTime(this.currentTimer)
        this.currentTimer = 0
      },
      pause1 () {
        window.clearInterval(this.ticker)
        this.timerState = 'paused'
      },
      clear1 () {
        console.log("Stop!!!!", this)
        window.clearInterval(this.ticker)
        this.currentTimer = 0
        this.formattedTime = "00:00:0"
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