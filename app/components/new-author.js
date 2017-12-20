import Component from '@ember/component';

export default Component.extend({
  session: Ember.inject.service(),
  firebaseApp: Ember.inject.service(),
  store: Ember.inject.service(),

  classNames: ['new-category'],
  actions: {
    save() {
      let name = this.get('authName');
      let info = this.get('authInfo');
      var file = document.forms['new-category']['image-input'].files[0];
      console.log('name',name);
      console.log('info',info);
      console.log('name',file);
      const newAuthor = this.get('store').createRecord('author', { name: name, info:info, photo:name});

      Ember.Logger.log(newAuthor);
      newAuthor.save();

      var storage = this.get('firebaseApp').storage();
      var storageRef = storage.ref();

      var uploadTask = storageRef.child('images/author/' + name).put(file);

    }
  }
});
