<template>
<div id="profile-page">
  <header-nav :pageTitle="pageTitle"></header-nav>

  <div class="container profile-wrap">
    <h4>{{user.email}}</h4>
    <button v-on:click="logout">Logout</button>
  </div>

  <footer-area></footer-area>
</div>
</template>

<script>
import router from '../main.js';
import FooterArea from '../components/Footer';
import HeaderNav from './HeaderNav';
import firebaseApp from '../database.js';
const auth = firebaseApp.auth();

export default {
  name: "profile",
  components: {
    HeaderNav,
    FooterArea
  },
  data () {
    return {
      pageTitle: "Profile",
      user: '',
      loggedIn: false
    }
  },
  methods: {
    logout: function() {
      auth.signOut().then(function() {
        router.push({path: "/"});
      }, function(error) {
        console.log(error);
      });
    }
  },
  beforeMount() {
    var user = firebaseApp.auth().currentUser;
    if (user != null) {
      this.user = firebaseApp.auth().currentUser;
      this.loggedIn = true;
    }
  }
}
</script>


<style scoped>

</style>
