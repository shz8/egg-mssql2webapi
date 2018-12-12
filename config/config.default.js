'use strict';

/**
 * egg-mssql2webapi default config
 * @member Config#mssql2webapi
 * @property {String} SOME_KEY - some description
 */
exports.mssql2webapi = {
  urlprefix: '/api/',
  apitable: {
    emr: {// api/emr/
      db: {
        server: 'd.vy01.com',
        user: 'sa',
        password: 'test.123456',
        database: 'db1',
      },
      apis: [{
        name: 'getuser',
        sql: 'api_getuser',
        type: 'pro',
        result:'object'
      }, {
        name: 'findusers',
        sql: 'select * from users where objectstatus>0',
        type: 'sql',
        result:'array'
      }],
    },
    ris: {
      db: {},
      apis: [],
    },
  },
};
