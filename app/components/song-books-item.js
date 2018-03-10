import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

export default Component.extend({
  store: service(),
  session: service(),
  classNames: ['song-book-detail'],
  book: null,
  adminPanel: false,
  uid:  Ember.computed.alias('session.currentUser.uid'),
  isAuthor: Ember.computed('book.createdBy.[]', 'uid', function() {
    return (this.get('book.createdBy.id') === this.get('uid')) ? true : false;
  }),
  isMarked: Ember.computed('book.markedBy.[]', 'uid', function() {
    return this.get('book.markedBy').mapBy('id').contains(this.get('uid'));
  }),
  data: null,
  isUserAdmin: computed('uid', function() {
      this.get('store').findRecord('user', this.get('uid')).then(current => {
        return (current.admin) ? true : false;
      });
  }),
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
    delete() {
      this.get('book').destroyRecord();
    }
  }
});
