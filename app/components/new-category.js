import Component from '@ember/component';

export default Component.extend({
  session: Ember.inject.service(),
  store: Ember.inject.service(),
  tagName: 'form',
  classNames: ['new-category'],
  actions: {
    saveCategory() {
      let name = this.get('name');
      let info = this.get('info');
      const newCategory = this.get('store').createRecord('category', { name: name, info:info});
      Ember.Logger.log(newCategory);
      newCategory.save();
    }
  }
});
