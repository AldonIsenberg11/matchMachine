<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/newMatch">New Match</router-link>
      <router-link to="/wrestlers">View/Add Wrestler</router-link>
      <router-link to="/matches">View Matches</router-link>
      <router-link to="/matchesUnderway">Matches Underway</router-link>
      <router-link to="/register">Add New User</router-link>
      <router-link to="/login">Login</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
$primary: #287ab1;
@import '~bulma';
.columns{
  flex-wrap: wrap
}
</style>
