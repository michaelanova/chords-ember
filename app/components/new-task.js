import Component from '@ember/component';

export default Component.extend({
	completed: false,
	task: null,
	solution: '',
	actions: {
		setCompleted() {
			this.get('completed') ? this.set('completed', false) : this.set('completed', true);
		},
		save() {
			let task = this.get('task');
			task.setProperties({ sleep: this.get('sleep') });
			console.log(this.get('task'));
			task.save();
			/*this.get('task.host.tasks').pushObject(this.get('task'));  pridat hosta do seznamu k uživateli
			console.log(this.get('task').get('host'));
			let user = this.get('task').get('host');
			user.save();*/ 
		}
	}
});
