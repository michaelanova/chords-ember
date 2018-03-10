import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
  name: DS.attr('string'),
  description: DS.attr('string'),
  createdBy: DS.belongsTo('user', { inverse: 'songBooksAdded' }),
  markedBy: DS.hasMany('user', { inverse: 'songBooksMarks' }),
  songs: DS.hasMany('song', { inverse: 'songBooks' }),
  songsLength: Ember.computed.alias('songs.length'),
  markedLength: Ember.computed.alias('markedBy.length'),
});
