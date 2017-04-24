<template>
  <div class="suggestions-wrap">

    <div class="panel panel-default suggestion-item" v-for="(item,key) in items">

      <div class="panel-body">
        {{item.comment}}
      </div>
      <div class="panel-footer">

        <div v-show="userID">
          <div v-if="Object.values(item.digs).indexOf(userID) > -1">
            <span class="dig-it digged">
              {{Object.keys(item.digs).length}}
              <i class="fa fa-hand-peace-o" aria-hidden="true"></i>
              <br />
              I can dig it!
            </span>
          </div>
          <div v-else>
            <span class="dig-it" v-on:click="addDig(item['.key'], userID)">
              <button class="btn btn-default">
                {{Object.keys(item.digs).length}}
                <i class="fa fa-hand-peace-o" aria-hidden="true"></i>
                <br />
                Can you dig it?
              </button>
            </span>
          </div>
        </div>
        <div v-show="!userID">
          <span class="dig-it">
            <button class="btn btn-default">
              {{Object.keys(item.digs).length}}
              <i class="fa fa-hand-peace-o" aria-hidden="true"></i>
              <br />
              Digs
            </button>
          </span>
        </div>
        <span class="badge" v-bind:class="item.topic | toLowerCase | convertCSharp">{{item.topic}}</span>
        <p class="post-name-date">{{item.user}} - <i>{{item.date | readableDate}}</i></p>
      </div> <!-- /panel-footer -->


    </div> <!-- /panel -->
  </div> <!-- /suggestion wrap -->

</template>


<script>
import firebaseApp from '../database.js';
const suggestionRef = firebaseApp.database().ref('suggestions');

export default {
  name: "suggestionList",
  props: ['userID'],
  firebase() {
    return {
      items: suggestionRef.orderByChild('order')
    }
  },
  data() {
    return {
      id: this.userID
    }
  },
  methods: {
    addDig: function(itemKey, personWhoLikes) {
      this.$firebaseRefs.items.child(itemKey).child('digs').push(personWhoLikes);
      //firebaseApp.database().ref('users').child(this.userID + '/posts/' + itemKey).child('digs').push(personWhoLikes);
      console.log("I dig it!");
    }
  },
  filters: {
    readableDate: (value) => {
      let newValue = new Date(value);
      let readable = newValue.toDateString();
      return readable;
    },
    toLowerCase: (string) => {
      return string.toLowerCase();
    },
    convertCSharp: (string) => {
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
</script>

<style scoped>
.post-name-date {
  margin-top: 5px;
}

</style>
