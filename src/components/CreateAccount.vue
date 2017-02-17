<template>
<div id="create-account-page">
  <header-nav :pageTitle="pageTitle"></header-nav>

  <div class="container">
    <div class="login-form">
      <form v-on:submit.prevent="createUser">
        <div class="form-group">
          <label>Email</label>
          <input type="email" v-model="user.email" />
        </div>
        <div class="form-group">
          <label>Username</label>
          <input type="text" v-model="user.username" />
        </div>
        <div class="form-group">
          <label>Password</label>
          <input type="password" v-model="user.password" />
        </div>
        <div class="form-group">
          <button type="submit" class="btn btn-success">Create Account</button>
        </div>

      </form>
    </div>
  </div>

  <footer-area></footer-area>

</div>
</template>

<script>
import router from '../main.js';
import FooterArea from '../components/Footer';
import HeaderNav from './HeaderNav';
import firebaseApp from "../database.js";

export default {
  name: "createAccount",
  components: {
    HeaderNav,
    FooterArea
  },
  data () {
    return {
      pageTitle: "Create Account",
      user: {
        email: '',
        username: '',
        password: ''
      }
    }
  },
  methods: {
    createUser: function() {
      var newUserName = this.user.username;
      firebaseApp.auth().createUserWithEmailAndPassword(this.user.email, this.user.password).then(function(newUser) {
        console.log(newUser);

        // add user to DB under 'users'
        firebaseApp.database().ref('users').child(newUser.uid).set({
          username: newUserName
        });

        // update profile with username aka displayName
        firebaseApp.auth().currentUser.updateProfile({
          displayName: newUserName
        }).then(function() {
          console.log("Hopefully displayname: ");
        }, function(error) {
          console.log("error adding: " + error);
        });

      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
      });

    }
  }
}
</script>

<style scoped>
input {
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
