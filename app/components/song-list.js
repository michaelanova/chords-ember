import Component from '@ember/component';

export default Component.extend({
  store: Ember.inject.service(),
  session: Ember.inject.service(),
  classNames: ['song-list'],
  first: false,
  firstLikes: false,
  model: null,
  uid:  Ember.computed.alias('session.currentUser.uid'),
  sortByName: Ember.computed('model.@each', function() {
    return this.get('model').sortBy('name');
  }),
  firstSongs: Ember.computed('model.@each', function() {
    return this.get('model').sortBy('createdAt').reverse().slice(0,5);
  }),
  firstSongsLikes: Ember.computed('model.@each','model.@each.likes', function() {
    return this.get('model').sortBy('likes').reverse().slice(0,5);
  }),
  /*isLiked: Ember.computed('model.likedBy@each.id', function() {
    let uid = this.get('uid');
    console.log(uid);
    console.log(uid);
    return this.get('model.likedBy').mapBy('id').contains(uid);
  })*/
});
