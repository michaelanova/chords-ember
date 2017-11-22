import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
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
  });
  this.route('signup');
  this.route('login');
  this.route('active-user');
  this.route('profile', function() {
    this.route('show', { path: ':profile_id' });
  });
});

export default Router;
