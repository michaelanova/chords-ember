import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

export default Component.extend({
  store: service(),
  session: service(),
  classNames: ['song-book-detail'],
  book: null,
  isMarked: Ember.computed('book.markedBy.[]', 'uid', function() {
    return this.get('book.markedBy').mapBy('id').contains(this.get('uid'));
  }),
  uid:  Ember.computed.alias('session.currentUser.uid'),
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
