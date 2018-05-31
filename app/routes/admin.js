import Route from '@ember/routing/route';
import { hash } from 'rsvp';

export default Route.extend({
	model() {
		return hash({
	      	guests: this.store.findAll('guest'),
	      	tasks: this.store.findAll('task')
	    });
	},
	actions: {
		deleteGuest(selectedGuest) {
			selectedGuest.destroyRecord();
		}
	}
});
