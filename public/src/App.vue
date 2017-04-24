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

.suggestions-wrap {
  clear: both;
  margin-bottom: 150px;
  max-width: 950px;
  margin: 0 auto;
  /*display: flex;
  flex-direction: column-reverse;*/
}

.suggestion-item {
  transition: box-shadow .2s ease-in;
}

.panel-footer {
  position: relative;
}

.suggestion-item .dig-it {
  font-size: 18px;
  position: absolute;
  right: 25px;
  top: 50%;
  transform: translateY(-50%);
  text-align: center;
}

.dig-it.digged {
  background-color: #69C673;
  color: #fff;
  font-size: 14px;
  padding: 6px 12px;
  border-radius: 4px;

}

.suggestion-item:hover {
  box-shadow: 0px 0px 6px 1px #c3c3c3;
}


.badge.android {
  background-color: #5CB860;
}
.badge.api {
  background-color: #993c50;
}
.badge.business {
  background-color: #F9845B;
}
.badge.c-sharp {
  background-color: #9e4d83;
}
.badge.css {
  background-color: #3079AB;
}
.badge.data-analysis {
  background-color: #645a7e;
}
.badge.databases {
  background-color: #eb7728;
}
.badge.design {
  background-color: #e59a13;
}
.badge.developemnt-tools {
  background-color: #637a91;
}
.badge.digital-literacy {
  background-color: #c38cd4;
}
.badge.game-development {
  background-color: #20898c;
}
.badge.html {
  background-color: #39ADD1;
}
.badge.ios {
  background-color: #53BBB4;
}
.badge.java {
  background-color: #2c9676;
}
.badge.javascript {
  background-color: #c25975;
}
.badge.php {
  background-color: #7D669E;
}
.badge.python {
  background-color: #f092b0;
}
.badge.ruby {
  background-color: #e15258;
}
.badge.virtual-reality {
  background-color: #95D26C;
}
.badge.wordpress {
  background-color: #838CC7
}

</style>
