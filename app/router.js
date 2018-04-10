import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  //back: Ember.inject.service(),
  location: config.locationType,
  rootURL: config.rootURL,
  /*pages: [],
  willTransition() {
    this.set('back.lastRoute', this.currentRouteName);
    console.log('currentRouteRouter',this.currentRouteName);
    console.log('lastRouteRouter',this.get('back.lastRoute'));
  },*/
});

Router.map(function() {
  this.route('place');
  this.route('article', function() {
    this.route('detail');
  });

  this.route('articles', function() {
    this.route('new');
    this.route('show');
    this.route('detail', { path: 'detail/:article_id' });
    this.route('edit', { path: 'edit/:article_id' });

    this.route('category', function() {
      this.route('show', { path: 'show/:category_id' });
      this.route('index');
    });

  });
  this.route('signup');
  this.route('login');
  this.route('active-user');
  this.route('profile', function() {
    this.route('show', { path: ':profile_id' });
    this.route('favourites', { path: 'favourites/:profile_id' });
  });

  this.route('category', function() {
    this.route('show', { path: 'show/:category_id' });
  });
  this.route('song', function() {
    this.route('new');
    this.route('edit', { path: 'edit/:song_id' });
    this.route('show', { path: 'show/:song_id' });
    this.route('author', function() {
      this.route('show', { path: 'show/:author_id' });
    });
  });
  this.route('add-new');
  this.route('search');
  this.route('song-book', function() {
    this.route('index');
    this.route('show', { path: 'show/:book_id' });
    this.route('edit', { path: 'edit/:book_id' });
    this.route('editor', { path: 'editor/:book_id' });
  });
  this.route('marks');
  this.route('how-it-works');
});

export default Router;
