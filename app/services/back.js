import Service from '@ember/service';

export default Service.extend({
  router: Ember.inject.service(),
  backVisible: true,
  lastRoute: '',
    goBack() {
      history.go(-1);
      this.preventDefault();
    }
});
