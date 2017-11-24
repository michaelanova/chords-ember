import Component from '@ember/component';

export default Component.extend({
  classNames: ['select-field'],
  model: null,
  selected: null,
  name: '',
  label: '',
  required: false,
  actions: {
    select(id) {
      this.set('selected', this.get('model').toArray().findBy('id', id));
    }
  }
});
