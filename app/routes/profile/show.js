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
  actions: {
    didTransition() {
      Ember.run.scheduleOnce('afterRender', () => {
        let profileHeight = Ember.$('.profil').outerHeight();
        console.log(profileHeight);
        Ember.$('.scrolling-box').css({"top": profileHeight});
      });
    }
  }
});
