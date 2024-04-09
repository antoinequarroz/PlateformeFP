<template>
  <div id="app">
    <Navbar/>
    <router-view/>
    <Footer/>
  </div>
</template>

<script>
import Navbar from './components/Utils/Navbar.vue'
import FooterSection from './components/Utils/Footer.vue'
import Footer from "./components/Utils/Footer.vue";

export default {
  components: {
    Footer,
    Navbar,
    FooterSection
  }
}
</script>

