import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

export default Component.extend({
  store: service(),
  session: service(),
  classNames: ['song-book-editor', 'print'],
  classNameBindings: ['style', 'format'],
  book: null,
  print: true,
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
    }
  }
});
