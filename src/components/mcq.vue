<template>
  <div id="mcqMain">
    <div
      class="options my-5"
      v-if="options.length > 0"
    >
      <div class="container">
        <div
          class="columns"
          style="flex-wrap: wrap; cursor: pointer;"
        >
          <div
            class="column is-half"
            v-for="(option, key) in options"
            :key="key"
          >
            <div class="card" :class="{'selected':selectedOption === option}" @click="$emit('select', option)">
              <div class="card-content">
                {{ option }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
	props: {
		"options": {
			type: Array,
			default: () => []
		},
		"selectedOption":{
			type: String,
			default: ""
		}
	}
};
</script>

<style lang="css" scoped>
.selected{
    background-color: rgba(11, 156, 49, 0.2) !important;
}
</style>