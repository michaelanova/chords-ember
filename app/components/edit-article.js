import Component from '@ember/component';

export default Component.extend({
  firebaseApp: Ember.inject.service(),
  session: Ember.inject.service(),
  store: Ember.inject.service(),
  currentUser: Ember.inject.service(),
  onlyUsersArticles: false,
  classNames: ['article-list'],
  article:null,
  actions: {
    save() {
      console.log('***');
    }
  }
});
