import Route from '@ember/routing/route';
import Ember from 'ember';

export default Route.extend({
  firebaseApp: Ember.inject.service(),
  session: Ember.inject.service(),
  signInvisible: true,
  signUpvisible: false,
  beforeModel: function() {
    return this.get('session').fetch().catch(function() {});
  },
  actions: {
    signInOpen() {
      var controller = this.get('controller');
      controller.set('signInvisible', true);
      this.set('signInvisible', true);
    },
    signUpOpen() {
      this.set('signUpvisible', true);
      var controller = this.get('controller');
      controller.set('signUpvisible', true);
    },
    signIn: function(provider) {
      var controller = this.get('controller');
         var email = controller.get('identification');
         var password = controller.get('password');

      this.get('session').open('firebase', {
        provider: 'password',
        email: email,
        password: password}).then(function(data) {
        console.log(data.currentUser);
      });
      var controller = this.get('controller');
      controller.set('signInvisible', false);

    },
    signOut: function() {
      this.get('session').close();
    },
    signUp() {
      var controller = this.get('controller');
      var email = controller.get('email');
      var password = controller.get('password');
      let auth = this.get('firebaseApp').auth();
      auth.createUserWithEmailAndPassword(email, password).then(response => {
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
      var controller = this.get('controller');
      controller.set('signUpvisible', false);
    },
    modalClose() {
      var controller = this.get('controller');
      controller.set('signUpvisible', false);
      controller.set('signInvisible', false);
    }
  }
});
