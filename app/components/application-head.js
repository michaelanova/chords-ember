import Component from '@ember/component';

export default Component.extend({
  burgerMenu: Ember.inject.service(),
  session: Ember.inject.service(),
  classNames: ['head'],
  backVisible: true,
  didInsertElement() {
    let currentRoute = this.get('router.currentRouteName');
    console.log(currentRoute);
    if(currentRoute == 'index') {
      this.set('backVisible', false);
    } else {
      this.set('backVisible', true);
    }
  },
  willUpdate() {
    let currentRoute = this.get('router.currentRouteName');
    console.log(currentRoute);
    if(currentRoute == 'index') {
      this.set('backVisible', false);
    } else {
      this.set('backVisible', true);
    };
    console.log(this.get('backVisible'));
  },
  actions: {
    signOut() {
      this.get('session').close();
    },
    open() {
      this.get('burgerMenu').open();
    },
    back() {
      history.back();
    }
  }
});
