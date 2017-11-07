import Route from '@ember/routing/route';
import Ember from 'ember';

export default Route.extend({
  session: Ember.inject.service(),
  beforeModel: function() {
    return this.get('session').fetch().catch(function() {});
  },
  actions: {
    signIn: function(provider) {
      this.get('session').open('firebase', {
        provider: 'password',
        email: 'mmiissaann@seznam.cz',
        password: 'password'}).then(function(data) {
        console.log(data.currentUser);
      });
    },
    signOut: function() {
      this.get('session').close();
    }
  }
});
