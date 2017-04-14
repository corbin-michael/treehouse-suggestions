<template>
  <div class="suggestions-wrap">
    <div class="panel panel-default suggestion-item" v-for="(item,key) in items">
      <div class="panel-body">
        {{item.comment}}
        {{item.date.getDate()}}
        <!-- <p>Key: {{item['.key']}} -- {{userID}}</p> -->
      </div>
      <div class="panel-footer">

        <div v-if="Object.values(item.digs).indexOf(userID) > -1">
          <span class="dig-it">
            <button class="btn btn-success">
              {{Object.keys(item.digs).length}}
              <i class="fa fa-hand-peace-o" aria-hidden="true"></i>I can dig it!
            </button>
          </span>
        </div>
        <div v-else>
          <span class="dig-it" v-on:click="addDig(item['.key'], userID)">
            <button class="btn btn-default">
              {{Object.keys(item.digs).length}}
              <i class="fa fa-hand-peace-o" aria-hidden="true"></i> Can you dig it?
            </button>
          </span>
        </div>
        <span class="badge">{{item.topic}}</span>
        <p>{{item.user}}</p>
      </div>
    </div>
  </div>
</template>


<script>
import firebaseApp from '../database.js';
const suggestionRef = firebaseApp.database().ref('suggestions');


export default {
  name: "suggestionList",
  props: ['userID'],
  firebase: {
    items: suggestionRef
  },
  methods: {
    addDig: function(itemKey, personWhoLikes) {
      this.$firebaseRefs.items.child(itemKey).child('digs').push(personWhoLikes);
      console.log("I dig it!");
    }
  }
}
</script>

<style scoped>

</style>
