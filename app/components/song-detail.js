import Component from '@ember/component';
import Ember from 'ember';

export default Component.extend({
  classNames: ['song-detail'],
  song: null,
  allChords: [],
  textWithSup: null,
  videoId: '',
  create(htmlStr) {
    var frag = document.createDocumentFragment(),
        temp = document.createElement('div');
    temp.innerHTML = htmlStr;
    while (temp.firstChild) {
      frag.appendChild(temp.firstChild);
    }
    return frag;
  },
  getVideoId() {
    let url = this.get('song.video')
    let positionId = url.search('=');
    let id = url.slice((positionId + 1), url.length);
    this.set('videoId', id);
  },
  init() {
    this._super(...arguments);
    let text = this.get('song.text');
    let chords = text.match(/\[.*?\]/g);
    this.set('allChords', chords);
    let withSup = text.replace(/\[/g, '<sup class="chord">');
    let withSup1 = withSup.replace(/\]/g, '</sup>')

    this.set('textWithSup', withSup1);

    var fragment = this.create(withSup1);
    Ember.run.scheduleOnce('afterRender', () => {
      var songBox = document.getElementById('song');
      songBox.appendChild(fragment);
    });
    if(this.get('song.video')) {
      this.getVideoId();
    }

    
  },

});
