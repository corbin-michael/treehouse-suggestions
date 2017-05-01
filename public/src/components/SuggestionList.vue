<template>
  <div class="suggestions-wrap">
    <div class="panel panel-default suggestion-item" v-for="(item,key) in items" v-bind:class="item.topic | toLowerCase | convertCSharp">

      <div class="panel-body">
        <p class="post-name-date">
          <span class="name">{{item.username}}</span>
          <span class="date">{{item.date | readableDate}}</span>
        </p>
      </div>

      <div class="panel-footer">

        <span class="badge" v-bind:class="item.topic | toLowerCase | convertCSharp">{{item.topic}}</span>

        <h4>{{item.comment}}</h4>

        <div v-show="userID">
          <div v-if="Object.keys(item.digs).map(i => item.digs[i].indexOf(userID) > -1) && Object.keys(item.digs).length > 0">
            <span class="dig-it digged">
              {{Object.keys(item.digs).length}}
              <i class="fa fa-hand-peace-o" aria-hidden="true"></i>
              <br />
              I dig it!
            </span>
          </div>
          <div v-else>
            <!-- addDig(item['.key'], userID) -->
            <span class="dig-it" v-on:click="addDig(item['.key'], userID)">
              <button class="btn btn-default">
                {{Object.keys(item.digs).length}}
                <i class="fa fa-hand-peace-o" aria-hidden="true"></i>
                <br />
                Dig it?
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


      </div> <!-- /panel-footer -->


    </div> <!-- /panel -->
  </div> <!-- /suggestion wrap -->

</template>


<script>
import firebaseApp from '../database.js';
const suggestionRef = firebaseApp.database().ref('suggestions');
const userRef = firebaseApp.database().ref('users');

export default {
  name: "suggestionList",
  props: ['userID'],
  firebase() {
    return {
      items: suggestionRef.orderByChild('order'),
      topItems: suggestionRef.orderByChild('totalDigs')
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
    },
    // testDig: function(itemKey, personWhoLikes) {
    //   this.$firebaseRefs.items.child(itemKey).child('digs').push(personWhoLikes);
    //   this.$firebaseRefs.items.child(itemKey).child('totalDigs').once('value').then((snapshot) => {
    //     var currentCount = snapshot.val();
    //     var newCount = (currentCount + 1) * -1;
    //     firebaseApp.database().ref('suggestions').child(itemKey).update({totalDigs: newCount});
    //   });
    // }
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

.panel {
  margin-bottom: 35px;
}

.panel-body {
  padding: 0 15px;
  color: #fff;
}

.panel-footer {
  position: relative;
  background-color: #fff;
}

.panel-footer h4 {
  width: calc(100% - 150px);
}

.post-name-date {
  margin: 0;
  padding: 3px 0;
}

.post-name-date .date {
  float: right;
}

@media screen and (max-width: 600px) {
  .panel-footer h4 {
    width: 100%;
  }

  .panel-footer .btn {
    padding: 2px 12px;
    width: 100%;
  }

  .suggestion-item .dig-it {
    position: relative;
    right: 0;
    top: 0;
    transform: translateY(0);
  }
  .dig-it.digged {
    width: 100%;
    display: block;
  }
}

.badge.android,
.panel.android,
.panel.android .panel-body {
  background-color: #5CB860;
  border: 1px solid #5CB860;
}
.badge.api,
.panel.api,
.panel.api .panel-body {
  background-color: #993c50;
  border: 1px solid #993c50;
}
.badge.business,
.panel.business,
.panel.business .panel-body {
  background-color: #F9845B;
  border: 1px solid #F9845B;
}
.badge.c-sharp,
.panel.c-sharp,
.panel.c-sharp .panel-body {
  background-color: #9e4d83;
  border: 1px solid #9e4d83;
}
.badge.css,
.panel.css,
.panel.css .panel-body {
  background-color: #3079AB;
  border: 1px solid #3079AB;
}
.badge.data-analysis,
.panel.data-analysis,
.panel.data-analysis .panel-body {
  background-color: #645a7e;
  border: 1px solid #645a7e;
}
.badge.databases,
.panel.databases,
.panel.databases .panel-body {
  background-color: #eb7728;
  border: 1px solid #eb7728;
}
.badge.design,
.panel.design,
.panel.design .panel-body {
  background-color: #e59a13;
  border: 1px solid #e59a13;
}
.badge.developemnt-tools,
.panel.developemnt-tools,
.panel.developemnt-tools .panel-body {
  background-color: #637a91;
  border: 1px solid #637a91;
}
.badge.digital-literacy,
.panel.digital-literacy,
.panel.digital-literacy .panel-body {
  background-color: #c38cd4;
  border: 1px solid #c38cd4;
}
.badge.game-development,
.panel.game-development,
.panel.game-development .panel-body {
  background-color: #20898c;
  border: 1px solid #20898c;
}
.badge.html,
.panel.html,
.panel.html .panel-body {
  background-color: #39ADD1;
  border: 1px solid #39ADD1;
}
.badge.ios,
.panel.ios,
.panel.ios .panel-body {
  background-color: #53BBB4;
  border: 1px solid #53BBB4;
}
.badge.java,
.panel.java,
.panel.java .panel-body {
  background-color: #2c9676;
  border: 1px solid #2c9676;
}
.badge.javascript,
.panel.javascript,
.panel.javascript .panel-body {
  background-color: #c25975;
  border: 1px solid #c25975;
}
.badge.php,
.panel.php,
.panel.php .panel-body {
  background-color: #7D669E;
  border: 1px solid #7D669E;
}
.badge.python,
.panel.python,
.panel.python .panel-body {
  background-color: #f092b0;
  border: 1px solid #f092b0;
}
.badge.ruby,
.panel.ruby,
.panel.ruby .panel-body {
  background-color: #e15258;
  border: 1px solid #e15258;
}
.badge.virtual-reality,
.panel.virtual-reality,
.panel.virtual-reality .panel-body {
  background-color: #95D26C;
  border: 1px solid #95D26C;
}
.badge.wordpress,
.panel.wordpress,
.panel.wordpress .panel-body {
  background-color: #838CC7
}

</style>
