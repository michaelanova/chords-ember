/* eslint-env node */
'use strict';

module.exports = function(environment) {
  let ENV = {
    modulePrefix: 'test-ember',
    environment,
    rootURL: '',
    locationType: 'auto',
    firebase: {
      apiKey: "AIzaSyAxZYJYfhVDEAZ5GgF5B_ozqJj_2j033c8",
      authDomain: "wedding-c803a.firebaseapp.com",
      databaseURL: "https://wedding-c803a.firebaseio.com",
      projectId: "wedding-c803a",
      storageBucket: "wedding-c803a.appspot.com",
      messagingSenderId: "1040464891283"
    },
    cloudinary: {
      uploadPreset: {
        image: process.env.CLOUDINARY_IMAGE,
        video: process.env.CLOUDINARY_VIDEO
      },
      url:  "https://res.cloudinary.com/ember-base/image"
    },
    torii: {
      sessionServiceName: 'session'
    },
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {
    // here you can enable a production-specific feature
  }

  return ENV;
};
