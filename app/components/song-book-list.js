import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
  classNames: ['song-book-list'],
  session: Ember.inject.service(),
  store: Ember.inject.service(),
  uid:  Ember.computed.alias('session.currentUser.uid'),
  data: null,
  song: null,
  name: '',
  description: '',
  isnewSongBookFormOpen: false,
  user: Ember.computed('uid', 'data', function() {
    let uid = this.get('uid'),
        data = this.get('data');

    if (!uid) { return null; }
    else if (data) { return data; }

    return this.get('store').findRecord('user', uid).then(current => {
      this.setProperties({ data: current });
      return current;
    });
  }),
  beforeModel() {
    return this.get('store').createRecord('song-book');
  },
  model() {
    return this.get('store').findRecord('user', this.get('session.currentUser.uid'))
  },
  actions: {
    newSongBookForm() {
      (this.get('isnewSongBookFormOpen')) ? this.set('isnewSongBookFormOpen', false) : this.set('isnewSongBookFormOpen', true);
    },
    saveSongBook() {
      let songBook = this.get('store').createRecord('song-book', { name: this.get('name'), description: this.get('description'), createdBy: this.get('user')});
      songBook.save();
      this.get('user').get('songBooksAdded').pushObject(songBook);
      this.get('user').save();
    },
    addToSongBook(songBook) {
      console.log(songBook);
      songBook.get('songs').pushObject(this.get('song'));
      songBook.save();
      this.get('song').get('songBooks').pushObject(songBook);
      this.get('song').save();
      this.set('isnewSongBookFormOpen', false);
    }
  }
});
