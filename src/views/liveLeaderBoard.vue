<template>
    <div>
		<span class="is-size-1">
			Leaderboard
		</span>
        <b-table :checked-rows.sync="checkedRows"
			:loading="isLoading"
			:paginated="paginated"
			:per-page="perPage"
			:striped="true"
			:hoverable="true"
			:total="total"
			default-sort="points"
			:mobile-cards="false"
			:data="clients"
			:pagination-simple="true"
			pagination-position="both"
			sort-icon="menu-up"
			sort-icon-size="is-regular"
			@page-change="next"
			backend-pagination >
            <b-table-column field="Rank" v-slot="props">
                {{ props.row.rank }}
            </b-table-column>
            <b-table-column field="Name" v-slot="props">
                {{ props.row.displayName }}
            </b-table-column>
            <b-table-column field="Name" v-slot="props">
                {{ props.row.solvedTech }}
            </b-table-column>
            <b-table-column field="Name" v-slot="props">
                {{ props.row.solvedNotTech }}
            </b-table-column>
            <b-table-column field="Name" v-slot="props">
                {{ calcTime(props.row.startTime, props.row.endTime) }}
            </b-table-column>
            <b-table-column field="Name" v-slot="props">
                {{ props.row.displayName }}
            </b-table-column>
        </b-table>
    </div>
</template>

<script>
import firebaseApp from "../firebaseConfig";
import { mapGetters } from "vuex";
export default {
	data() {
		return {
			trashObject: null,
			clients: [],
			isLoading: true,
			paginated: true,
			perPage: 2,
			checkedRows: [],
			sortData: [],
			modalAct: false,
			last: null,
			page: 1,
			point: 1,
			count: 1,
			what: "solvedTech",
		};
	},
	computed: {
		...mapGetters({
			total: "GET_TOTAL_USER"
		})
	},
	beforeMount() {
		firebaseApp.db.collection("user").orderBy(this.what, "desc").limit(this.perPage).onSnapshot(data => {
			if(!data.empty) {
				this.count = 1;
				this.point = data.docs[0].data()[this.what];
				this.gold = !(data.docs[0].data()[this.what] === 0);
				var temp = {};
				data.docs.forEach(doc => {
					if (doc.data()[this.what] === this.point) {
						temp = doc.data();
						temp.rank = this.count;
						this.clients.push(temp);
					} else {
						this.point = doc.data()[this.what];
						this.count++;
						temp = doc.data();
						temp.rank = this.count;
						this.clients.push(temp);
					}
				});
				this.last = data.docs[data.docs.length - 1];
				this.isLoading = false;
			} else this.$buefy.toast.open({
				message: "Some error occured, please reload",
				type: "is-danger"
			});
		});
	},
	methods: {
		calcTime(start, end) {
			var ss = new Date();
			ss.setUTCSeconds(start);
			var ee = new Date();
			ee.setUTCSeconds(end);
			var ret = new Date();
			ret.setUTCSeconds(ee - ss);
			return ret.getMinutes() + " mins";
		},
		next (page) {
			this.page = page;
			this.isLoading = true;
			firebaseApp.db.collection("users").orderBy(this.what, "desc").startAfter(this.last).limit(this.perPage).onSnapshot(data => {
				if (!data.empty) {
					var temp = {};
					data.docs.forEach(doc => {
						if (doc.data()[this.what] === this.point) {
							temp = doc.data();
							temp.rank = this.count;
							this.clients.push(temp);
						} else {
							this.point = doc.data()[this.what];
							this.count++;
							temp = doc.data();
							temp.rank = this.count;
							this.clients.push(temp);
						}
					});
					this.last = data.docs[data.docs.length - 1];
					this.isLoading = false;
				}
			});
		}
	}
};
</script>