<template>
<div id="form-page">
  <header-nav :checkIfLoggedIn="loggedIn" :pageTitle="pageTitle" :username="user.displayName"></header-nav>

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
            <button type="submit" class="btn btn-success">Submit</button>
          </div>

        </form>
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
      <div class="panel panel-default suggestion-item" v-for="(item,key) in items">
        <div class="panel-body">
          {{item.comment}}
          <p>Key: {{item['.key']}}</p>
        </div>
        <div class="panel-footer">
          <span class="dig-it" v-on:click="addDig(item['.key'], user.uid)">
            <button class="btn btn-default">
              <i class="fa fa-hand-peace-o" aria-hidden="true"></i> I dig it!
            </button>
          </span>
          <span class="badge">{{item.topic}}</span>
          <p>{{item.user}}</p>
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
        comment: this.comment,
        topic: this.topicSelected,
        user: this.user.displayName
      };

      this.$firebaseRefs.items.push(newSuggestion);
      this.comment = "";
      this.topicSelected = "";
    },
    addDig: function(itemKey, person) {
      this.$firebaseRefs.items.child(itemKey).push({
        person: [person]
      });
      console.log("I dig it!");
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

.suggestion-item:hover {
  box-shadow: 0px 0px 6px 1px #c3c3c3;
}

</style>
