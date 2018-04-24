import DS from 'ember-data';

export default DS.Model.extend({
  username: DS.attr('string'),
  email: DS.attr('string'),
  admin: DS.attr('boolean'),
  guests: DS.hasMany('guest', {inverse: 'host'})
});
