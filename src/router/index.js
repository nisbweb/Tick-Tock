import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/login.vue";
import Quiz from "../views/Quiz.vue";
import liveLeaderBoard from "../views/liveLeaderBoard.vue";

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

router.beforeEach( (to, from, next) => {
	const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
	if (!requiresAuth) {
		next();
	} else {
		if (localStorage.getItem("logged")) {
			next();
		} else {
			router.replace({
				path: "/",
			});
		}
	}
});

export default router;
