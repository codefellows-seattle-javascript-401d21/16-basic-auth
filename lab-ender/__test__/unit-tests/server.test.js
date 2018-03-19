'use strict';

const server = require('../../lib/server');
require('jest');

describe('server testing', function() {
  beforeEach(server.start);
  afterEach(server.stop);

  it('should return an err when started twice', () => {
    server.start()
      .catch(err => expect(err).toBeInstanceOf(Error));
  });
});
