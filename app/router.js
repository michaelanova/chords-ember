import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('place');
  this.route('article');

  this.route('articles', function() {
    this.route('new');
    this.route('show');
  });
  this.route('signup');
  this.route('login');
  this.route('active-user');
});

export default Router;
