/* eslint-env node */
'use strict';

module.exports = function(/* environment, appConfig */) {
  // See https://github.com/san650/ember-web-app#documentation for a list of
  // supported properties

  return {
    name: "Chords.cz",
    short_name: "Chords",
    description: "Web app for managing chords.",
    start_url: "/",
    display: "standalone",
    background_color: "#fff",
    theme_color: "#000",
    icons: [
      src: "/images/icons/icon.png",
      sizes: "128x128",
      type: "image/png"
    ],
    apple: {
      statusBarStyle: 'black'
    },
    ms: {
      tileColor: '#fff'
    }
  };
}
