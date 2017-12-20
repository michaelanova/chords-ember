import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  text: DS.attr('string'),
  addedBy: DS.belongsTo('user', { inverse: 'songsAdded' }),
  author: DS.belongsTo('author', { inverse: 'songs' }),
});
