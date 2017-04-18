<template>
  <div class="header">
    <div class="header-global">
      <div class="container">
        <h5>
          <router-link to="/">
            <img src="../assets/treehouse.png" title="Team Treehouse" />Treehouse Suggestions
          </router-link>
        </h5>
        <div class="header-links">
          <div class="header-nav" v-if="checkIfLoggedIn">
            <router-link :to="{name: 'user', params: {id: userID}}" class="btn btn-default" v-if="username">{{username}}</router-link>
          </div>
          <div class="header-nav" v-if="!checkIfLoggedIn">
            <router-link to="/login" class="btn btn-default">Login</router-link>
            <router-link to="/create-account" class="btn btn-success">Create Account</router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <h3 class="page-title">{{pageTitle}}</h3>
    </div>
  </div>

</template>


<script>
  export default {
    name: 'headerNav',
    props: ['checkIfLoggedIn', 'pageTitle', 'username', 'userID'],
    data() {
      return {

      }
    }
  }
</script>


<style scoped>

.header-global {
  background-color: #3e474f;
  text-align: left;
}

.header-global .container {
  position: relative;
}

.header-nav {
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
  position: relative;
  top: 10px;
}

.header-global h5 a {
  color: #fff;
  text-decoration: none;
  margin: 15px 0;
  font-size: 20px;
  float: left;
}

.header-global h5 a img {
  width: 35px;
  top: -2px;
  position: relative;
  border-radius: 100%;
  margin-right: 10px;
}

.header-nav a {
  margin: 0 10px;
}
</style>
