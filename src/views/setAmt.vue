<template>
  <div>
    <x-header style="width:100%;position:absolute;left:0;top:0;z-index:100;"
              :title="$t(title)" :left-options="{showBack}">
    </x-header>
    <group class="money-title" :title="$t('Please enter the payment amount')"></group>
    <div class="money-box">
      <label class="money" >{{ccyType.ccySymbol}}</label>
      <input class="money-input" v-model="amt" type="number" step="0.01" :placeholder="ccyType.ccyEname"/>
    </div>
    <group class="money-title" :title="$t('Please choose the payment channel')"></group>
    <group>
      <radio :options="options" v-model="channel">
        <template slot-scope="props" slot="each-item">
          <p>
            <img width="24" :src="props.icon" />
            {{props.label}}
          </p>
        </template>
      </radio>
    </group>
    <x-button class="general-btn" type="primary" @click.native="goCreateCode">{{$t('Generate QR code')}}</x-button>
  </div>
</template>
<script>
import {XHeader, Group, XInput, XButton, Radio} from 'vux';
import api from '../api';

export default {
  name: 'setAmt',
  components: {
    XHeader,
    Group,
    XInput,
    XButton,
    Radio,
  },
  created: function() {
    if (!window.localStorage.token) {
      this.$router.push({name: 'login', params: {isClear: false}});
    } else {
      api.userInfo().then(data => this.ccyType = data.ccyType)
    }
  },
  props: {
    tranAmt: String
  },
  data: function() {
    return {
      isShowNav: this.$route.meta.isShowNav,
      title: this.$route.meta.title,
      showBack: this.$route.meta.showBack,
      amt: this.tranAmt ? this.tranAmt : '',
      ccyType: {},
      channel: '01',
      options: [
        {
          icon: 'data:image/png;base64,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', 
          key: '01',
          value: this.$t('UnionPay')
        }, {
          icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADkAAAAwCAYAAACrF9JNAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAOpgAADqYAGEyd52AAAAB3RJTUUH4gYSERowaRh5rQAADXBJREFUaN7VmXmQ3MV1xz+vf8cce2uFOFYXQpKRUDAGUxQhB4psA8ZC5sYWisEBYyiH2E4cVyiDSahyXLETCpzYKWI7hMgHEQECkQBzGrCMsbBjIoEkWMusDmulvWdndmZ+v+6XP2Zndq4VIBYTv9qpmul9v+7+9vf1e9/unzAD9vFHPocADoMRgyA4FKsOFQ9czF1n/91MDHVYJm/2gbWbbqYtLGAtYARfAhQldpaDuTG+dOYn+Om+HbJm2Uq94t4b6GrpxDceiBBbi5MIsR7HnpPmZrn5/xfIqx++kVQyIIpjRAzZKE9XsqU1dm5eZO1Sxc2PXDxP0Q5VDYECyKgnZreI9PnG2xGYYE9/djDbGqaIXYwnPlmbY8O5t7/zID/5+BdRVTwxtActYSbK/U7RFs8uuuiPijZaVnRRd+xsaJ3F4VBVQBBARPDEK/jGHwiNvz30gicC4z+UDtNbx/KZyKkFlGIs3H3e3//mQV796F/x2lgfSzqXkAqS/kRU+L2JOH/VRJx/fz4uzCm6CKcOh1L6U1BFKX1XmPqtihHBNz5JP9Gf9BKPJP3EN2eFLZsHC2N2y8iTnNh5Bt8/Z+ZZnRbkNY/ehBGDihIYb1Euyn8mF02szcX5rtjFqGoFSIm5JiAr7VT5lxbENx4pPznYEqTWp/zkrYU4es33PKxTvnvuV2cUpGnWeO3jX8T3PO58+R8R5QOj+cw9QxOjn8oUsxWA9VYG2NhOU//IxYwWM90HJ4b/bLgwusEYWfX8wAt4Bi7b9OkZBek1MPjYTXjGY9kxC+Wo8Lh1Y8Xxr2eK2SVWbQOoEoAmoKpYrPUvsVht1lnytthj1a5a2Dpv3wXvXrntlYN9rPjoafzvd56beZDXPXETgfF5ZteP8SWxLlMcvy0b5Y6oDsdGVvRNszgV6FO/C3HUHqv9w96BPa9tH3xtW0/bHJZe9h62fff5twzSr/4xNDZKKpni9AWnrhopjH85F010TT9JcKpQM1nK/Db4OxyitSlAtZycSj7jUe4I4CuLO+ftG57IPFuw0YwwWRn1mh98ATGCEdMzWhjfMF7Mnu5qksfUd4cjMAFpP0U2zlGICwhSE6qVZKNKMkiQ9ELGilkiFyPN/CafFoS2sPWHs5Ltl8bO9hvPcPcHb3tLID0oqZiED99Y9Tds2PnQX4wXc5fbSr2rNYejO9nFVSsu5vLl53F81yJ6R/oYK2YbcrWiHNc1n8+cfAWXvOuDHNVyBC8P9ZK3BZpsz0l2IVa7QESG79/ywLMnLjiBrevf2t70AM648gwi63jwl08eny3mvhK5uLN+shWQqnxo0UouXnoO7WErCzvmUnQRPz/w0uQkp9jxxOMTJ17KmXNPoyPRxrJZi+nL7GPn0C5EpMq/Fq5TJw6df8qCd28qxtHw0o+eys7vbTlskKY0kMee8f3k4/yaoosXapM1Lk9GBDoSbTX/6wjbEZGGyXpi6Ey0Tw0mQkfY2mTXTi6lTu3rQlxcnIly5/aPDyDStNK9OZCxizi2o6e1YKOznLoKqHoWy0xu3vcz9o73oygHc0M8vfd5YmcbQrBgizzWt5mRQgZVZcfwLn6y/8VJwdecxXInTp3k48LZCzrmptTGbwmkD1BwEQUXzY/VLjsUiyU2DNsGX+Wvf/w1FrT3sGd8P78c6cOITC1M2V/g8b7N7M78mjnpbnYM72JvZn8lVOtZrGshcvGK4fzoXOCVtwJSAC588E/xRFYXbLTBqUvUs1gv4RTF6VRikkmA5XnWSzirDsVNDih1GbUMsrZ/RRFMLmGCczva25/qbOtAVclHFhHhP1f9w5tj0jmLisxR1cShWKw2g6Dl5FFdK5v4GxEU0zRbC+AZH8/z8T0PYwxIRUgk04nkJe3pNuOJtzvph3uHor25Dq+DS574c8DQ2T7KHe+94/WZXHP/J0HkWqfu69UTmaplhy/EK/3UseV7PslEgjAIUE+wOCwWq5bq+iwizsMr+MYbCE2wPTTBU6EXPNTld249UByIAvFw6rh75a2HBrn6vmsAvRqRO5oV//pQpRpU3eSrQZWVTLWP7/mkkyn8hE+RmIIrElWdahq2R2WxFBFDID5JL+xP+6mH037yjpM7lz73wsgOp+qwAvee2SgcTHlSDh1S1QYdNVNCXBBakmna29uwoWPUjjMe5yoAyz40TqBiTh15W2C4OHZkf37wY/0Tg/c9O/DiLYHxj4idZVF3Dxc+ef30IFF2AWP1LDbAPQwhLiK0tbbhpwMymmXCFnCqDaCaj1uZYY1FLmakmJlzID94w8H88F2e8Zdv79/F3LYezn/y001AqkPRXwG9M82iEaGtpRUbKuM2Nynqp/xdaexpoqdBCdWdXyBviwzkh88eLIx8OzTBildHdjFeHOXDT0wxaqCU4mcnOocUfXImWQRIp9LEvpb0KlWyj9J1SHeik/agtSbZ1PfkUALjc0RyFikvWZMQAWK1DBfHThsqjN6W9JLHpLw06qYEhAdw8tqTGI2LoGREZA3Q0rxwVB+nmi1DbXsYhpikT94VGvwTJuTyRau5fvla/uDI93IgP8Se3P7KGNX9zgo7uH7ZOq5916WcMvsEXhl7jYH8CKUKphWWIxcdq6gsbz/u8Uyc0/nrTqX3rudLIHtXrGbh7DEstt9gFgGnVAaZpk5WF//6VSjvw2Q6SUGimgxbihzLSbOO57MrPsbsRBdHpro5OjWbp/Y/T8EVgbJ6Upwqq+efydVLL6I9bGVB6zH44vHsgZ81zMvicOqWjtvc5ok43+drgVfX/6IUroUv3AI4jJjY4W5X9BVtRNVUWNfUxSrzA5/YOMpauDYSIO0nCU1QaW8NWvCN30zJ0h601rR1hK2Yyqm01vK22J2Jcms/cPQZJvRLB4mKvPcSKSIsAf42RW8BxqcT0K/HIoDxDTF2KpSr9ptB2DbyKs8dfJFYLdk4x0N7nma0mCnJvqobBwGe3r+FHaO7cOo4kB9k456nKbqpaldTY1HycX7lo/s394xH2UofFXv/vVeUBjHON9Z8HuRGRRNU69JpdGYNSIGgJYE1riZUp+5jS79nhR0s61xEJsry0kgvhcmJl0FWj9GTPpIl7QvYm+tn59ivJjNtfTRV7nezrX56Taz28S2rNzRW37Pu/TiqDqs26Yn/l6h+HkjXq5uGUNXauui1BDhTuxfrS49DS7qZsr6lhsXaA0HpBRKTvvWLUO0v4EIvuNKqu+vFNfc33rs+csG3UQWDyau6v1X0swpDDZE5zV6ssN1Q+xp3kFA6uhmRJn3UlqbS6wZTATi9v6KoiVyULl+jNj1yP3rRneUHI0WfAXL1LDaMULMApcN1U8HQtBa+nmqiifCoZb3uGWfV5cpJb9p7BaeOV4efQZB1wNwGFqdRO5WBa5QNTZhVpk1shwBM0whp8M8p7C63+DSx921YBxgWd/7+cpDLavaVdbjI7lCnL+FxAiLzMKQqV6qT+FzsMH7tBf3hsvhG/aue6EPZUW5tClIF8jYjKa/tj4GFAOoUF9kBjdx6a+03imPZXUFb6miMWY6wXEWXAHMU2kB9Uc+X0JyiQrrpVJqG2jSgqu5lm0HSxu3ymIr9tUwGalOQqJA0rfMFuWgS3ISL4o3WutuL4/ZHYavnvJYARPqAPt/3Hz533Xn825f/xQtb0iFY44fJ0Ej4z8Al050upgm1mpLwxlicKk7AfmC9qKdu8sqlOZNOQZhwkX3RxXavi90/2Tj+b8/3c0G6dDcRB5BPTNB2IE22dYL7vnUPXnvCYsyEAEFrMqtwK+gZQM9vjEX4Zt6ZF0LjCIMSk03fT67VGxl8dC8Tfdl2RfF9fyyyMR4eeQo89yf3cij73U0fQdXQGoyRi9qvU/SrQKoaZGPWrBcYjSAbbx9qygbARuBKVQ46YOcFG4Emr+4AOo7p4WCvJd1OAUPhQH4UXww/umoDex54mdez3d/Zyry1J1KMfFxsfwEgwukq+G/0UFwLsNG7if8PgU8Bu0VgxyTAaZmcKTv9gctQ67ATUcJLhdfhyQ0YZtczdSj1Us1iNfAqFmPgQUU/B/SGJqagPts/PAXSe2PTPTzb872t9Fy8HETswNb+n6S6Uv+jqvMR5iMi0xfzaUpKc2afAK4A2WtEiJzH9vM31ji8rSAB9v7HSxx94TKSXSm8ZNBrs8WNqPapMhvV2SLiq7zx4l+7CAowofB9YEwlZvv5mxr833aQAPvueZmj1ywmnDMHl83lTEv403is8F843aKxjqhzRp2G6tRXVYNTqagqp7HGmtPI7tbYZYBOqrSuot3AS8DPg5Yi/f++q2H8t3VPNrNT1q+ppH3xDWPP7ZeW93R3q5G5KixA9EiFFlBPlbyqDqnqbnXap6pJfLkUX9aKL0vFF0pRwCaFS4BsdcJ5x0CW7aR//RCjB4foPGo2GMVpSWkx+VEUdZOf8tFMHaYrJB4sLBbDWgJZS2CWYGQ3wkqgd8eFjeH6joE8HDv+zrNLr/VwhJ1CfsguEU8uxMi4hHwLZWLnR37w2w0SYPGdZyGqIALOgW/wOgJsLgKBVy575LcfZAXs+lXIuAcJVzr1iE9X8SAvXPNCg+//ARD0fu7BEtG5AAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE4LTA2LTI4VDIyOjI0OjA5KzA4OjAweVB4NQAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxOC0wNi0xOFQxNzoyNjo0OCswODowMBwR2LYAAABDdEVYdHNvZnR3YXJlAC91c3IvbG9jYWwvaW1hZ2VtYWdpY2svc2hhcmUvZG9jL0ltYWdlTWFnaWNrLTcvL2luZGV4Lmh0bWy9tXkKAAAAGHRFWHRUaHVtYjo6RG9jdW1lbnQ6OlBhZ2VzADGn/7svAAAAGHRFWHRUaHVtYjo6SW1hZ2U6OkhlaWdodAAxNDgVJuYGAAAAF3RFWHRUaHVtYjo6SW1hZ2U6OldpZHRoADE3NkpCyJ8AAAAZdEVYdFRodW1iOjpNaW1ldHlwZQBpbWFnZS9wbmc/slZOAAAAF3RFWHRUaHVtYjo6TVRpbWUAMTUyOTMxNDAwONZyRXMAAAARdEVYdFRodW1iOjpTaXplADkwODNCi4qFegAAAGJ0RVh0VGh1bWI6OlVSSQBmaWxlOi8vL2hvbWUvd3d3cm9vdC9uZXdzaXRlL3d3dy5lYXN5aWNvbi5uZXQvY2RuLWltZy5lYXN5aWNvbi5jbi9zcmMvMTIxMzAvMTIxMzAzNC5wbmflnzzCAAAAAElFTkSuQmCC', 
          key: '02',
          value: this.$t('WeChat')
        }, {
          icon: 'data:image/png;base64,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', 
          key: '03',
          value: this.$t('Alipay')
        }
      ],
    };
  },
  methods: {
    validAmount(amt) {
      const regex = /^[1-9]\d*(((,\d{3}){1})?(\.\d{0,2})?)$/;
      if (regex.test(amt)) {
        return {valid: true}
      }
      return {valid: false, msg: this.$t('Amount input error')}
    },
    goCreateCode() {
      if (this.amt !== '' && this.validAmount(this.amt).valid) {
        api.qrCodeCreate(this.amt, this.channel).then(data => {
          if (data) {
            if (data.respCode && data.respCode === '00') {
              this.$router.replace({
                name: 'createCode',
                params: {...data, timeout: parseInt(data.timeout)},
              });
            } else {
              this.$vux.toast.show({
                type: 'warn',
                position: 'default',
                text:  this.$t('QrCode create failed')
              })
            }
          } else {
            this.$vux.toast.show({
                type: 'warn',
                position: 'default',
                text:  this.$t('QrCode create failed')
              })
          }
        })
      } else {
        this.$vux.toast.show({
          type: 'warn',
          position: 'default',
          text:  this.$t('Amount input error')
        })
      }
    },
  },
};
</script>

<style scoped>
  /*标题*/
  .money-title {
    margin-left: 30px;
    margin-top: 50px;
    }

  /*金额图标*/
  .money {
    font-size: 38px;
    margin-bottom: 12px;
  }

  /*输入金额框*/
  .money-box {
    width: 80%;
    height: 60px;
    margin-left: 10%;
    border-bottom: 1px solid #d9d9d9;
  }

  /*输入框*/
  .money-input {
    width: 84%;
    height: 38px;
    background: none;
    border: none;
    outline:medium;
    font-size: 38px;
  }

  /*间距调整*/
  .weui-cell {
    padding-left: 0 !important;
    padding-bottom: 0 !important;
  }

  /*按钮*/
  .general-btn {
    width: 66%;
    height: 38px;
    margin-left: 17%;
    background: #67a2f9;
    color: #fff;
    border: none;
    font-size: 15px;
    margin-top: 96px;
    border-radius: 4px;
    text-align: center;
  }

  /*删除按钮边框*/
  .weui-btn:after {
    border: none !important;
  }


</style>
