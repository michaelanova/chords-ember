import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  books: null,
  sortedBooks: computed('books.[]', function() {
    return this.get('books').sortBy('songsLength').reverse();
  }),
  adminPanel: false
});
