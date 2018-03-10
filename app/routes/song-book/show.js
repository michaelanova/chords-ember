import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

export default Route.extend({
  session: Ember.inject.service(),
  isMarked: Ember.computed('model.markedBy.[]', 'uid', function() {
    return this.get('model.markedBy').mapBy('id').contains(this.get('uid'));
  }),
  uid:  Ember.computed.alias('session.currentUser.uid'),
  model(params) {
    return this.store.findRecord('song-book', params.book_id);
  },
  actions: {
    addMark(book) {
      this.get('store').findRecord('user', this.get('uid')).then((current) => {
        current.get('songBooksMarks').pushObject(book);
        book.get('markedBy').pushObject(current);
        current.save();
        book.save();
      });
    },
    unMark(book) {
      this.get('store').findRecord('user', this.get('uid')).then((current) => {
        current.get('songBooksMarks').removeObject(book);
        book.get('markedBy').removeObject(current);
        current.save();
        book.save();
      });
    },
  }
});
