<template>
  <div>
    <section class="hero is-light is-fullheight">
      <div class="hero-body">
        <div class="container">
          <h1 class="title is-size-1">
            Dream Code
          </h1>
          <div
            class=""
            v-if="user.id"
          >
            <h2>
              Please wait for the event to start <br>
            </h2>
            <b-button v-if="user.startTime === null" type="is-success" @click="startTimer">Begin</b-button>
          </div>
          <h2
            v-else
            class="subtitle"
          >
            Please Login
            <br /><br />
          </h2>
          <div
            v-if="user.id ===null"
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
            <span
              v-if="promp"
              class="is-size-3"
              style="color: red"
            >
              The quiz has Started, please login
            </span>
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
import { mapGetters } from "vuex";
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
	computed: {
		...mapGetters({
			user: "GET_USER"
		})
	},
	watch: {
		// eslint-disable-next-line no-unused-vars
		admin(newValue, oldValue) {
			if (newValue && this.user.id) this.$router.push("/quiz");
			else this.promp = true;
		}
	},
	beforeMount() {
		// this.$store.dispatch("FETCH_USER");
		firebaseApp.db.collection("admin").doc("XcEoKorsJfpu2TrWbuoA").onSnapshot(value => {
			this.admin = value.data().start;
			console.log(this.admin);
		});
	},
	methods: {
		emailLogin() {
			firebaseApp.auth.createUserWithEmailAndPassword(this.email, this.password).then(data => {
				firebaseApp.db.collection("user").doc(data.user.uid).set({
					displayName: this.displayName,
					email: this.email,
					id: data.user.uid,
					startTime: null,
					endTime: null,
					solvedTech: 0,
					solvedNotTech: 0,
				});
				this.$store.commit("EDIT_USER", {
					displayName: this.displayName,
					email: this.email,
					id: data.user.uid,
					startTime: null,
					endTime: null,
					solvedTech: 0,
					solvedNotTech: 0,
				});
				localStorage.setItem("logged", true);
				if (this.admin) this.$router.push("/quiz");
			}).catch(error => {
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
					solvedTech: 0,
					solvedNotTech: 0,
				});
				this.$store.commit("EDIT_USER", {
					displayName: data.user.displayName,
					email: data.user.email,
					id: data.user.uid,
					startTime: null,
					endTime: null,
					solvedTech: 0,
					solvedNotTech: 0,
				});
				localStorage.setItem("logged", true);
				if (this.admin) this.$router.push("/quiz");
			}).catch(error => {
				this.$buefy.toast.open({
					message: error.message,
					type: "is-danger",
				});
			});
		},
		startTimer(){
			firebaseApp.db.collection("user").doc(this.user.id).update({
				startTime: new Date()
			}).then(() => {
				this.$store.dispatch("FETCH_USER", this.user.id);
				this.$router.push({path:"/quiz"});
			}).catch(err => {
				console.error(err);
			});
		}
	}
};
</script>
