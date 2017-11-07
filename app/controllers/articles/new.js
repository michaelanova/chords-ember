import Controller from '@ember/controller';

export default Controller.extend({
  responseMessage: '',
  title: '',
  body: '',

  /*isValid: Ember.computed.match('title', /^.$/),
  isDisabled: Ember.computed.not('isValid'),*/

  actions: {

    savePost() {
      const title = this.get('title');
      const body = this.get('body');



      const newArticle = this.store.createRecord('article', { title: title, body:body });
      Ember.Logger.log(newArticle);
      newArticle.save();

      this.set('responseMessage', `Thank you! We have just saved your post: ${this.get('title')}`);
      this.set('title', '');
      this.set('body', '');
    }
  }
});
