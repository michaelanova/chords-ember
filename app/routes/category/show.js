import Route from '@ember/routing/route';

export default Route.extend({
  model(params) {
    return Ember.RSVP.hash({
      articles: this.store.findAll('article').then(allArticles => {
        return allArticles.findBy('cat', params.category_id);
      }),
      category: this.store.findRecord('category', params.category_id)
    });
  }
});
