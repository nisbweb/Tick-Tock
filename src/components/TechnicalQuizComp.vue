<template>
  <div id="TechnicalQuizMain">
    <h1 class="is-size-2">
      {{ questions[quesNumber].Question }}
    </h1>
	<div v-if="questions[quesNumber].type === 'mcq'">
		<MCQ :selectedOption="msqSelectedOption" @select="select($event)" :options="questions[quesNumber].options" />
	</div>
    <div v-if="questions[quesNumber].type === 'code'">
      <codeEdit />
    </div>
    <Buttons
      @previous="prev"
      @next="next"
      @submit="submit"
    />
  </div>
</template>

<script>
import Buttons from "./BottomButtons";
import questions from "../techQuestions.json";
import codeEdit from "./code.vue";
import MCQ from "./mcq";
import { mapGetters } from "vuex";
export default {
	data: function () {
		return {
			questions,
			msqSelectedOption: null
		};
	},
	components: {
		Buttons,
		MCQ,
		codeEdit
	},
	computed: {
		...mapGetters({
			quesNumber: "GET_TECH"
		})
		// quesNumber() {
		// 	return this.$store.state.techCurrent;
		// }
	},
	methods: {
		submit() {
			if(this.questions[this.quesNumber].type === "mcq"){
				// code to submit mcq answer
				this.msqSelectedOption = null;
			}
			// code to handle submissionof code type question's answer
			this.$store.dispatch("TECH_INCREMENT_ACTION", this.questions[this.quesNumber]);
		},
		prev() {
			this.$store.commit("TECH_DECREMENT");
		},
		next() {
			var temp = Object.assign({}, this.questions[this.quesNumber]);
			temp.domain = "tech";
			this.$store.commit("ADD_SKIPPED_QUES", temp);
			this.$store.commit("TECH_INCREMENT");
		},
		select(option){
			this.msqSelectedOption = this.msqSelectedOption === option ? null : option;
		}
	}
};
</script>
