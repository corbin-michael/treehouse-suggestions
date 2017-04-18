<template>
<div id="profile-page">
  <header-nav :pageTitle="'You a.k.a ' + user.displayName" :checkIfLoggedIn="loggedIn"></header-nav>

  <div class="container profile-wrap">
    <button class="btn btn-danger logout" v-on:click="logout">Logout</button>
    <!-- <h4>ID: {{this.$route.params.id}}</h4> -->

    <!-- <form v-on:submit.prevent="updateUser">
      <div class="form-group">
        <label>Username</label>
        <input type="text" v-model="username" v-bind:placeholder="user.displayName">
      </div>

      <div class="form-group">
        <button type="submit" class="btn btn-success">Update</button>
      </div>
    </form> -->


  </div>

  <div class="suggestions-wrap">
    <h4>Your Suggestions:</h4>

    <div v-if="suggestions.length == 0">
      <p>You have no suggestions at this time. Get to thinkin!</p>
    </div>

    <div v-if="suggestions.length > 0">
      <div class="panel panel-default suggestion-item" v-for="(suggestion,key) in suggestions">
        <div class="panel-body">
          {{suggestion.comment}}
        </div>
        <div class="panel-footer">
          <span class="dig-it">
            {{Object.keys(suggestion.digs).length}}
            <i class="fa fa-hand-peace-o" aria-hidden="true"></i>
            <br />
            Digs
          </span>
          <span class="badge" v-bind:class="suggestion.topic | toLowerCase | convertCSharp">{{suggestion.topic}}</span>
          <p class="post-name-date">{{suggestion.user}} - <i>{{suggestion.date | readableDate}}</i></p>
        </div>
      </div>
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
  name: "profile",
  components: {
    HeaderNav,
    FooterArea
  },
  firebase: function() {
    // not working
    return {
      suggestions: firebaseApp.database().ref('users').child(this.id + '/posts')
    }
  },
  data () {
    return {
      pageTitle: "Profile",
      user: '',
      loggedIn: false,
      username: '',
      usernameCheck: false,
      id: this.$route.params.id
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
    var authUser = firebaseApp.auth().onAuthStateChanged((authUser) => {
      if ( authUser ) {
        this.user = authUser;
        this.loggedIn = true;
      } else {
        this.user = '';
      }

    });
  },
  filters: {
    readableDate: (value) => {
      if (value) {
        let newValue = new Date(value);
        let readable = newValue.toDateString();
        return readable;
      }
    },
    toLowerCase: (string) => {
      if ( string ) {
        return string.toLowerCase();
      }
    },
    convertCSharp: (string) => {
      if ( string ) {
        let newString = string;
        if (string.includes('#')) {
          return newString = "c-sharp";
        } else if (string.includes(" ")) {
          return newString.replace(/\s/g, "-");
        } else {
          return newString;
        }
      }
    }
  }
}
</script>


<style scoped>
.profile-wrap button.logout {
  display: block;
  margin-bottom: 75px;
}

.profile-wrap h4 {
  text-align: center;
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

.logout {
  display: block;
  margin: 0 auto;
}
</style>
