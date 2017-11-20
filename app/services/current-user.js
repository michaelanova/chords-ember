import Service from '@ember/service';
import Ember from 'ember';

export default Service.extend({
  store: Ember.inject.service(),
  session: Ember.inject.service(),

  uid: Ember.computed.alias('session.currentUser.uid'),
  data: null,
  notifications: null,
  notificationsCount: Ember.computed.alias('notifications.length'),
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
  unload() {
    this.set('data', null);
  }
});
