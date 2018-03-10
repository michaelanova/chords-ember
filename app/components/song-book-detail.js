import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

export default Component.extend({
  store: service(),
  session: service(),
  classNames: ['song-book-detail'],
  book: null,
  uid:  Ember.computed.alias('session.currentUser.uid'),
  isMarked: Ember.computed('book.markedBy.[]', 'uid', function() {
    return this.get('book.markedBy').mapBy('id').contains(this.get('uid'));
  }),
  isAuthor: Ember.computed('book.createdBy.[]', 'uid', function() {
    return (this.get('book.createdBy.id') === this.get('uid')) ? true : false;
  }),
  admin: false,
  isUserAdmin: computed('uid', function() {
      this.get('store').findRecord('user', this.get('uid')).then(current => {
        console.log(current.get('admin'));
        return (current.get('admin')) ? this.set('admin', true) : this.set('admin', false);
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
    delete(song) {
      this.get('book').get('songs').removeObject(song);
      this.get('book').save();
      song.get('songBooks').removeObject(this.get('book'));
      song.save();
    }
  }
});
