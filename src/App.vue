
<template>
  <div class="app-wrapper vh-100">
    <router-view/>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inria+Sans:wght@700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Inria+Sans:wght@700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Inria+Sans:wght@700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Inria+Sans:wght@700&family=JetBrains+Mono:wght@400;500;800&display=swap');

.app-wrapper {
  display: flex;
  background-image: linear-gradient(to left bottom, #2033e1, #6f32e8, #9f30ed, #c830f0, #ee31f2);
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
nav {
  padding: 30px;
}
h1 {
  margin: 0;
  padding: 0;
  margin-top: 0 !important;
  padding-top: 0 !important;
}
nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>

<style scoped>
.navSpan{
  font-size: 30px;
  text-decoration: none;
}
.navSpan:hover{
  color: #ff0808;
  text-decoration: none;
}
</style>
