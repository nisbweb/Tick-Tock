import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/login.vue";
import Quiz from "../views/Quiz.vue";
import liveLeaderBoard from "../views/liveLeaderBoard.vue";
import firebase from "firebase/app";
import store from "../store/store";
Vue.use(VueRouter);

const routes = [
	{
		path: "/",
		name: "Login",
		component: Login,
		meta: {
			requiresAuth: false,
		},
	},
	{
		path: "/quiz",
		name: "Quiz",
		component: Quiz,
		// Auth temporarily disabled for development purpose. please uncomment in production
		meta: {
			requiresAuth: true,
		},
	},
	{
		path: "/final",
		name: "Final",
		component: liveLeaderBoard,
		meta: {
			requiresAuth: true,
		},
	},
];

const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes,
});

firebase.getCurrentUser = () => {
	return new Promise((resolve, reject) => {
		const unsubscribe = firebase.auth().onAuthStateChanged(user => {
			unsubscribe();
			resolve(user);
		}, reject);
	});
};


router.beforeEach( async (to, from, next) => {
	const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
	const user = await firebase.getCurrentUser();
	if (requiresAuth && !user) {
		next("");
	} else if(user) {
		store.dispatch("FETCH_USER", user.uid);
		next();
	}else {
		next();
	}
});

export default router;
