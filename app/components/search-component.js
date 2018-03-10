import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import FindQuery from 'ember-emberfire-find-query/mixins/find-query';

export default Component.extend(FindQuery, {
  classNames: ['search'],
  songs: null,
  store: service(),
  searchText: '',
  foundSongs: null,
  filteredSongs: computed('searchText', 'songs.[]', 'store', function() {
    this.filterContains(this.get('store'), 'song', {'name': this.get('searchText')}, (posts) => {
      this.set('foundSongs', posts);
    });
  }),
});
