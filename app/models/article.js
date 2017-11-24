import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
  category: DS.belongsTo('category'),
  cat: DS.attr('string'),
  title: DS.attr('string'),
  body: DS.attr('string'),
  user: DS.attr('string'),
  userName: DS.attr('string'),
  createdAt: DS.attr('date', { defaultValue() { return new Date(); } }),
  /*titleURL: DS.attr('string'),
  comments: DS.hasMany('comment' ),
  user: DS.belongsTo('user'),
  date: DS.attr('date')*/
});
