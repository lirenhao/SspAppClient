const CONTEXT = 'https://eccst.sg.ebs.bankofchina.com/sgecm/app'

export default {
  token: CONTEXT + '/oauth/token',
  userInfo: CONTEXT + '/user/',
  bindPush: CONTEXT + '/user/bindPush',
  unBindPush: CONTEXT + '/user/unBindPush',
  userUpdatePwd: CONTEXT + '/user/updatePwd',
  subMer: CONTEXT + '/tran/subMer',
  tranList: CONTEXT + '/tran',
  termTranList: CONTEXT + '/tran/term',
  qrCodeCreate: CONTEXT + '/qrCode/',
  qrCodeQuery: CONTEXT + '/qrCode',
  setRefund: CONTEXT + '/user/refund',
  refund: CONTEXT + '/refund'
}
