<template>
<div id="profile-page">
  <header-nav :pageTitle="pageTitle"></header-nav>

  <div class="container profile-wrap">
    <h4>{{user.displayName}}</h4>


    <form v-on:submit.prevent="updateUser">
      <div class="form-group">
        <label>Username</label>
        <input type="text" v-model="username" v-bind:placeholder="user.displayName">
      </div>

      <div class="form-group">
        <button type="submit" class="btn btn-success">Update</button>
      </div>
    </form>

    <button class="btn btn-danger logout" v-on:click="logout">Logout</button>
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
      loggedIn: false,
      username: '',
      usernameCheck: false
    }
  },
  methods: {
    logout: function() {
      auth.signOut().then(function() {
        router.push({path: "/"});
      }, function(error) {
        console.log(error);
      });
    },
    updateUser: function() {
      firebaseApp.auth().currentUser.updateProfile({
        displayName: this.username
      }).then(function(){

      }, function(error) {

      });
      console.log(this.user);
    }
  },
  beforeMount() {
    var user = firebaseApp.auth().currentUser;
    if (user != null) {
      this.user = firebaseApp.auth().currentUser;
      this.loggedIn = true;

      if (this.user.displayName != null) {
        this.usernameCheck = true
      } else {
        this.usernameCheck = false
      }
    }
  }
}
</script>


<style scoped>
.profile-wrap button.logout {
  display: block;
  margin: 75px auto 0;
}

form input {
  width: 100%;
  max-width: 450px;
  height: 40px;
  background-color: rgba(211, 211, 211, 0.09);
  border: 1px solid lightgrey;
  border-radius: 5px;
  padding: 10px;
  display: block;
  margin: 0 auto;
}
</style>
