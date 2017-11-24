import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    //return this.get('store').findAll('category');
    return Ember.RSVP.hash({
      category: this.get('store').findAll('category'),
      //media: this.store.createRecord('media')
    });
  }
});
