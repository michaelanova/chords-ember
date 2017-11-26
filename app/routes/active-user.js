import Route from '@ember/routing/route';

export default Route.extend({
  session: Ember.inject.service(),
    model(params) {
      //return this.store.findRecord('user', this.get('session.currentUser.uid'));
      return Ember.RSVP.hash({
        user: this.store.findRecord('user', this.get('session.currentUser.uid')),
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
