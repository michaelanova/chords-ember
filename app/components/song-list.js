import Component from '@ember/component';

export default Component.extend({
  store: Ember.inject.service(),
  session: Ember.inject.service(),
  classNames: ['song-list'],
  first: false,
  model: null,
  uid:  Ember.computed.alias('session.currentUser.uid'),
  firstSongs: Ember.computed('model.@each', function() {
    return this.get('model').slice(0,5);
  }),
  /*isLiked: Ember.computed('model.likedBy@each.id', function() {
    let uid = this.get('uid');
    console.log(uid);
    console.log(uid);
    return this.get('model.likedBy').mapBy('id').contains(uid);
  })*/
});
