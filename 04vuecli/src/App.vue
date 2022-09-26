<template>
  <div id="app">
    <div class="container">

      <div class="item">
        <h2>商品入力欄</h2>
        <table>
          <tr>
            <th>商品名</th>
            <th>金額</th>
            <th>個数</th>
          </tr>
          <tr class="itembox" v-for="(item, i) in items" v-bind:key="item.id">
            <td><input type="text" class="name" v-model="item.name" v-on:change="nameDisp"></td>
            <td><input type="tel" class="price" v-model="item.price" v-on:change="sumPrice">円</td>
            <td>
              <button class="numchange" v-on:click="minusNum(i)" v-bind:disabled="item.active">－</button>
              <input type="num" class="num" v-model="item.num" v-on:change="sumPrice">
              <button class="numchange" v-on:click="plusNum(i)">＋</button>
              個
              <button class="delbtn" v-on:click="deleteItem(i)">×</button>
            </td>
          </tr>
          <tr>
            <td class="itembox empty" colspan="3" v-if="items.length === 0"><p>商品を追加してください。</p></td>
          </tr>
        </table>
        <button class="additem" v-on:click="boxNum">商品を追加</button>
      </div>

      <div class="sum">
        <h2>合計金額</h2>
        <div class="sumbox">
          <p v-for="sum in sumItem">{{ sum.name }} {{ sum.price }}円</p>
        </div>
        <div class="total">
          <p>合計 {{ totalPrice() }} 円</p>
        </div>
      </div>

    </div>
  </div>
</template>

<script>

export default {
  name: 'App',
  data: () => {
    return {
      id: 1,
      items: [{name: '', price: 0, num: 0, id: 0, active: true}],
      sumItem: [{name: '', price: 0}],
    }
  },
  methods: {
    boxNum: function() {
      // 商品入力欄を追加
      let newItemBox = {name: '', price: 0, num: 0, id: this.id++, active: true}
      this.items.push(newItemBox)

      // 合計表示欄を追加
      let newSumBox = {name: '', price: 0}
      this.sumItem.push(newSumBox)
    },
    nameDisp: function() {
      // 商品名を合計欄に表示
      for (let i = 0; i < this.items.length; i++) {
        this.sumItem[i].name = this.items[i].name
      }
    },
    sumPrice: function() {
      // 各商品の合計
      for (let i = 0; i < this.items.length; i++) {
        // 個数の判定
        if (this.items[i].num > 0) {
          this.items[i].active = false;
        }
        // 各商品の合計
        this.sumItem[i].price = this.items[i].price * this.items[i].num
      }
    },
    totalPrice: function() {
      // 全商品の合計
      let sum = 0;
      for (let i = 0; i < this.items.length; i++) {
        sum += this.sumItem[i].price;
      }
      return sum;
    },
    deleteItem: function(i) {
      // 商品を削除
      this.items.splice(i, 1)
      this.sumItem.splice(i, 1)
    },
    minusNum: function(id) {
      // 商品の個数を減らす
      this.items[id].num--;
      // 0個以下には減らせないようにする
      for (let i = 0; i < this.items.length; i++) {
        if (this.items[i].num <= 0) {
          this.items[i].active = true;
        }
      }
      this.sumPrice()
    },
    plusNum: function(id) {
      // 商品の個数を増やす
      this.items[id].num++
      // マイナスのdisableを解除
      for (let i = 0; i < this.items.length; i++) {
        if (this.items[i].num > 0) {
          this.items[i].active = false;
        }
      }
      this.sumPrice()
    }
  }
}
</script>

<style>
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */

/*-------------------------
  初期化
-------------------------*/
html {
  font-size: 62.5%;
  scroll-behavior: smooth;
}

body {
  font-size: 1.6rem;
  font-family: "Helvetica Neue", Arial, "Hiragino Kaku Gothic ProN", "Hiragino Sans", Meiryo, sans-serif;
  margin: 0;
}

ul, ol {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

* {
  box-sizing: border-box;
}

table {
  border-collapse: collapse;
}

input,
button {
  outline: none;
}

button {
  cursor: pointer;
}

button:hover {
  opacity: 0.7;
}

p {
  margin: 0;
}

/*-------------------------
  グローバル
-------------------------*/
.container {
  width: 1000px;
  margin: 60px auto;
  display: flex;
  flex-wrap: wrap;
}

h2 {
  font-weight: normal;
  border-left: 10px solid #333;
  padding: 0 0 0 15px;
}

input[type=text],
input[type=tel],
input[type=num] {
  border: 1px solid #333;
  padding: 8px 10px;
}

/*-------------------------
  商品入力欄
-------------------------*/
.item {
  width: 740px;
}
.itembox {
  border-bottom: 1px solid #ccc;
}

.item table {
  width: 100%;
  margin: 0 0 20px;
}

.item table th {
  font-size: 1.4rem;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
}

.item table th,
.item table td {
  padding: 10px;
  text-align: center;
}

.item table td {
  padding: 20px 10px;
}

.item .name {
  width: 80%;
}

.item .price {
  width: 60px;
  margin: 0 3px 0 0;
}

.item .num {
  width: 40px;
  margin: 0 3px;
}

.item .numchange {
  border: 0;
  padding: 7px 10px;
  border-radius: 5px;
  background-color: #eff4f9;
  color: #777e85;
}

.item .numchange:disabled {
  background-color: #ddd;
  color: #fff;
  cursor: auto;
}

.item .numchange:disabled:hover {
  opacity: 1;
}

.item .additem {
  display: block;
  font-size: 1.8rem;
  width: 300px;
  margin: 0 auto;
  border: 0;
  background-color: #e96a6a;
  color: #fff;
  padding: 10px;
  transition: .3s;
}

.item .delbtn {
  width: 20px;
  height: 20px;
  border-radius: 50em;
  border: 0;
  background-color: #e96a6a;
  color: #fff;
  float: right;
  margin: 7px 0;
}

.item .empty p {
  color: #ccc;
}

/*-------------------------
  合計金額
-------------------------*/
.sum {
  width: 240px;
  margin: 0 0 0 20px;
  padding: 0 20px 20px;
  background-color: #eee;
  position: relative;
}

.sum .sumbox p {
  text-align: right;
}

.sum .total {
  position: absolute;
  width: calc(100% - 40px);
  bottom: 20px;
  text-align: right;
  border-top: 1px solid #333;
  padding: 10px 0 0;
}
</style>
