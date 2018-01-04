export function initialize(application) {
  // application.inject('route', 'foo', 'service:foo');
  application.inject('route', 'router', 'router:main');
  application.inject('component', 'router', 'router:main');
  application.inject('service', 'router', 'router:main');
}

export default {
  name: 'router',
  initialize
};
