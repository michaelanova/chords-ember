import Route from '@ember/routing/route';

export default Route.extend({
  session: Ember.inject.service(),
  store: Ember.inject.service(),
  model(params) {
    //return this.store.findRecord('user', params.profile_id);
    return Ember.RSVP.hash({
      user: this.store.findRecord('user', params.profile_id),
      article: this.store.findAll('article'),
    });
  },
});
