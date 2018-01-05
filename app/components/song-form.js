import Component from '@ember/component';

export default Component.extend({
  store: Ember.inject.service(),
  session: Ember.inject.service(),
  currentUser: Ember.inject.service(),
  tagName: 'form',
  classNames: ['song-form'],
  uid:  Ember.computed.alias('session.currentUser.uid'),
  song: null,
  authors: null,
  loading: false,
  init() {
    this._super(...arguments);
    this.setProperties({
      authors: this.get('store').findAll('author'),
    });
    let user = this.get('user');


  },
  submit() {
    this.set('loading', true);


    this.get('store').findRecord('user', this.get('uid')).then((current) => {
      this.get('song').set('addedBy',current);


      this.get('song').save().then((newSong) => {
        current.get('songsAdded').pushObject(newSong);
        current.save();
        //this.sendAction('transitionTo', 'registration.trucks');
        this.get('store').findRecord('author', this.get('song.author.id')).then(author => {
          author.get('songs').pushObject(newSong);
          author.save();
        });
      }, error => {
        //Ember.Logger.error(error);
      }).finally(() => {
        //this.set('loading', false);
      });
    });
    console.log(this.get('user'));



    return false;
  },
  actions: {
    showAuthor() {
      this.toggleProperty('authorVisible');
    }
  }
});
