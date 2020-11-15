<template>
  <div class="columns">
    <div class="column is-8" style="text-align: left;margin-left: 100px">
        <span class="is-size-4">
            {{ ques.lang }}
        </span><br><br><br>
        <code v-html="ques.code" style="text-align: left"></code>
    </div>
    <div class="column is-4">
      <div
        @click="$emit('select', opt)"
        class="box"
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
};
</script>
