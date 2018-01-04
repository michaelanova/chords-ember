import DS from 'ember-data';

export default DS.Model.extend({
  username: DS.attr('string'),
  email: DS.attr('string'),
  articles: DS.hasMany('article'),
  admin: DS.attr('boolean'),
  songsAdded: DS.hasMany('song', { inverse: 'addedBy' }),
  favourites: DS.hasMany('song', { inverse: 'likedBy' })
});
