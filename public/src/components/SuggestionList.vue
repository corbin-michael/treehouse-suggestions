<template>
  <div class="suggestions-wrap">
    <div class="panel panel-default suggestion-item" v-for="(item,key) in items">
      <div class="panel-body">
        {{item.comment}}
        <!-- <p>Key: {{item['.key']}}</p> -->
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
</template>


<script>
import firebaseApp from '../database.js';
const suggestionRef = firebaseApp.database().ref('suggestions');


export default {
  name: "suggestionList",
  firebase: {
    items: suggestionRef
  }
}
</script>

<style scoped>

</style>
