import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
  session: Ember.inject.service(),
  uid:  Ember.computed.alias('session.currentUser.uid'),
  name: DS.attr('string'),
  text: DS.attr('string'),
  addedBy: DS.belongsTo('user', { inverse: 'songsAdded' }),
  author: DS.belongsTo('author', { inverse: 'songs' }),
  video: DS.attr('string'),
  likedBy: DS.hasMany('user', { inverse: 'favourites' }),
  likes: Ember.computed.alias('likedBy.length'),
});
