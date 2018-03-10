import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import FindQuery from 'ember-emberfire-find-query/mixins/find-query';

export default Route.extend(FindQuery, {
  session: Ember.inject.service(),
  uid:  Ember.computed.alias('session.currentUser.uid'),
  data: null,
  user: Ember.computed('uid', 'data', function() {
      let uid = this.get('uid'),
          data = this.get('data');

      if (!uid) { return null; }
      else if (data) { return data; }

      return this.store.findRecord('user', uid).then(current => {
        this.setProperties({ data: current });
        console.log(current.id);
        return current;
      });
    }),
  model() {
    return this.store.findRecord('user', this.get('uid'));
  }
});
