import Component from '@ember/component';

export default Component.extend({
  session: Ember.inject.service(),
  classNames: ['burger-menu'],
  linksVisible: false,
  actions: {
    toggle() {
      if (this.get('linksVisible')) {
        this.set('linksVisible', false);
      } else {
        this.set('linksVisible', true);
      }
    },
    signOut() {
      this.get('session').close();
    },
    close() {
      this.set('linksVisible', false);
    }
  }
});
