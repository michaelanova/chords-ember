import DS from 'ember-data';

export default DS.Model.extend({
  articles: DS.hasMany('article'),
  name: DS.attr('string'),
  info: DS.attr('string'),
  //image: DS.attr('string')
});
