import Component from '@ember/component';
import Ember from 'ember';
import { htmlSafe } from '@ember/string';
import $ from 'jquery';

export default Component.extend({
  store: Ember.inject.service(),
  session: Ember.inject.service(),
  classNames: ['song-detail'],
  classNameBindings: ['biggerText', 'smallerText'],
  song: null,
  allChords: [],
  uid:  Ember.computed.alias('session.currentUser.uid'),
  textWithSup: null,
  videoId: '',
  duration: 1900,
  biggerText: false,
  smallerText: false,
  animate: false,
  scrollSpeed: 0,
  top: 0,
  isSongBookOpen: false,
  isLiked: Ember.computed('song.likedBy.[]', 'uid', function() {
    return this.get('song.likedBy').mapBy('id').contains(this.get('uid'));
  }),
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


    let textComplete = htmlSafe(withSup1);
    this.set('textWithSup', textComplete);

    var fragment = this.create(withSup1);

    if(this.get('song.video')) {
      this.getVideoId();
    }
  },
  didInsertElement() {
    this._super(...arguments);
  },
  actions: {
    like(song) {
      this.get('store').findRecord('user', this.get('uid')).then((current) => {
        current.get('favourites').pushObject(song);
        song.get('likedBy').pushObject(current);
        current.save();
        song.save();
      });
    },
    unlike(song) {
      this.get('store').findRecord('user', this.get('uid')).then((current) => {
        current.get('favourites').removeObject(song);
        song.get('likedBy').removeObject(current);
        current.save();
        song.save();
      });
    },
    scroll(btn) {
    let headingHeight = $('.song-detail .heading').outerHeight();
    console.log(headingHeight );
    $("body, html").animate({ scrollTop: headingHeight }, 50, "linear");
    let songHeight = $('.song-detail .content .text .song').height();
    let scrollTo = songHeight + 160;

    if(btn == 1) {
      this.set('animate', 1);
      this.set('scrollSpeed', 250);
    } else if(btn == 2) {
      this.set('animate', 2);
      this.set('scrollSpeed', 150);
    } else {
      this.set('animate', 3);
      this.set('scrollSpeed', 100);
    }
    console.log(songHeight);
    console.log(scrollTo);
    console.log((this.get('scrollSpeed') * songHeight));
    $(".song-detail .content .text").stop();
    $(".song-detail .content .text").animate({ scrollTop: scrollTo }, (this.get('scrollSpeed') * songHeight), "linear");
    },
    stopScrolling() {
      this.set('animate', 0);
      $(".song-detail .content .text").stop();
      //console.log(position);
      //clearTimeout(animate);
    },
    topScroll() {
      this.set('animate', 0);
      $(".song-detail .content .text").stop();
      $(".song-detail .content .text").animate({ scrollTop: 0 }, 800, "linear");
      $("body, html").animate({ scrollTop: 0 }, 1000, "linear");

    },
    smaller() {
      this.set('biggerText', false);
      this.set('smallerText', true);

    },
    bigger() {
      this.set('smallerText', false);
      this.set('biggerText', true);
    }
  }
});
