'use strict';

const assert = require('assert');

module.exports = (app) => {
  const index = app.config.appMiddleware.indexOf('mssql2webapi');
  assert.equal(index, -1, 'Duplication of middleware name found: mssql2webapi. Rename your middleware other than "mssql2webapi" please.');
  app.config.coreMiddleware.unshift('mssql2webapi');
  app.beforeStart(async () => {
    
  });
  app.ready(async (err) => {
    if (err) throw err;
    //await app.runSchedule('update_cache');
  });
};
