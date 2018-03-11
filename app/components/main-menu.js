import Component from '@ember/component';

export default Component.extend({
  session: Ember.inject.service(),
  classNames: ['mobile-menu'],
});
