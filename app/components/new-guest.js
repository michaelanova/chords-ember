import Component from '@ember/component';

export default Component.extend({
	sleep: false,
	guest: null,
	users: null,
	actions: {
		setSleep() {
			this.get('sleep') ? this.set('sleep', false) : this.set('sleep', true);
		},
		save() {
			let guest = this.get('guest');
			guest.setProperties({ sleep: this.get('sleep') });
			console.log(this.get('guest'));
			guest.save();
			/*this.get('guest.host.guests').pushObject(this.get('guest'));  pridat hosta do seznamu k uživateli
			console.log(this.get('guest').get('host'));
			let user = this.get('guest').get('host');
			user.save();*/ 
		}
	}
});
