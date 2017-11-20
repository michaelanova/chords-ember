import Controller from '@ember/controller';

export default Controller.extend({
  responseMessage: '',
  title: '',
  body: '',
  uid: Ember.computed.alias('session.currentUser.uid'),
  userName: Ember.computed.alias('session.currentUser.displayName'),

  /*isValid: Ember.computed.match('title', /^.$/),
  isDisabled: Ember.computed.not('isValid'),*/

  actions: {

    savePost() {
      const title = this.get('title');
      const body = this.get('body');
      const uid = this.get('uid');
      const userName = this.get('userName');



      const newArticle = this.store.createRecord('article', { title: title, body:body, user: uid, userName: userName});
      Ember.Logger.log(newArticle);
      newArticle.save();

      this.set('responseMessage', `Thank you! We have just saved your post: ${this.get('title')}`);
      this.set('title', '');
      this.set('body', '');
    }
  }
});
