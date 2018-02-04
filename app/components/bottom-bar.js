import Component from '@ember/component';

export default Component.extend({
  store: Ember.inject.service(),
  session: Ember.inject.service(),
  uid:  Ember.computed.alias('session.currentUser.uid'),
  classNames: ['bottom-bar', 'container'],
});
