import Route from '@ember/routing/route';
import Ember from 'ember';

export default Route.extend({
  firebaseApp: Ember.inject.service(),
  session: Ember.inject.service(),
  store: Ember.inject.service(),
  currentUser: Ember.inject.service(),
  admin: Ember.computed.alias('currentUser.user.admin'),
  model() {
    return Ember.RSVP.hash({
      users: this.store.findAll('user'),
    });
  },
});
