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
			skippedQues: []
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
		FETCH_USER: ({commit}, payload) => {
			firebaseApp.db.collection("user").doc(payload).get().then(val => {
				// console.log(val.id, val.data());
				commit("EDIT_USER", val.data());
			}).catch(err => {
				console.error(err);
			});
		},
		TECH_INCREMENT_ACTION: (context, payload) => {
			context.state.user.skippedQues = context.state.user.skippedQues.filter((el) => el.QuestionNo != payload.QuestionNo && el.domain == "tech");
			context.commit("TECH_INCREMENT");
		},
		NON_TECH_INCREMENT_ACTION: (context, payload) => {
			context.state.user.skippedQues = context.state.user.skippedQues.filter((el) => el.QuestionNo != payload.QuestionNo && el.domain == "non");
			context.commit("NON_TECH_INCREMENT");
		}
	},
	getters:{
		GET_USER: state => state.user,
		GET_LANG: state => state.lang,
		GET_THEME: state => state.theme,
		GET_TECH: state => state.techCurrent,
		GET_NON: state => state.nonTechCurrent,
		GET_START_TIME: state => state.user.startTime
	}
});

export default store;