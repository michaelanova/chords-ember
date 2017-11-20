import Route from '@ember/routing/route';

export default Route.extend({
  session: Ember.inject.service(),
  /*model(params) {
        return this.store.query('user', {
            orderBy: 'username',
            equalTo: params.username
        }).then((model) => model.get('firstObject'))
    },*/
    model() {
      return this.store.findRecord('user', this.get('session.currentUser.uid'));
    },
  titleToken(model) {
      return 'User - ' + model.get('username');
  }
});
