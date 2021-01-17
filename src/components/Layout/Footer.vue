<template>
  <!-- Footer -->
  <mdb-footer color="indigo" class="footer font-small pt-0">
    <div class="footer-copyright text-center py-3">
      <mdb-container class="footer-text">
        &copy; 2020 Copyright: <router-link :to = "{name: 'front-page'}"><img src="../../assets/logo.png" width="130"></router-link>
      </mdb-container>
    </div>
  </mdb-footer>
  <!-- Footer -->
</template>

<script>
  export default {
  }
</script>

<style scoped>
.footer{
    position: fixed;
    bottom: 0;
    width: 100%;
    background-color: #1ddb1d;
}
.footer-text {
    color: #fff!important;
}
</style>