import { scheduleOnce } from '@ember/runloop';
import { observer } from '@ember/object';
import { alias, bool } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import Component from '@ember/component';

export default Component.extend({
  mediaPreview: service(),
  classNames: ['media-preview'],
  classNameBindings: ['isOpen:open'],
  media: alias('mediaPreview.media'),
  mediaObserver: observer('media', function() {
    scheduleOnce('afterRender', () => {
      if (this.get('media.isVideo')) {
        this.$('video')[0].load();
      }
    });
  }),
  isOpen: bool('media'),
  actions: {
    close() {
      this.set('media', null);
    }
  }
});
