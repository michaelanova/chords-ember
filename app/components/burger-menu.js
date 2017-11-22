import Component from '@ember/component';

export default Component.extend({
  session: Ember.inject.service(),
  burgerMenu: Ember.inject.service(),
  classNames: ['burger-menu'],
  classNameBindings: ['isOpen'],
  isOpen: Ember.computed.alias('burgerMenu.isOpen'),
  user: Ember.computed.alias('currentUser.user'),
  actions: {
    open() {
      this.get('burgerMenu').open();
    },
    close() {
      this.get('burgerMenu').close();
    },
    transitionTo() {
      this.get('burgerMenu').close();
      this.sendAction('transitionTo', ...arguments);
    },
    signOut() {
      this.get('session').close().then(() => {
        this.get('store').unloadAll();
        this.replaceWith('index');
      });
    }
  }
});
