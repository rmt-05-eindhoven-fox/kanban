<template>
	<div>
		<b-modal id="bv-modal-example" hide-footer>
    	<b-form @submit.prevent="addTask" @reset.prevent="onReset">
				<b-form-group
					id="input-group1"
					label="Title:"
					label-for="input-1"
				>
					<b-form-input
					id="input-1"
					v-model="title"
					type="text"
					></b-form-input>
				</b-form-group>

				<b-form-group
					id="input-group2"
					label="Description:"
					label-for="input-2"
				>
					<b-form-textarea
					id="input-2"
					v-model="description"
					type="text"
					></b-form-textarea>
				</b-form-group>
				<b-button @click="$bvModal.hide('bv-modal-example')" type="submit" variant="primary">Submit</b-button>
      	<b-button @click="$bvModal.hide('bv-modal-example')" type="reset" variant="danger">Reset</b-button>
			</b-form>
  	</b-modal>
	</div>		
</template>

<script>
export default {
	name: 'AddPage',
	data() {
		return {
			title: '',
			description: ''
		}
	},
	methods: {
		addTask() {
			const payload = {
				title: this.title,
				description: this.description
			}
			this.$emit('addTask', payload)
			this.onReset()
		},
		onReset() {
      // Reset our form values
      this.title = ''
			this.description = ''
    }
	},
	created() {
		this.show = true
	}	
}
</script>

<style>

</style>