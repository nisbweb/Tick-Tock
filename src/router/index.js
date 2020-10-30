import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Quiz from "../views/Quiz.vue";
import firebaseApp from "../firebaseConfig";

Vue.use(VueRouter);

const routes = [
	{
		path: "/",
		name: "Home",
		component: Home,
		meta: {
			requiresAuth: false,
		},
	},
	{
		path: "/quiz",
		name: "Quiz",
		component: Quiz,
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

router.beforeEach((to, from, next) => {
	const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
	if (!requiresAuth) {
		next();
	} else {
		if (firebaseApp.auth.currentUser) {
			next();
		} else {
			router.replace({
				path: "/",
			});
		}
	}
});

export default router;
