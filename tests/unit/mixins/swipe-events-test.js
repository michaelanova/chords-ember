import EmberObject from '@ember/object';
import SwipeEventsMixin from 'test-ember/mixins/swipe-events';
import { module, test } from 'qunit';

module('Unit | Mixin | swipe events');

// Replace this with your real tests.
test('it works', function(assert) {
  let SwipeEventsObject = EmberObject.extend(SwipeEventsMixin);
  let subject = SwipeEventsObject.create();
  assert.ok(subject);
});
