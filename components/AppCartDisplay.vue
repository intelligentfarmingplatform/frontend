<template>
  <div class="cartDisplay">
    <v-container>
      <section>
        <v-row no-gutters>
          <v-col>
            <div
              class="haderpeng"
              v-for="item in detailsWithSubTotal"
              :key="item.id"
            >
              <v-card class="">
                <v-row >
                  <v-col cols="12" md="4">
                    <img
                      class=""
                      :src="`http://maims.cmtc.ac.th:3000/product/${item.productimg}`"
                      alt="John"
                      height="155rem"
                    /><br>
                    {{ item.productname }}<br>
                    จากร้าน {{ item.nameseller }}<br>
                     ราคา {{ item.productprice }} บาท
                  </v-col>
                  <v-col cols="12" md="4" class="label1">
                    <label class="">

                      <button
                        @click="removeOneFromCart(item)"
                        class="quantity-adjust"
                      >
                        -
                      </button>
                      {{ item.quantity }}
                      <button @click="addToCart(item)" class="quantity-adjust">
                        +
                      </button>
                    </label>
                  </v-col>
                  <v-col cols="12" md="4" class="label1" >
                    <v-icon @click="removeAllFromCart(item)" color="#FF6347"
                      >mdi-delete</v-icon
                    >
                  </v-col>
                </v-row>
              </v-card>
            </div>
            ทั้งหมด {{cartTotal}} บาท (ยังไม่รวมค่าจัดส่ง)
            <!-- <v-simple-table fixed-header>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th>สินค้า</th>
                    <th>ราคา</th>
                    <th>จำนวน</th>
                    <th>รวม</th>
                    <th>ลบสินค้า</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    height="105"
                    v-for="item in detailsWithSubTotal"
                    :key="item.id"
                  >
                    <td>
                      <div width="500" class="modal-img">
                        <v-avatar>
                          <img
                            :src="`http://127.0.0.1:4000/product/${item.productimg}`"
                            alt="John"
                          />
                        </v-avatar>
                      </div>
                      <div class="productname">{{ item.productname }}</div>
                    </td>
                    <td>{{ item.productprice }}</td>
                    <td>
                      <button
                        @click="removeOneFromCart(item)"
                        class="quantity-adjust"
                      >
                        -
                      </button>
                      {{ item.quantity }}
                      <button @click="addToCart(item)" class="quantity-adjust">
                        +
                      </button>
                    </td>
                    <td>{{ item.subtotal }}</td>
                    <td>
                      <div class="delete-product">
                        <v-btn
                          @click="removeAllFromCart(item)"
                          class="mx-2"
                          fab
                          dense
                          x-small
                          color="primary"
                        >
                          <v-icon dark> mdi-delete </v-icon>
                        </v-btn>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table> -->
          </v-col>

          <!-- cart table column -->
        </v-row>
      </section>

      <section></section>
    </v-container>
  </div>
</template>

<script>
import orderMixin from '~/mixins/order'

export default {
  mixins: [orderMixin],
  data: () => ({}),
  // async asyncData({Axios,state}) {
  //   try {
  //     let response = await Axios.post('http://127.0.0.1:4000/api/shipment', {
  //       shipment: 'normal',
  //     })
  //     console.log('datafrom async',response.data)
  //     $store.commit('setShipping', {
  //       price: response.shipment.price,
  //       estimatedDelivery: response.shipment.estimated,
  //     })
  //     return {
  //       shippingPrice: response.shipment.price,
  //       estimatedDelivery: response.shipment.estimated,
  //     }
  //   } catch (err) {}
  // },
  components: {},
}
</script>

<style lang="scss" scoped>
.haderpeng {
  padding: 15px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.11);
  width: 100%;
  .productImg {
    margin-right: 200px;
  }
  .label1 {
    padding-top: 75px;
  }

  .subtitle {
    font-size: 1rem;
  }

}
.addressDetail {
  display: flex;
  align-items: center;
  justify-content: center;
}
.productname {
  margin-top: 5px;
  justify-content: 'center';
}
.modal-img {
  justify-content: 'center';
}
</style>

<style lang="stylus" scoped>
getColor(colorx, alpha = 1) {
  unquote('rgba(var(--vs-' + colorx + '), ' + alpha + ')');
}

getVar(var) {
  unquote('var(--vs-' + var + ')');
}

.content-tooltip {
  .body {
    display: flex;
    align-items: flex-start;
    justify-content: center;

    .vs-avatar-content {
      margin-top: -30px;
      border: 3px solid getVar('theme-layout');
      box-shadow: 0px 4px 15px 0px rgba(0, 0, 0, 0.1);
    }

    .text {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      font-size: 0.55rem;
      padding: 10px;
      font-weight: normal;

      span {
        font-weight: bold;
        font-size: 0.7rem;
      }
    }
  }

  footer {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  h4 {
    padding: 8px;
    margin: 0px;
    text-align: left;
  }

  p {
    text-align: left;
    padding: 0px;
    margin: 0px;
    line-height: 1rem;
    padding-bottom: 5px;
    padding-left: 8px;
  }
}
</style>
