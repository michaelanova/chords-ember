import Component from '@ember/component';

export default Component.extend({
  classNames: ['song-list'],
  first: false,
  model: null,
  firstSongs: Ember.computed('model.@each', function() {
    return this.get('model').slice(0,5);
  }),
});
