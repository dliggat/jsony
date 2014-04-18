var require = {
  deps: [ 'bower/poly/all' ],
  shim: {
    "rsvp": {
      "exports": "RSVP"
    }
  },
  paths: {
    'rsvp': '/lib/bower/rsvp/rsvp',
    'bower': '/lib/bower/'
  },
  // enforceDefine: true,
  // packages: [
  //   'rsvp',
  //   {
  //     name: 'rsvp',
  //     location: '/lib/bower/rsvp',
  //     main: 'rsvp.amd'
  //   }
  // ]
};
