<template>
<div id="create-account-page">
  <header-nav :pageTitle="pageTitle"></header-nav>

  <div class="container">
    <div class="login-form" v-show="!youThere">
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

    <div class="create_thankyou" v-show="youThere">
      <h3>Thank you for signing up!</h3>
      <p>Now go make some suggestions and if you see one you like make sure you let the person know you dig their idea!</p>
      <router-link to="/"><p class="btn btn-success">Suggestions</p></router-link>
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
      },
      youThere: false
    }
  },
  methods: {
    createUser: function() {
      var self = this;
      //var newUserName = this.user.username;
      firebaseApp.auth().createUserWithEmailAndPassword(this.user.email, this.user.password).then(function(newUser) {
        console.log(self.user.username);

        // add user to DB under 'users'
        firebaseApp.database().ref('users').child(newUser.uid).set({
          username: self.user.username
        });

        // created successfully show success message
        self.youThere = true;

        // update profile with username aka displayName
        firebaseApp.auth().currentUser.updateProfile({
          displayName: self.user.username
        }).then(function() {

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
.form-group {
  max-width: 450px;
  margin: 10px auto;
}

.form-group label {
  margin-bottom: 5px;
}

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

.create_thankyou {
  max-width: 450px;
  margin: 10px auto;
  text-align: center;
}

.create_thankyou a {
  text-decoration: none;
}

</style>
