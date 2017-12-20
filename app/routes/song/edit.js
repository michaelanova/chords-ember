import Route from '@ember/routing/route';

export default Route.extend({
  model(params) {
    return this.store.findRecord(
      'song', params.truck_id, { include: 'author' }
    );
  },
});
