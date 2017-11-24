import Component from '@ember/component';

export default Component.extend({
  firebaseApp: Ember.inject.service(),
  model: null,
  imageUrl: '',
  /*init() {
    this._super(...arguments);
    var storage = this.get('firebaseApp').storage();
    var storageRef = storage.ref();
    var imageRef = storageRef.child('images/' + this.get('name'));
    imageRef.getDownloadURL().then(function(url) {
      this.set('imageUrl', url);
    });
  },*/
  downloadUrl: Ember.computed('model.category', function() {
    let category = this.get('model.category.name');
    //this._super(...arguments);
    var storage = this.get('firebaseApp').storage();
    var storageRef = storage.ref();
    var imageRef = storageRef.child('images/' + category);
    return imageRef.getDownloadURL().then(function(url) {
      console.log(url);
      var image_element = document.createElement("img"); // create the new image object
      image_element.src = url;
      document.getElementById('image-container').appendChild(image_element); // add the new image to the div
   })
  }),
});
