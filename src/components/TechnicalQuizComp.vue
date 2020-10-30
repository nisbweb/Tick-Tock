<template>
  <div id="TechnicalQuizMain">
      helloworld
      <!-- buttons emit respective events like next, previous and skip. listen to the using v-on:previous or @preivious -->
      <Buttons />
  </div>
</template>

<script>
import Buttons from "./BottomButtons";
export default {
	components:{
		Buttons
	}
};
</script>

<style>

</style>