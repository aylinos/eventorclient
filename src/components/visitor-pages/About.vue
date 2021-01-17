<template>
    <b-container id="about" class="about">
        <h2>About</h2>
        <b-row>
            <div class="col-md-6 my-auto">
                <h4 class="my-3">Plan, browse and subscribe to events easily with</h4>
                <h4 id="eventor" class="my-3"><i>Eventor</i></h4>
            </div>
            <div class="col-md-6">
                <img src="../../assets/about1.png" id="image" alt="About image">
            </div>

            <div class="col-md-6">
                <img src="../../assets/about2.png" id="image" alt="About image">
            </div>
            <div class="col-md-6 my-auto">
            <h4 class="my-3">Organize information</h4>
                <p class="text-muted">No more chaotically spreaded notes on phone, notebook or digitalized document! Arrange all relevant information for personally planned or favorite events in one place </p>
            </div>

            <div class="col-md-6 my-auto">
                <h4 class="my-3">Share</h4>
                <p class="text-muted">Interact with people! <br> Share your event to selected fellow friends/associates or to the whole platform community</p>
            </div>
            <div class="col-md-6">
                <img src="../../assets/about3.png" id="image" alt="About image">
            </div>

            <div class="col-md-6">
                <img src="../../assets/about4.png" id="image" alt="About image">
            </div>
            <div class="col-md-6 my-auto">
            <h4 class="my-3">Keep track of popularity</h4>
                <p class="text-muted">Follow people interest for your shared events</p>
            </div>
        </b-row>
    </b-container>
</template>

<script>
export default {
    
}
</script>

<style scoped>
.about {
    padding: 1vh;
}

h2 {
    margin-top: 8vh;
}

#image {
    width: 100%;
    height: 100%;
}

#eventor {
    text-decoration: underline;
    text-decoration-color: rgb(55, 235, 55);
    text-decoration-thickness: 0.2em;
}

</style>