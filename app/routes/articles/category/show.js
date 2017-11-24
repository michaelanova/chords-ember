import Route from '@ember/routing/route';
import DS from 'ember-data';

export default Route.extend({
  categoryArticles: null,
  store: Ember.inject.service(),

  model(params) {
    return Ember.RSVP.hash({
      articles: this.store.findAll('article'),
      category: this.store.findRecord('category', params.category_id)
    });
  }
});
