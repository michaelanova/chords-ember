import Component from '@ember/component';

export default Component.extend({
  session: Ember.inject.service(),
  firebaseApp: Ember.inject.service(),
  store: Ember.inject.service(),
  //tagName: 'form',
  //formName: 'new-catgory',
  classNames: ['new-category'],
  //error: '',
  actions: {
    saveCategory() {
      let name = this.get('name');
      let info = this.get('info');
      const newCategory = this.get('store').createRecord('category', { name: name, info:info});


      //var newCategory = this.get('store').createRecord('category');
      //var nameOfImage = name+".jpg";
      Ember.Logger.log(newCategory);
      newCategory.save();

      var storage = this.get('firebaseApp').storage();
      var storageRef = storage.ref();
      //var imagesRef = storageRef.child('images');

      //var file = this.get('value');
//var uploadTask = storageRef.child('images/' + name).put(file);
      /*uploadTask.on(this.get('firebaseApp').storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
      function(snapshot) {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED: // or 'paused'
            console.log('Upload is paused');
            break;
          case this.get('firebaseApp').storage.TaskState.RUNNING: // or 'running'
            console.log('Upload is running');
            break;
        }
      }, function(error) {

      // A full list of error codes is available at
      // https://firebase.google.com/docs/storage/web/handle-errors
      switch (error.code) {
        case 'storage/unauthorized':
          // User doesn't have permission to access the object
          break;

        case 'storage/canceled':
          // User canceled the upload
          break;

        case 'storage/unknown':
          // Unknown error occurred, inspect error.serverResponse
          break;
      }
    }, function() {
      // Upload completed successfully, now we can get the download URL
      var downloadURL = uploadTask.snapshot.downloadURL;
    });*/

    }
  }
});
