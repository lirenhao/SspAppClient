
const axios = require('axios')

const login = (userName, passWord) => {
  axios({
    url: 'http://10.2.53.166:3001/oauth/token',
    method: 'post',
    headers: {
      authorization: 'Basic ' + Buffer.from(userName + ':' + passWord).toString('base64')
    },
    params: {
      'grant_type': 'client_credentials'
    }
  })
    .then(resp => {
      console.log(resp)
    })
    .catch(err => {
      console.log(err)
    })
}

login('104@admin', '111111')
