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
  this.route('signup');
  this.route('login');
  this.route('admin', function() {
    this.route('new-guest');
    this.route('new-task');
  });
});

export default Router;
