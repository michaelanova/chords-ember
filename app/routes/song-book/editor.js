import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

export default Route.extend({
  model(params) {
    return this.store.findRecord('song-book', params.book_id);
  },
});
