<template>
  <div id="TechnicalQuizMain">
      <h1 class="is-size-2">
        {{ questions[quesNumber].Question }}
      </h1>
        <div v-if="questions[quesNumber].type === 'code'">
          <codeEdit />
        </div>
      <Buttons @previous="prev" @next="next" @skip="skip"/>
  </div>
</template>

<script>
import Buttons from "./BottomButtons";
import questions from "../techQuestions.json";
import codeEdit from "./code.vue";
export default {
	data: function() {
		return {
			questions
		};
	},
	components:{
		Buttons,
		codeEdit
	},
	computed: {
		quesNumber() {
			return this.$store.state.techCurrent;
		}
	},
	methods: {
		next() {
			this.$store.dispatch("TECH_INCREMENT_ACTION", this.questions[this.quesNumber]);
		},
		prev() {
			this.$store.commit("TECH_DECREMENT");
		},
		skip() {
			var temp = Object.assign({}, this.questions[this.quesNumber]);
			temp.domain = "tech";
			this.$store.commit("ADD_SKIPPED_QUES", temp);
			this.$store.commit("TECH_INCREMENT");
		},
	}
};
</script>

<style>

</style>