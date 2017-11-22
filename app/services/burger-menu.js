
import Ember from 'ember';

export default Ember.Service.extend({
  isOpen: false,
  open() {
    this.set('isOpen', true);
    Ember.$('body').addClass('no-scroll');
  },
  close() {
    this.set('isOpen', false);
    Ember.$('body').removeClass('no-scroll');
  }
});
