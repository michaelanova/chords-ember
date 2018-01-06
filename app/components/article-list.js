import Component from '@ember/component';

export default Component.extend({
  firebaseApp: Ember.inject.service(),
  session: Ember.inject.service(),
  store: Ember.inject.service(),
  currentUser: Ember.inject.service(),
  onlyUsersArticles: false,
  classNames: ['article-list'],
  onlyTitle: false,
  first: false,
  model: null,
  firstArticles: Ember.computed('model.@each', function() {
    return this.get('model').sortBy('createdAt').reverse().slice(0,5);
  }),
  admin: Ember.computed.alias('currentUser.user.admin'),
  actions: {
    delete(article) {
      article.destroyRecord().then(() => {
        console.log('Smazáno.');
      }, () => {
        console.log('Nesmazáno.');
      });
    }
  }
});
