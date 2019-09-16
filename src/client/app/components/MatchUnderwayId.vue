<template>
  <div class="matchUnderway">
    <h1>Match Underway</h1>
    <h3>MatchId: {{id}}</h3>
    <h5>Wrestler1: {{wrestler1.data.name}}</h5>
    <h5>Wrestler2: {{wrestler2.data.name}}</h5>
    <h5>Match Data: {{match.data}}</h5>


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
      <p>BLUE: {{blueScore}}   |    RED: {{redScore}}</p>
      <p v-show="neutral">Neutral</p>
      <p v-show="blueControl">Blue Control</p>
      <p v-show="redControl">Red Control</p>
    </div>


    <div class="matchActions">

      <div class ="blueActions">
        <button v-show="neutral"
          @click="takedown('blue')"> Blue Takedown</button>
        <button v-show="redControl"
          @click="escape('blue')">Blue Escape</button>
        <button v-show="redControl"
          @click="reversal('blue')">Blue Reversal</button>
        <button v-show="blueControl"
          @click="nearfall('blue', 2)">Blue Nearfall2</button>
        <button v-show="blueControl"
          @click="nearfall('blue', 3)">Blue Nearfall3</button>
        <button v-show="blueControl"
          @click="nearfall('blue', 4)">Blue Nearfall4</button>
        <button v-show="blueControl || redControl">blue Pin</button>
        <button>blue Penalty</button>
      </div>

      <div class ="redActions">
        <button v-show="neutral"
          v-on:click="takedown('red')">Red Takedown</button>
        <button v-show="blueControl"
          v-on:click="escape('red')">Red Escape</button>
        <button v-show="blueControl"
          v-on:click="reversal('red')">Red Reversal</button>
        <button v-show="redControl"
          v-on:click="nearfall('red', 2)">Red Nearfall2</button>
        <button v-show="redControl"
          v-on:click="nearfall('red', 3)">Red Nearfall3</button>
        <button v-show="redControl"
          v-on:click="nearfall('red', 4)">Red Nearfall4</button>
        <button v-show="redControl || blueControl">Red Pin</button>
        <button>Red Penalty</button>
      </div>
    </div>


  </div>
</template>

<script>
import MatchService from '../../services/MatchService'
import WrestlerService from '../../services/WrestlerService';

export default {
  data () {
    return {
      id: this.$route.params.id,
      wrestler1: {
        data : {
          name: ''
        }
      },
      wrestler2: {
        data : {
          name: ''
        }
      },
      blueScore: 0,
      redScore: 0,
      neutral: true,
      blueControl: false,
      redControl: false,
      pause: false,
      match: {},
      matchEvents: []
    }
  },
  async created() {
    try {
      this.match = await MatchService.getMatch(this.id)
      this.wrestler1 = await WrestlerService.getWrestler(this.match.data.wrestler1)
      console.log("This.wrestler1: ", this.wrestler1)
      this.wrestler2 = await WrestlerService.getWrestler(this.match.data.wrestler2)
    } catch(err) {
      console.log("This.wrestler1: ", this.wrestler1)
      this.error = err.message
    }
  },
  methods: {
    takedown: function (color) {
      if (color === 'blue') {
        this.blueScore += 2
        this.neutral = false
        this.blueControl = true
      } else if (color === 'red') {
        this.redScore += 2
        this.neutral = false
        this.redControl = true
      } else {
        console.error(`ERROR: unknown color: ${color}`) // eslint-disable-line no-console
      }
    },

    escape: function (color) {
      if (color === 'blue') {
        this.blueScore += 1
        this.redControl = false
        this.neutral = true
      } else if (color === 'red') {
        this.redScore += 1
        this.blueControl = false
        this.neutral = true
      } else {
        console.error(`ERROR:unknown color: ${color}`) // eslint-disable-line no-console
      }
    },

    reversal: function(color) {
      if (color === 'blue') {
        this.blueScore += 2
        this.redControl = false
        this.blueControl = true
      } else if (color === 'red') {
        this.redScore += 2
        this.blueControl = false
        this.redControl = true
      } else {
        console.error(`ERROR:unknown color: ${color}`) // eslint-disable-line no-console
      }
    },

    nearfall: function(color, points) {
      if (color === 'blue') {
        this.blueScore += points
      } else if (color === 'red') {
        this.redScore += points
      } else {
        console.error(`ERROR:unknown color: ${color}`) // eslint-disable-line no-console
      }
    }

  }
}
</script>

<style lang="css">
</style>
