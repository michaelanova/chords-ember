import DS from 'ember-data';

export default DS.Model.extend({
	name: DS.attr('string'),
	sleep: DS.attr('boolean'),
	host: DS.belongsTo('user', {inverse: 'guests'})

});
