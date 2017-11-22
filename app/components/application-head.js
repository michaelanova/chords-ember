import Component from '@ember/component';

export default Component.extend({
  session: Ember.inject.service(),
  classNames: ['head'],
  actions: {
    signOut() {
      this.get('session').close();
    },
  }
});
