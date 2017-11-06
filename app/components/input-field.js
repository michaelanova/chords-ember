import Component from '@ember/component';

export default Component.extend({
  classNames: ['input-field'],
  classNameBindings: ['units:has-units'],
  type: 'text',
  model: null,
  attr: '',
  label: '',
  pattern: null,
  title: null,
  units: '',
  required: false,
  keyDown() {
  //  this.set('error', '');
  }
});
