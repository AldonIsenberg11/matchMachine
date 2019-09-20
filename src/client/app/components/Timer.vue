<template>
  <div class="home">
    <p>------------------------Timer------------------------</p>
      <div>
        <h4>Timer: {{ timer }}</h4>
        <h4>State: {{ state }}</h4>
        <button class="startTimer" @click="$emit('start')">Start</button>
        <button class="lapTimer"   @click="$emit('lap'  )">Lap</button>
        <button class="pauseTimer" @click="$emit('pause')">Pause</button>
        <button class="clearTimer" @click="$emit('clear' )">Clear</button>
      </div>
    <p>------------------------Timer------------------------</p>
  </div>
</template>

<script>
  export default {
    name: 'Timer',
    props: ['timer', 'state']
  }
</script>
