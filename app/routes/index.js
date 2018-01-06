import Route from '@ember/routing/route';
import Ember from 'ember';
import Component from '@ember/component';

export default Route.extend({
  back: Ember.inject.service(),

  model() {
    return Ember.RSVP.hash({
      users: this.store.findAll('user'),
      songs: this.store.findAll('song'),
      articles: this.store.findAll('article'),
    });
  },
  didTransition() {
    this.set('back.backVisible', false);
  },
  willTransition() {
    this.set('back.backVisible', true);
  },

});
