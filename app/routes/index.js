import Route from '@ember/routing/route';
import Ember from 'ember';
import Component from '@ember/component';
import { computed } from '@ember/object';

export default Route.extend({
  back: Ember.inject.service(),
  model() {
    return Ember.RSVP.hash({
      users: this.store.findAll('user'),
      //authors: this.store.findAll('author'),
      //songs: this.store.findAll('song'),
      //articles: this.store.findAll('article'),
    });
  },
  didTransition() {
    this.set('back.backVisible', false);
  },
  willTransition() {
    this.set('back.backVisible', true);
  },

});
