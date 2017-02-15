<template>
  <div id="footer-wrap">
    <div class="container">
      <div class="row">
        <div class="col-sm-6">
          <div class="footer-logo">
            <h5>
              <img src="../assets/treehouse.png" title="Team Treehouse" />Treehouse Suggestions
            </h5>
          </div>
        </div>
        <div class="col-sm-6">
          <div class="footer-warning">
            <p>WARNING: This site is not affiliated with Team Treehouse, but is intended to help them better understand what courses to make in the future. I'm a member of Treehouse and found that they didn't have a place for members to go and talk and vote about what they wanted Treehouse to make next.</p>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-12">
          <div class="footer-copyright">
            <p>&copy; {{date.getFullYear()}}<br /> Created by: Corbin Jensen <br /> <a href="mailto:corbinmjensen@gmail.com">Email Corbin</a></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "footer-area",
  data() {
    return {
      date: new Date(),
    }
  }
}
</script>

<style scoped>
#footer-wrap {
  background-color: #69C673;
  width: 100%;
  margin-top: 50px;
}
.footer-logo h5 {
  color: #fff;
  text-decoration: none;
  margin: 15px 0;
  font-size: 20px;
}

.footer-logo img {
  width: 35px;
  top: -2px;
  position: relative;
  border-radius: 100%;
  margin-right: 10px;
}

.footer-warning {
  margin-top: 15px;
}

.footer-warning p,
.footer-copyright p,
.footer-copyright p a {
  color: #fff;
  font-size: 14px;
}

.footer-copyright {
  margin-top: 40px;
  text-align: center;
}
</style>
