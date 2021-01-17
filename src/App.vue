<template>
  <div id="app">
    <!-- <Nav /> -->
    <NavbarFinal />
    <router-view/>

  </div>
</template>


<script>
import NavbarFinal from './components/Layout/NavbarFinal';
// import Nav from './components/Layout/Nav';

export default {
  name: 'App',
  components: {
    NavbarFinal,
    // Nav
  }
}
</script>

<style scoped>

</style>
