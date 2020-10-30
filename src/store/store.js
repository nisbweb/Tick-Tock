import Vue from "vue";
import Vuex from "vuex";
import firebaseApp from "../firebaseConfig";

Vue.use(Vuex);

// eslint-disable-next-line no-unused-vars
const store = new Vuex.Store({
	state: {
		user: {
			displayName: null,
			email: null,
			id: null,
			startTime: null,
			endTime: null,
			solvedTech: null,
			solvedNotTech: null,
			skippedQues: [
				{
					domain: null,
					number: null
				}
			]
		},
		techCurrent: 0,
		nonTechCurrent: 0,
		lang: 0,
		theme: 0
	},
	mutations: {
		EDIT_USER: (state, payload) => {
			if(payload.displayName) {
				state.user.displayName = payload.displayName;
			}
			if(payload.email) {
				state.user.email = payload.email;
			}
			if(payload.id) {
				state.user.id = payload.id;
			}
			if(payload.startTime) {
				state.user.startTime = payload.startTime;
			}
			if(payload.endTime) {
				state.user.endTime = payload.endTime;
			}
			if(payload.solvedNotTech) {
				state.user.solvedNotTech = payload.solvedNotTech;
			}
			if(payload.solvedTech) {
				state.user.solvedTech = payload.solvedTech;
			}
		},
		ADD_SKIPPED_QUES: (state, payload) => {
			state.user.skippedQues.push(payload);
		},
		TECH_INCREMENT: (state) => {
			state.techCurrent++;
		},
		NON_TECH_INCREMENT: (state) => {
			state.nonTechCurrent++;
		},
		TECH_DECREMENT: (state) => {
			state.techCurrent--;
		},
		NON_TECH_DECREMENT: (state) => {
			state.nonTechCurrent--;
		},
		UPDATE_LANG: (state, payload) => {
			state.lang = payload;
		},
		UPDATE_THEME: (state, payload) => {
			state.theme = payload;
		}
	},
	actions: {
		FETCH_USER: (context, payload) => {
			firebaseApp.db.collection("users").doc(payload.id).get().then(val => {
				var temp = {
					id: val.id,
					data: val.data()
				};
				context.commit("EDIT_USER", temp);
			});
		},
	},
});

export default store;