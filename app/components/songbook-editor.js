import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

export default Component.extend({
  store: service(),
  session: service(),
  classNames: ['song-book-editor', 'print', 'fullWidth'],
  classNameBindings: ['style', 'format'],
  book: null,
  print: true,
  fullWidth: false,
  style: 'retro',
  format: 'a4',
  actions: {
    setStyle(style) {
      this.set('style', style);
    },
    setFormat(format) {
      this.set('format', format);
    },
    printPage() {
      window.print();
    },
    fullwidth() {
      this.get('fullWidth') ? this.set('fullWidth', false) : this.set('fullWidth', true);
    }
  }
});
