import Component from '@ember/component';

export default Component.extend({
  session: Ember.inject.service(),
  store: Ember.inject.service(),
  currentUser: Ember.inject.service(),
  classNames: ['article-list'],
  onlyTitle: false,
  filteredArticles: Ember.computed('model.articles', 'model.category', function() {
    let category = this.get('model.category.id');
    return this.get('model.articles').filter(function(item){
        return item.get('cat') == category;
    });
  }),
});
