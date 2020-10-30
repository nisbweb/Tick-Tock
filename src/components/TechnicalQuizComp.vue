<template>
  <div id="TechnicalQuizMain">
      <h1 class="is-size-2">
        {{ questions[quesNumber].Question }}
      </h1>
        <div v-if="questions[quesNumber].type === 'code'">
          <codeEdit />
        </div>
      <Buttons />
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
			return this.$store.state.nonTechCurrent;
		}
	}
};
</script>

<style>

</style>