<template>
  <div>
    <section class="hero is-light is-fullheight">
      <div class="hero-body">
        <div class="container">
          <h1 class="title is-size-1">
            Dream Code
          </h1>
          <h2 v-if="user.id">
            Please wait for the event to start
          </h2>
          <h2 v-else class="subtitle">
            Please Login
            <br><br>
            <section class="loginBox">
              <b-field label="Name" horizontal>
                <b-input></b-input>
              </b-field>
              <b-field label="Email" horizontal>
                <b-input></b-input>
              </b-field>
              <b-field label="Password" horizontal>
                <b-input></b-input>
              </b-field>
              <hr />
              <b-button type="is-danger">Sign in with Google</b-button>
            </section>
          </h2>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.hero {
  background-image: url("../assets/back1.svg");
  background-repeat: no-repeat;
  background-position: bottom right;
  background-size: 70vh;
}
.hero-body {
  background-image: url("../assets/nack2.svg");
  background-repeat: no-repeat;
  background-position: bottom left;
  background-size: 60vh;
}
.loginBox {
  width: 50%;
}
</style>

<script>
export default {
	name: "Login",
	computed: {
		user() {
			return this.$store.state.user;
		},
	},
};
</script>
