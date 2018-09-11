const CONTEXT = 'http://10.2.53.11:8081'

export default {
  token: CONTEXT + '/oauth/token',
  userInfo: CONTEXT + '/user/',
  bindPush: CONTEXT + '/user/bindPush',
  unBindPush: CONTEXT + '/user/unBindPush',
  userUpdatePwd: CONTEXT + '/user/updatePwd',
  subMer: CONTEXT + '/tran/subMer',
  tranList: CONTEXT + '/tran',
  qrCodeCreate: CONTEXT + '/qrCode/',
  qrCodeQuery: CONTEXT + '/qrCode'
}
