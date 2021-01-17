<template>
    <div class="visitorPages">
        <LandingPage />
        <About />
        <ImmergeAuth />

        <!-- <FooterVisitors /> -->

    </div>
</template>

<script>
import LandingPage from './visitor-pages/LandingPage'
import About from './visitor-pages/About'
import ImmergeAuth from './visitor-pages/ImmergeAuth'
// import FooterVisitors from './layout/FooterVisitors'
export default {
    name:"VisitorPages",
    components: {
        LandingPage,
        About,
        ImmergeAuth,
        // FooterVisitors
    }
}
</script>

<style scoped>
.visitorPages {
    text-align: center;
    margin-bottom: 80px;
}

</style>