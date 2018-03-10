import Component from '@ember/component';

export default Component.extend({
  session: Ember.inject.service(),
  store: Ember.inject.service(),
  classNames: ['song-book-form'],
  book: null,
  actions: {
    save() {
      this.get('book').save();
      history.back();
    }
  }
});
