import Component from '@ember/component';
import { computed } from '@ember/object';
import Ember from 'ember';

export default Component.extend({
  store: Ember.inject.service(),
  //items: null,
  count: computed('model.@each', function() {
    return  this.get('model').length;
  }),
  model() {
    return this.get('store').findAll('song');
  },
});
