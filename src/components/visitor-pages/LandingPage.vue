<template>
<div id="landingPage">
      <div class="bg-video">
        <video autoplay loop muted playsinline>
          <source src="./../../assets/Fireworks.mp4" type="video/mp4">
        </video>
        <div class="center text">
          <h1 class="title text-white">Bringing people together is the trend now</h1>
          <br>
          <h5 class="subtitle text-white">Immerge in the world of events</h5>
        </div>
      </div>

      <a href="#about" v-smooth-scroll="{ duration: 2000 }">
            <i id="icon-arrow-down" class="fas fa-arrow-down"></i>
      </a>
</div>
</template>

<script>
export default {
    
}
</script>

<style scoped>
  #landingPage {
    position: relative;
    width: 100%;
    height: 84vh;
    margin: 0;
  }
  
  .bg-video {
    position: relative;
    height: 80vh;
    width: 100%;
    overflow: hidden;
    z-index: -1;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    box-shadow: 0 19px 38px rgba(0, 0, 0, 0.30), 0 15px 12px rgba(0, 0, 0, 0.22);
  }

  .bg-video video {
    z-index: -1;
    position: absolute;
    width: auto;
    height: auto;
    min-width: 100%;
    min-height: 100%;
    top:50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .text {
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: rgb(66, 189, 66, 0.63);
    border-radius: 0.4em;
    padding: 1em;
  }

  #icon-arrow-down {
    margin-top: 1vh;
    background:-webkit-linear-gradient(left,rgb(182, 150, 245), rgb(55, 235, 55));;
    font-size: 30px;
    color: white;
    border-radius: 1em;
    padding: 3vh;
}
</style>