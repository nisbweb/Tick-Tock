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
			this.$store.commit("TECH_INCREMENT");
		},
		prev() {
			this.$store.commit("TECH_DECREMENT");
		},
		skip() {
			this.$store.commit("ADD_SKIPPED_QUES", this.questions[this.quesNumber]);
			this.$store.commit("TECH_INCREMENT");
		},
	}
};
</script>

<style>

</style>