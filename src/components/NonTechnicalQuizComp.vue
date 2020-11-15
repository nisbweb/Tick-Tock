<template>
  <div id="TechnicalQuizMain">
      <h1 class="is-size-2">
        {{ questions[quesNumber].Question }}
      </h1>
      <Buttons @previous="prev" @next="next" @skip="skip"/>
  </div>
</template>

<script>
import Buttons from "./BottomButtons";
import questions from "../nonTechQuestions.json";
export default {
	data: function() {
		return {
			questions
		};
	},
	components:{
		Buttons
	},
	computed: {
		quesNumber() {
			return this.$store.state.nonTechCurrent;
		}
	},
	methods: {
		next() {
			this.$store.dispatch("NON_TECH_INCREMENT_ACTION", this.questions[this.quesNumber]);
			this.$store.commit("NON_TECH_ATTEMPT");
		},
		prev() {
			this.$store.commit("NON_TECH_DECREMENT");
		},
		skip() {
			var temp = Object.assign({}, this.questions[this.quesNumber]);
			temp.domain = "tech";
			this.$store.commit("ADD_SKIPPED_QUES", temp);
			this.$store.commit("NON_TECH_INCREMENT");
		},
	}
};
</script>

<style>

</style>