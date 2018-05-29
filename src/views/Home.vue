<template>
  <div class="home">
    <input type="text" v-model="title">
    <textarea cols="30" rows="10" v-model="content"></textarea>
    <button @click="submit">submit</button>
    <button @click="get">get</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Nebpay from 'nebpay';

@Component({
  components: {
  },
})
export default class Home extends Vue {
  title: string = '';
  content: string = '';
  // 合约地址
  dappAddress: string = 'n22vJ2r2bMtT2bceYkf8UDu66PsadrR1D3z';

  submit() {
    let nebPay = new Nebpay();

    let to = this.dappAddress;
    let value = '0';
    let callFunction = 'save';
    let callArgs = "[\"" + this.title + "\",\"" + this.content + "\"]";

    //使用nebpay的call接口去调用合约
		nebPay.call(to, value, callFunction, callArgs, {
      listener: (res: any) => {
        console.log('listener', res)
      }
    });
  }

  get() {
    let nebPay = new Nebpay();

    let to = this.dappAddress;
    let value = '0';
    let callFunction = 'get';
    let callArgs = "[\"" + this.title + "\"]";;

    //使用nebpay的call接口去调用合约
		nebPay.simulateCall(to, value, callFunction, callArgs, {
      listener: (res: any) => {
        console.log('listener', res)
      }
    });
  }
}
</script>
