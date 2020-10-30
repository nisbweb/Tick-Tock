<template>
    <div>
        <brace
      v-model="code"
      style="height: 500px" 
      :fontsize="'25px'"
      :theme="'twilight'"
      :mode="'c_cpp'"
      :codefolding="'markbegin'"
      :softwrap="'free'"
      :selectionstyle="'text'"
      :highlightline="true"
      @code-change="callback">
    </brace>
    </div>
</template>

<script>
import Brace from "vue-bulma-brace";
export default {
	components: {
		Brace
	}
};
</script>