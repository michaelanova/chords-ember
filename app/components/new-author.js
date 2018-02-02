import Component from '@ember/component';

export default Component.extend({
  session: Ember.inject.service(),
  firebaseApp: Ember.inject.service(),
  store: Ember.inject.service(),
  error: '',
  classNames: ['new-category'],
  actions: {
    save() {
      let name = this.get('authName');
      let info = this.get('authInfo');
      var file = document.forms['new-category']['image-input'].files[0];
      console.log('name',name);
      console.log('info',info);

      var fsize = document.forms['new-category']['image-input'].files[0].size;

      if(fsize>524288) {
        this.set('error', 'Vyberte soubor menší než 500kb');
      }else{
        this.set('error', null);
          const newAuthor = this.get('store').createRecord('author', { name: name, info:info, photo:name});

          Ember.Logger.log(newAuthor);
          newAuthor.save();

          var storage = this.get('firebaseApp').storage();
          var storageRef = storage.ref();

          var uploadTask = storageRef.child('images/author/' + name).put(file);
        }
    }
  }
});
