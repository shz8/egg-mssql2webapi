const url = require('url')
const util = require('../../lib/utils');
let apitable;
module.exports = options => async function httpproxy(ctx, next) {
  apitable = await util.initapiTable(ctx);
  
  if (apitable) {
    let api = await util.getapi(ctx);
    if (api) {
        console.log(api);
        ctx.body = await util.exesql(api,ctx);
        return;
    }
  }
  await next();
};
