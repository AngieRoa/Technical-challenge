
<template>
  <div id="app" :class="{ darkApp : isDarkMode }">

<header>
    <div class="header" :class="{ darkHeader : isDarkMode }">
      <div class="headerWrapper">
        <router-link to="/"><h1>Where in the world?</h1></router-link>
        <a @click="isDarkMode = !isDarkMode" class="Dark-Mode-Btn">
          <div><i class="far fa-moon"></i></div>
          <p>Dark Mode</p></a>
      </div>
    </div>
</header>

    <router-view :key="$route.fullPath" :isDarkMode="isDarkMode" />
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      isDarkMode: false,
    }
  },
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,wght@0,200;0,300;0,400;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,600;1,700;1,800;1,900&display=swap');

#app {
  font-family: 'Nunito Sans', sans-serif;
  color: #111517;
  font-size: 13px;
}

body {
  margin: 0;
  }

.header {
  background-color: #fff;
  padding: 0 75px;
  box-shadow: 1px 1px 7px 0px rgb(0, 0, 0, 0.1);
  position: relative;
}

.headerWrapper {
  display: flex;
  justify-content: space-between;
  max-width: 1400px;
  margin: 0 auto;
}

a {
  text-decoration: none;
  color: #000;
}


.darkApp {
  background-color: #202c36 !important;
}

.Dark-Mode-Btn {
  background-color: transparent;
  display: inline-block;
  cursor: pointer;
  color: #000;
  padding-top: 25px;
  font-weight: 600;
  display: flex;
  margin-top: 5px;
}

.Dark-Mode-Btn p {
  margin: 0 0 0 7px;
}

.Dark-Mode-Btn:active {
  position: relative;
  top: 1px;
}

.darkHeader {
  background: #2b3845;
}

.darkHeader h1,
.darkHeader a {
  color: #fff;
}


@media (max-width: 875px) {
  .header {
    padding: 0 15px;
  }

  h1 {
    font-size: 18px;
    padding-top: 20px;
    padding-bottom: 20px;
  }

  .Dark-Mode-Btn {
    padding-top: 30px
  }
}
</style>
