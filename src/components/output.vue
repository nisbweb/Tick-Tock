<template>
  <div class="columns my-5">
    <div class="column is-8" style="text-align: left;padding-left: 50px">
        <span class="is-size-4">
            {{ ques.lang }}
        </span><br><br><br>
        <code v-html="ques.code" style="text-align: left"></code>
    </div>
    <div class="column is-4">
      <div
        @click="select(opt)"
        :class="{'selected':selectOpt === opt, 'box': true}"
        v-for="(opt, index) in ques.options"
        :key="index"
      >
        {{ opt }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
	props: {
		ques: {
			type: Object,
			required: true,
		},
	},
	data() {
		return {
			selectOpt: null
		};
	},
	methods: {
		select(opt) {
			this.selectOpt = opt;
			this.$emit("select", opt);
		}
	}
};
</script>

<style lang="css" scoped>
.selected{
    background-color: rgba(11, 156, 49, 0.2) !important;
}
</style>