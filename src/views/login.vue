<template>
  <div>
    <section class="hero is-light is-fullheight">
      <div class="hero-body">
        <div class="container">
          <h1 class="title is-size-1">
            Tick-Tock ⏳
          </h1>
          <h2
            class="subtitle"
          >
            Please Login
            <br /><br />
          </h2>
          <div
            class="flex is-justify-content-center is-align-items-center"
          >
            <b-field
              label="Name"
              horizontal
            >
              <b-input
                placeholder="Name"
                v-model="displayName"
                type="text"
                icon="account"
              ></b-input>
            </b-field>
            <b-field
              label="Email"
              horizontal
            >
              <b-input
                placeholder="Email"
                v-model="email"
                type="email"
                icon="email"
              >
              </b-input>
            </b-field>
            <b-field
              label="Password"
              horizontal
            >
              <b-input
                placeholder="Password"
                v-model="password"
                type="password"
                icon="key"
              ></b-input>
            </b-field>
            <hr />
            <b-button
              @click="emailLogin"
              type="is-success"
            >Sign in with Email</b-button> &nbsp;
            <b-button
              @click="googles"
              type="is-danger"
            >Sign in with Google</b-button>
            <br>
          </div>
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

@media screen and (max-width: 960px) {
  .hero {
    background: transparent;
  }
}
</style>

<script>
import firebaseApp from "../firebaseConfig";
import firebase from "firebase";
export default {
	name: "Login",
	data() {
		return {
			email: "",
			password: "",
			displayName: "",
			admin: false,
			promp: false
		};
	},
	methods: {
		emailLogin() {
			firebaseApp.auth.createUserWithEmailAndPassword(this.email, this.password).then(data => {
				// console.log("user/"+data.user.uid)
				console.log({
					displayName: this.displayName,
					email: this.email,
					id: data.user.uid,
					startTime: null,
					endTime: null,
					solvedTech: [],
					solvedNonTech: [],
					currentQuestionTech:0,
					currentQuestionNonTech:0,
					maxQuestionTech:0,
					maxQuestionNonTech:0
				});
				firebaseApp.db.doc("user/"+data.user.uid).set({
					displayName: this.displayName,
					email: this.email,
					id: data.user.uid,
					startTime: null,
					endTime: null,
					solvedTech: [],
					attemptTech:[],
					attemptNonTech: [],
					solvedNonTech: [],
					currentQuestionTech:0,
					currentQuestionNonTech:0,
					maxQuestionTech:0,
					maxQuestionNonTech:0
				});
				localStorage.setItem("logged", true);
				localStorage.setItem("uid",data.user.uid);
				this.$router.push("/quiz");
			}).catch(error => {
				console.log(error);
				this.$buefy.toast.open({
					message: error.message,
					type: "is-danger",
				});
			});
		},
		googles() {
			var provider = new firebase.auth.GoogleAuthProvider();
			firebaseApp.auth.signInWithPopup(provider).then(data => {
				firebaseApp.db.collection("user").doc(data.user.uid).set({
					displayName: data.user.displayName,
					email: data.user.email,
					id: data.user.uid,
					startTime: null,
					endTime: null,
					solvedTech: [],
          
					attemptTech:[],
					attemptNonTech: [],
					solvedNonTech: [],
					currentQuestionTech:0,
					currentQuestionNonTech:0,
					maxQuestionTech:0,
					maxQuestionNonTech:0
				});
				localStorage.setItem("uid",data.user.uid);
				localStorage.setItem("logged", true);
				this.$router.push("/quiz");
				
			}).catch(error => {
				this.$buefy.toast.open({
					message: error.message,
					type: "is-danger",
				});
			});
		}
	}
};
</script>
