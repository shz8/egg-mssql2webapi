let mssql = require('mssql');
let apitable;
module.exports = {
  async apiSort() {
    if (apitable && apitable.length > 0) {
      apitable = apitable.sort((a, b) => {
        if (a.path && b.path) {
          return b.path.length - a.path.length;
        }
        return 0;
      })
    }
  },
  async initapiTable(ctx) {
    if (!apitable) {
      apitable = [];
      if (ctx.app.config.mssql2webapi) {
        let urlprefix = ctx.app.config.mssql2webapi.urlprefix || '';
        urlprefix = '/' + this.trim(urlprefix,'/');
        if (urlprefix.length > 1)urlprefix += '/';
        if (ctx.app.config.mssql2webapi.apitable) {
          for (let k in ctx.app.config.mssql2webapi.apitable) {
            let tb = ctx.app.config.mssql2webapi.apitable[k];
            let db = tb.db;
            let fpath = urlprefix + k + '/';
            for (let idx = 0; idx < tb.apis.length; idx++) {
              let path = fpath + tb.apis[idx].name;
              apitable.push({ path, api: tb.apis[idx], db })
            }
          }
          await this.apiSort();
        }
      }
    }
    console.log(apitable)
    return apitable;
  },
  async getapi(ctx) {
    for (let idx = 0; idx < apitable.length; idx++) {
      if (ctx.url.toLowerCase().indexOf(this.trim(apitable[idx].path.toLowerCase(),' ')) == 0) {
        return apitable[idx];
      }
    }
    return null;
  },
  async exesql(api, ctx) {
    // TODO:pro/webapi/webservice，过滤无效的sql、pro参数
    let pool = await this.getClient(api.db);
    let request = new mssql.Request(pool);
    let rlt;
    try {
      let data = {};
      if (ctx.request.body) {
        Object.assign(data, ctx.request.body);
      }
      if (ctx.query) {
        Object.assign(data, ctx.query);
      }
      console.log(api.api.sql, data)
      if(data){
          for(let k in data){
              request.input(k,data[k])
          }
      }
      if (api.api.type == 'sql') {
        rlt = await request.query(api.api.sql);
      } else if (api.api.type == 'pro') {
        rlt = await request.execute(api.api.sql);
      } else {
        return api;
      }
    } catch (err) {
      ctx.logger.error(err)
    }
    pool && pool.close();
    if (rlt.recordsets) {
      return await this.convertData(api.api, rlt.recordsets);
    }
    return rlt;
  },
  async convertData(api, data) {
    if (api.result == 'array') {
      if (data.length > 0) {
        return data[0]
      } else {
        return [];
      }
    } else if (api.result == 'object') {
      if (data.length > 0 && data[0].length > 0) {
        return data[0][0]
      } else {
        return {};
      }
    }
    return data;
  },
  async getClient(cfg) {
    const pool = new mssql.ConnectionPool(cfg);
    const client = await pool.connect();

    pool.on('error', (err) => {
      console.log('mssqlpool', err);
    });

    mssql.on('error', (err) => {
      console.log('mssqlglobal', err);
    });
    return client;
  },
  trimend(str, c) {
    if (c == null || c == "") {
      var str = this;
      var rg = /s/;
      var i = str.length;
      while (rg.test(str.charAt(--i)));
      return str.slice(0, i + 1);
    } else {
      var str = this;
      var rg = new RegExp(c);
      var i = str.length;
      while (rg.test(str.charAt(--i)));
      return str.slice(0, i + 1);
    }
  },
  trim(str,c) {
    if (c == null || c == "") {
        str = str.replace(/^s*/, '');
        var rg = /s/;
        var i = str.length;
        while (rg.test(str.charAt(--i)));
        return str.slice(0, i + 1);
    }
    else {
        var rg = new RegExp("^" + c + "*");
        str = str.replace(rg, '');
        rg = new RegExp(c);
        var i = str.length;
        while (rg.test(str.charAt(--i)));
        return str.slice(0, i + 1);
    }
  }
}
