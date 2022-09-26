let app = new Vue({
  el: "#app",
  data: {
    column: [{ name: "", price: "", num: "" }],
    items: [{ itemName: "", price: 0 }]
  },
  methods: {
    addColumn: function () {
      // 商品入力欄を追加
      let newItems = { name: null, price: null, num: null };
      this.column.push(newItems);

      // 合計金額表示欄を追加
      let newSum = { itemName: null, price: 0 };
      this.items.push(newSum);
    },
    // 商品名を合計欄に表示
    itemDispName: function () {
      for (i = 0; i < this.column.length; i++) {
        this.items[i].itemName = this.column[i].name;
      }
    },
    // 商品ごとの合計
    itemSumPrice: function () {
      for (i = 0; i < this.column.length; i++) {
        if(!isNaN(this.column[i].price) && !isNaN(this.column[i].num)) {
          this.items[i].price = this.column[i].price * this.column[i].num;
        } else {
          this.items[i].price = 0;
        }
      }
    },
    // 全ての合計
    totalSumPrice: function () {
      let sum = 0;
      for (i = 0; i < document.querySelectorAll(".msg").length; i++) {
        sum += this.items[i].price;
      }
      return sum;
    },
  },
});
