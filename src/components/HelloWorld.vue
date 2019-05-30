<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <input v-model="wallet.address" placeholder="address" />
    <div>Address: {{ wallet.address }}</div>
    <div>Balance: {{ wallet.balance }}</div>
    <button v-on:click="getBalance">Get Balance</button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import BN from 'bn.js';
import ERPC from '@etclabscore/ethereum-json-rpc';

const erpc = new ERPC({
  transport: {
    type: 'http',
    host: 'localhost',
    port: 8545
  }
});

export interface Wallet {
  balance: string;
  address: string;
}

@Component
export default class HelloWorld extends Vue {
  @Prop() private msg!: string;
  private wallet: Wallet;
  constructor(...args: any) {
    super(...args);
    this.wallet = {
      address: "",
      balance: ""
    }
  }
  private async getBalance() {
    const blockNumber = await erpc.eth_blockNumber();
    erpc.eth_getBalance(this.wallet.address, blockNumber).then((balance) => {
      this.wallet.balance = new BN(balance.substring(2), "hex").toString();
    });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
