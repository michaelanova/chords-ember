import Component from '@ember/component';

export default Component.extend({
  firebaseApp: Ember.inject.service(),
  session: Ember.inject.service(),
  store: Ember.inject.service(),
  currentUser: Ember.inject.service(),
  onlyUsersArticles: false,
  classNames: ['article-list'],
  song:null,
  actions: {
    save() {
      this.get('song').save();
      history.back();
    }
  }
});
