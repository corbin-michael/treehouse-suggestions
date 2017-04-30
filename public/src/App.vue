<template>
<div id="form-page">
  <header-nav :checkIfLoggedIn="loggedIn" :pageTitle="pageTitle" :username="user.displayName" :userID="user.uid"></header-nav>

  <div class="container">

    <div class="overview">
      <p>These are suggestions for the website <a href="http://www.teamtreehouse.com" target="_blank">Treehouse</a> and are intended to bring awareness to the courses we would like them to make. This site is not an affiliate of Treehouse, but hope they will look at these suggestions and do something with it.</p>
      <div class="alert alert-warning" role="alert" v-if="!loggedIn">
        <p>Please <router-link to="/login">login</router-link> or <router-link to="/create-account">create an account</router-link> to leave suggestions.</p>
      </div>
    </div>

    <div class="clearfix" v-if="loggedIn">
      <div class="form">
        <form v-on:submit.prevent="submitSuggestion">
          <div class="form-group">
            <label for="suggestion">Suggestion</label>
            <textarea id="suggestion" placeholder="Suggestion goes here..." v-model="comment"></textarea>
          </div>

          <div class="form-group">
            <label>What topic does your suggestion fall under?</label>
            <select v-model="topicSelected">
              <option v-for="topic in topics" v-bind:value="topic">{{topic}}</option>
            </select>
          </div>

          <div class="form-group">
            <button type="submit" class="btn btn-success" v-bind:class="[comment ? '' : 'disabled', topicSelected ? '' : 'disabled']">Submit</button>
          </div>
        </form>
      </div>
    </div>

    <suggestion-list :userID="user.uid"></suggestion-list>

  </div>

  <footer-area></footer-area>

</div>
</template>

<script>
import router from './main';
import firebaseApp from './database.js';
import HeaderNav from './components/HeaderNav';
import SuggestionList from './components/SuggestionList';
import FooterArea from './components/Footer';

const developmentTopics = ["Android", "API", "Business", "C#", "CSS", "Data Analysis", "Databases", "Design", "Development Tools", "Digital Literacy", "Game Development", "HTML", "iOS", "Java", "Javascript", "PHP", "Python", "Ruby", "Virtual Reality", "Wordpress"];

const suggestionRef = firebaseApp.database().ref('suggestions');

export default {
  name: 'app',
  components: {
    HeaderNav,
    FooterArea,
    SuggestionList
  },
  firebase: {
    count: suggestionRef
  },
  data () {
    return {
      pageTitle: 'Suggestions',
      //name: '',
      comment: '',
      suggestions: [],
      topics: developmentTopics,
      topicSelected: "",
      user: '',
      loggedIn: false,
      count: []
    }
  },
  beforeMount() {
    this.fetchUser();
    console.log("fetched");
  },
  methods: {
    submitSuggestion: function() {
      // post data
      var newSuggestion = {
        comment: this.comment,
        topic: this.topicSelected,
        user: this.user.uid,
        username: this.user.displayName,
        date: Date.now(),
        digs: '',
        order: (this.count.length + 1) * -1,
      };

      // new post key
      const newKey = firebaseApp.database().ref().child('suggestions').push().key;

      // updates in multiple places
      var updates = {};
      updates['suggestions/' + newKey] = newSuggestion;
      updates['users/' + this.user.uid + '/posts/' + newKey] = newSuggestion;

      //this.$firebaseRefs.items.push(newSuggestion);
      firebaseApp.database().ref().update(updates);

      console.log(this.user.uid);
      this.comment = "";
      this.topicSelected = "";
    },
    fetchUser: function() {
      console.log("fetching");
      var authUser = firebaseApp.auth().onAuthStateChanged((authUser) => {
        if ( authUser ) {
          this.user = authUser;
          this.loggedIn = true;
        } else {
          this.user = '';
        }
      });
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.overview {
  max-width: 950px;
  margin: 0 auto;
}

.form {
  margin-bottom: 50px;
}

label,
button,
label input,
label textarea {
  display: block;
  text-align: center;
  margin: 0 auto;
}

label {
  margin-bottom: 25px;
}

select {
  width: 100%;
  max-width: 450px;
  margin: 0 auto;
  display: block;
  border: 1px solid lightgrey;
}

textarea {
  width: 100%;
  max-width: 450px;
  height: 100px;
  margin: 0 auto;
  display: block;
  resize: none;
  background-color: rgba(211, 211, 211, 0.09);
  border: 1px solid lightgrey;
  border-radius: 5px;
  padding: 10px;
}

button[type="submit"] {
  width: 100%;
}

.btn-success {
  background-color: #69C673;
  border-color: #69C673;
  max-width: 450px;
  margin: 0 auto;
  display: block;
}

ul li {
  text-align: left;
}

.filter {
  float: left;
  width: 148px;
}






</style>
