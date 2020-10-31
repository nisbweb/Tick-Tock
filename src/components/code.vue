<template>
    <div class="columns">
        <div class="column is-8">
          <brace
            v-model="code"
            style="height: 500px"
            :theme="themes[theme]"
            :mode="langs[lang]"
            :codefolding="'markbegin'"
            :softwrap="'free'"
            :selectionstyle="'text'"
            :highlightline="true">
          </brace>
        </div>
        <div class="column is-4">
          <div class="box">
            <b-field label="Language" horizontal>
              <b-select v-model="tempL" @input="clang" placeholder="Select a language">
                <option
                    v-for="(option, index) in langs"
                    :value="index"
                    :key="option">
                    {{ option }}
                </option>
            </b-select>
            </b-field>
            <b-field label="Theme" horizontal>
              <b-select v-model="tempT" @input="ctheme" placeholder="Select a theme">
                <option
                    v-for="(option, index) in themes"
                    :value="index"
                    :key="option">
                    {{ option }}
                </option>
            </b-select>

            </b-field>
            <b-button style="margin: 5px" type="is-warning">Test</b-button>
            <h1 class="is-size-3">
              Output
            </h1>
            <div style="height: 200px; background-color: black;">
              {{  }}
            </div>
          </div>
        </div>
    </div>
</template>

<script>
import Brace from "vue-bulma-brace";
import {mapGetters} from "vuex";
export default {
	props: {
		init: {
			type: String,
			default: ""
		},
	},
	data() {
		return {
			code: "",
			langs: ["c_cpp", "python", "java", "javascript"],
			themes: ["monokai","twilight" , "solarized_light"],
			tempL: null,
			tempT: null,
			output: ""
		};
	},
	components: {
		Brace
	},
	computed: {
		...mapGetters({
			lang: "GET_LANG",
			theme: "GET_THEME"
		})
	},
	beforeMount() {
		if(this.init === "") this.code = this.init;
	},
	methods: {
		clang() {
			this.$store.commit("UPDATE_LANG", this.tempL);
		},
		ctheme() {
			this.$store.commit("UPDATE_THEME", this.tempT);
		},
	}
};
</script>