import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
  name: DS.attr('string'),
  info: DS.attr('string'),
  photo: DS.attr('string'),
  songs: DS.hasMany('song', { inverse: 'author' }),
  count: Ember.computed.alias('songs.length'),
});
