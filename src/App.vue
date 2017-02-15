<template>
<div id="form-page">
  <header-nav :checkIfLoggedIn="loggedIn" :pageTitle="pageTitle"></header-nav>

  <div class="container">

    <div class="overview">
      <p>These are suggestions for the website <a href="http://www.teamtreehouse.com" target="_blank">Treehouse</a> and are intended to bring awareness to the courses we would like them to make.</p>
    </div>

    <div class="username" v-if="loggedIn">
      <h5>{{user.email}}</h5>
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
            <button type="submit" class="btn btn-success">Submit</button>
          </div>

        </form>
      </div>
    </div>
    <div class="clearfix" v-else>
      <div class="alert alert-warning" role="alert">
        <p>Please <router-link to="/login">login</router-link> or <router-link to="/create-account">create an account</router-link> to leave suggestions.</p>
      </div>
    </div>

    <!-- <div class="filter-wrap">
      {{filterBy}}
      <p>Filter suggestion by:</p>
      <div class="filter" v-for="filter in filters">
        <span v-bind:for="filter">{{filter}}</span>
        <input type="radio" v-bind:value="filter" v-model="filterBy" v-on:change="filterOn = true" />
      </div>

    </div> -->

    <div class="suggestions-wrap">
      <div class="panel panel-success suggestion-item" v-for="item in items">
        <div class="panel-body">
          {{item.comment}}
        </div>
        <div class="panel-footer">
          <span class="badge">{{item.topic}}</span> - {{item.user}}
        </div>
      </div>
    </div>

  </div>

  <footer-area></footer-area>

</div>
</template>

<script>
import firebaseApp from './database.js';
import HeaderNav from './components/HeaderNav';
import FooterArea from './components/Footer';
const suggestionRef = firebaseApp.database().ref('suggestions');

const developmentTopics = ["Android", "Business", "C#", "CSS", "Databases", "Design", "Development Tools", "Digital Literacy", "Game Development", "HTML", "iOS", "Java", "Javascript", "PHP", "Python", "Ruby", "Wordpress"];

export default {
  name: 'app',
  components: {
    HeaderNav,
    FooterArea
  },
  firebase: {
    items: suggestionRef
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
      loggedIn: false
    }
  },
  methods: {
    submitSuggestion: function() {
      var newSuggestion = {
        //name: this.name,
        comment: this.comment,
        topic: this.topicSelected,
        user: this.user.uid
      };

      this.$firebaseRefs.items.push(newSuggestion);
      //this.name = "";
      this.comment = "";
      this.topicSelected = "";
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

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
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

.btn-success {
  background-color: #69C673;
  border-color: #69C673;
  width: 100%;
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
}

.suggestion-item {

}

</style>
