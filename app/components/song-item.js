import Component from '@ember/component';

export default Component.extend({
  store: Ember.inject.service(),
  session: Ember.inject.service(),
  session: Ember.inject.service(),
  currentUser: Ember.inject.service(),
  classNames: ['song-list'],
  first: false,
  song: null,
  admin: Ember.computed.alias('currentUser.user.admin'),
  uid:  Ember.computed.alias('session.currentUser.uid'),
  isLiked: Ember.computed('song.likedBy', 'uid', function() {
    return this.get('song.likedBy').mapBy('id').contains(this.get('uid'));
  }),
  actions: {
    like(song) {
      this.get('store').findRecord('user', this.get('uid')).then((current) => {
        current.get('favourites').pushObject(song);
        song.get('likedBy').pushObject(current);
        current.save();
        song.save();
      });
    },
    unlike(song) {
      this.get('store').findRecord('user', this.get('uid')).then((current) => {
        current.get('favourites').removeObject(song);
        song.get('likedBy').removeObject(current);
        current.save();
        song.save();
      });
    },
    delete() {
      this.get('song').destroyRecord();
    }
  }
});
