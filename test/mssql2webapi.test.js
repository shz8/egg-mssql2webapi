'use strict';

const mock = require('egg-mock');

describe('test/mssql2webapi.test.js', () => {
  let app;
  before(() => {
    app = mock.app({
      baseDir: 'apps/mssql2webapi-test',
    });
    return app.ready();
  });

  after(() => app.close());
  afterEach(mock.restore);

  it('should GET /', () => {
    return app.httpRequest()
      .get('/')
      .expect('hi, mssql2webapi')
      .expect(200);
  });
});
