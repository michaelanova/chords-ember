import Component from '@ember/component';

export default Component.extend({
  store: Ember.inject.service(),
  tagName: 'form',
  classNames: ['truck-form'],
  song: null,
  authors: null,
  loading: false,
  init() {
    this._super(...arguments);
    this.setProperties({
      authors: this.get('store').findAll('author'),
    });
  },
  submit() {
    this.set('loading', true);

    this.get('song').save().then((newSong) => {
      //this.sendAction('transitionTo', 'registration.trucks');
      console.log(this.get('song.author.id'));
      this.get('store').findRecord('author', this.get('song.author.id')).then(author => {
        author.get('songs').pushObject(newSong);
        author.save();
      });
    }, error => {
      //Ember.Logger.error(error);
    }).finally(() => {
      //this.set('loading', false);
    });

    return false;
  },
  actions: {
    showAuthor() {
      this.toggleProperty('authorVisible');
    }
  }
});
