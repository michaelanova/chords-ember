import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  songs: null,
  searchText: '',
  filteredSongs: computed('searchText', 'songs.[]', function() {
    //if (this.get('searchValue.length') >= this.get('searchLimit')) {
    console.log(this.get('songs').filterBy('name', this.get('searchText')));
    return this.get('songs').filterBy('name', this.get('searchText'));
    //return this.get('songs').filterBy('name', this.get('searchText'));
      //this.get('songs').mapBy('name').contains(this.get('searchText'));
    //}
  }),
});
