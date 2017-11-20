import Route from '@ember/routing/route';
import Ember from 'ember';

export default Route.extend({
  firebaseApp: Ember.inject.service(),
  session: Ember.inject.service(),
  store: Ember.inject.service(),
  currentUser: Ember.inject.service(),
  signInvisible: true,
  signUpvisible: false,
  data: null,
  beforeModel: function() {
    return this.get('session').fetch().catch(function() {});
  },
  model() {
    if (this.get('session.isAuthenticated')) {
      return this.get('store').findRecord('user', this.get('currentUser.uid')).then(current => {
        this.setProperties({ data: current });
        return current;
      });
    }
  },
  actions: {
    signOut() {
      this.get('session').close();
    },
  }
});
