import Route from '@ember/routing/route';
import Ember from 'ember';

export default Route.extend({
  firebaseApp: Ember.inject.service(),
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
    },
    signUp() {
      let auth = this.get('firebaseApp').auth();
      auth.createUserWithEmailAndPassword('nova@iquest.cz', 'kytara').then(response => {
        /*let user = this.get('user');
        user.set('id', response.uid);

        return user.save().then(() => {
          return this.get('session').fetch().then(() => {
            this.sendAction('transitionTo', 'challenges');
          });
        }, () => {
          this.setProperties({
            loading: false, error: this.get('i18n').t('user.submit_error')
          });
        });
      }, error => {
        this.setProperties({
          loading: false, error: this.get('i18n').t(`user.${error.code}`)
        });*/
      });
    }
  }
});
