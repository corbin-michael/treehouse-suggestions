<template>
<div id="login-page">
    <header-nav :pageTitle="pageTitle"></header-nav>

    <div class="container">
      <div class="login-form">
        <div class="alert alert-danger" role="alert" v-if="error">
          <p>{{error}}</p>
        </div>

        <form v-on:submit.prevent="loginUser">
          <p id="error"></p>
          <div class="form-group">
            <label>Email</label>
            <input type="email" v-model="user.email"  />
          </div>
          <div class="form-group">
            <label>Password</label>
            <input type="password" v-model="user.password" />
          </div>
          <div class="form-group">
            <button type="submit" class="btn btn-success">Login</button>
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
import firebaseApp from '../database.js';
const auth = firebaseApp.auth();


export default {
  name: "login",
  components: {
    HeaderNav,
    FooterArea
  },
  data () {
    return {
      pageTitle: "Login",
      user: {
        email: '',
        password: ''
      },
      error: ''
    }
  },
  methods: {
    loginUser: function() {
      var errorPop = this.error;
      auth.signInWithEmailAndPassword(this.user.email,this.user.password)
      .then( (response) => {
        console.log(response);
        router.push({path: "/"});
      })
      .catch( (error) => {
        // // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        this.error = errorMessage;
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
</style>
