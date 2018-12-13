# egg-mssql2webapi

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![David deps][david-image]][david-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/egg-mssql2webapi.svg?style=flat-square
[npm-url]: https://npmjs.org/package/egg-mssql2webapi
[travis-image]: https://img.shields.io/travis/eggjs/egg-mssql2webapi.svg?style=flat-square
[travis-url]: https://travis-ci.org/eggjs/egg-mssql2webapi
[codecov-image]: https://img.shields.io/codecov/c/github/eggjs/egg-mssql2webapi.svg?style=flat-square
[codecov-url]: https://codecov.io/github/eggjs/egg-mssql2webapi?branch=master
[david-image]: https://img.shields.io/david/eggjs/egg-mssql2webapi.svg?style=flat-square
[david-url]: https://david-dm.org/eggjs/egg-mssql2webapi
[snyk-image]: https://snyk.io/test/npm/egg-mssql2webapi/badge.svg?style=flat-square
[snyk-url]: https://snyk.io/test/npm/egg-mssql2webapi
[download-image]: https://img.shields.io/npm/dm/egg-mssql2webapi.svg?style=flat-square
[download-url]: https://npmjs.org/package/egg-mssql2webapi

将mssql的sql、pro转为webapi

## Install

```bash
$ npm i egg-mssql2webapi --save
```

## Usage

```js
// {app_root}/config/plugin.js
exports.mssql2webapi = {
  enable: true,
  package: 'egg-mssql2webapi',
};
```

## Configuration

```js
// {app_root}/config/config.default.js
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
        name: 'getuser', //http://127.0.0.1:7001/api/emr/getuser?usercode=2
        sql: 'api_getuser',
        type: 'pro',
        result:'object'
      }, {
        name: 'findusers',//http://127.0.0.1:7001/api/emr/findusers
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
```
http://127.0.0.1:7001/api/emr/getuser?usercode=2   
http://127.0.0.1:7001/api/emr/findusers   
see [config/config.default.js](config/config.default.js) for more detail.

## Example

<!-- example here -->

## Questions & Suggestions

Please open an issue [here](https://github.com/eggjs/egg/issues).

## License

[MIT](LICENSE)
