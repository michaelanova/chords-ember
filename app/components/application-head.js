import Component from '@ember/component';

export default Component.extend({
  burgerMenu: Ember.inject.service(),
  session: Ember.inject.service(),
  classNames: ['head'],
  actions: {
    signOut() {
      this.get('session').close();
    },
    open() {
      this.get('burgerMenu').open();
    }
  }
});
