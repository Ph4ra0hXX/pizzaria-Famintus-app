<template>
  <div id="cardapio">
    <div id="listar">
      <div class="pizza-builder">
        <div class="dotted-line">
          <hr />
          <span id="textDividers">Escolha o tamanho:</span>
          <hr />
        </div>
        <div>
          <select
            id="selectTamanho"
            v-model="selectedSize"
            @change="resetFlavors"
          >
            <option value="P">Pequena (2 Sabores)</option>
            <option value="G">Grande (2 Sabores)</option>
            <option value="GG">Gigante (3 Sabores)</option>
          </select>
        </div>
        <br />

        <div>
          <div class="dotted-line">
            <hr />
            <span id="textDividers">Escolha os sabores:</span>
            <hr />
          </div>
          <div
            v-for="(flavor, index) in flavors"
            :key="index"
            class="flavor-item"
          >
            <div id="nomeepreco">
              <div id="namecheck">
                <label :for="'flavor-' + index" class="flavor-label">
                  <input
                    type="checkbox"
                    :id="'flavor-' + index"
                    :value="flavor.name"
                    :disabled="
                      isFlavorDisabled && !selectedFlavors.includes(flavor.name)
                    "
                    v-model="selectedFlavors"
                    class="flavor-checkbox"
                  />
                </label>
                <span id="namePizza">{{ flavor.name }}</span>
              </div>
              <span class="flavor-price">
                R$ {{ flavor.prices[selectedSize].toFixed(2) }}
              </span>
            </div>
            <p class="flavor-ingredients">{{ flavor.ingredients }}</p>
            <br />
          </div>
        </div>

        <!-- Novo Seletor para escolher a borda -->
        <div class="dotted-line">
          <hr />
          <span id="textDividers">Escolha a borda:</span>
          <hr />
        </div>
        <div>
          <select id="selectTamanho" v-model="selectedCrust">
            <option value="">Sem borda</option>
            <option value="chocolate">
              Chocolate (R$
              {{ crustPrices.chocolate[selectedSize].toFixed(2) }})
            </option>
            <option value="cream-cheese">
              Cream Cheese (R$
              {{ crustPrices["cream-cheese"][selectedSize].toFixed(2) }})
            </option>
            <option value="catupiry">Catupiry (Grátis)</option>
          </select>
        </div>
        <br />
      </div>

      <br />
      <br />

      <button @click="salvarPedido" id="butOpcoes" type="submit" value="Submit">
        adicionar
      </button>

      <button id="butOpcoes2" @click="voltar()" type="submit" value="Submit">
        voltar
      </button>
    </div>
  </div>
</template>
<script>
import router from "../router/index";
import { useToast } from "vue-toastification";
import { carrinhoStore } from "../store/produtos";

export default {
  data() {
    return {
      selectedSize: "P",
      selectedFlavors: [],
      selectedCrust: "",
      flavors: [
        // Tradicionais
        {
          name: "Margherita",
          ingredients:
            "Massa Famintu's, molho especial, mussarela, manjericão e orégano",
          prices: { P: 30, G: 47, GG: 60 },
        },
        {
          name: "Catufrango",
          ingredients:
            "Massa Famintu's, molho especial, mussarela, frango, catupiry, cebola e orégano",
          prices: { P: 30, G: 47, GG: 60 },
        },
        {
          name: "Catusol",
          ingredients:
            "Massa Famintu's, molho especial, mussarela, carne de sol, catupiry, cebola e orégano",
          prices: { P: 30, G: 47, GG: 60 },
        },
        {
          name: "Franbacon",
          ingredients:
            "Massa Famintu's, molho especial, mussarela, frango, bacon, cebola e orégano",
          prices: { P: 30, G: 47, GG: 60 },
        },
        {
          name: "Carne de sol",
          ingredients:
            "Massa Famintu's, molho especial, mussarela, carne de sol, cebola, milho e orégano",
          prices: { P: 30, G: 47, GG: 60 },
        },
        {
          name: "Calabresa",
          ingredients:
            "Massa Famintu's, molho especial, mussarela, calabresa, cebola, milho, orégano",
          prices: { P: 30, G: 47, GG: 60 },
        },
        {
          name: "Portuguesa",
          ingredients:
            "Massa Famintu's, molho especial, mussarela, calabresa, ovo, presunto, cebola, tomate, pimentão, milho e orégano",
          prices: { P: 30, G: 47, GG: 60 },
        },
        {
          name: "Quatro queijos",
          ingredients:
            "Massa Famintu's, molho especial, mussarela, catupiry, cheddar, queijo coalho em cubos, cebola e orégano",
          prices: { P: 30, G: 47, GG: 60 },
        },
        {
          name: "Famintus",
          ingredients:
            "Massa Famintu's, molho especial, mussarela, frango, carne de sol, calabresa, bacon, catupiry, cebola, tomate, milho, presunto, orégano",
          prices: { P: 30, G: 47, GG: 60 },
        },
        {
          name: "Mista",
          ingredients:
            "Massa Famintu's, molho especial, mussarela, presunto, cebola, tomate, milho e orégano",
          prices: { P: 30, G: 47, GG: 60 },
        },
        // Especiais
        {
          name: "Carne sol com queijo coalho",
          ingredients:
            "Massa Famintu's, molho especial, mussarela, carne de sol, queijo coalho em cubos, cream cheese, cebola roxa, tomate e orégano",
          prices: { P: 35, G: 63, GG: 75 },
        },
        {
          name: "Calabacon",
          ingredients:
            "Massa Famintu's, molho especial, mussarela, calabresa, bacon, cream cheese, cebola roxa e orégano",
          prices: { P: 35, G: 63, GG: 75 },
        },
        {
          name: "Frango Cremoso",
          ingredients:
            "Massa Famintu's, molho especial, mussarela, frango cremoso, cream cheese, cebola e orégano",
          prices: { P: 35, G: 63, GG: 75 },
        },
        {
          name: "Toscana Especial",
          ingredients:
            "Massa Famintu's, molho especial, mussarela, linguiça toscana, cream cheese, cebola caramelizada e orégano",
          prices: { P: 35, G: 63, GG: 75 },
        },
        {
          name: "Franbacon Especial",
          ingredients:
            "Massa Famintu's, molho especial, mussarela, frango desfiado, bacon, cream cheese, cebola roxa, milho e orégano",
          prices: { P: 35, G: 63, GG: 75 },
        },
        {
          name: "Camarão Cremoso",
          ingredients:
            "Massa Famintu's, molho especial, mussarela, camarão cremoso, cebola, milho e orégano",
          prices: { P: 35, G: 63, GG: 85 },
        },
        {
          name: "Hotdog",
          ingredients:
            "Massa Famintu's, molho especial, mussarela, molho especial de salsicha, cebola, milho, batata palha e orégano",
          prices: { P: 35, G: 63, GG: 75 },
        },
        {
          name: "Lombo",
          ingredients:
            "Massa Famintu's, molho especial, mussarela, lombo, cebola, milho e orégano",
          prices: { P: 35, G: 63, GG: 75 },
        },
        {
          name: "Italiana Cremosa",
          ingredients:
            "Massa Famintu's, molho especial, mussarela, tomate, cebola roxa, cream cheese, milho, orégano",
          prices: { P: 35, G: 63, GG: 75 },
        },
      ],
      crustPrices: {
        chocolate: { P: 9.0, G: 11.0, GG: 15.0 },
        "cream-cheese": { P: 9.0, G: 15.0, GG: 20.0 },
        catupiry: { P: 0, G: 0, GG: 0 },
      },
    };
  },
  computed: {
    isFlavorDisabled() {
      const maxFlavors = this.selectedSize === "GG" ? 3 : 2;
      return this.selectedFlavors.length >= maxFlavors;
    },
  },
  methods: {
    salvarPedido() {
      const pedido = {
        tamanho: this.selectedSize,
        sabores: this.selectedFlavors,
        borda: this.selectedCrust || "Sem borda",
        preco: this.getHighestPrice(),
      };
      const carrinho = carrinhoStore();

      carrinho.burgers.push(pedido);

      console.log(carrinho.carrinhoCompleto);

      const toast = useToast();

      router.push("/");

      toast.success("Adicionado com sucesso!", {
        timeout: 2000,
        position: "top-right",
        icon: false,
        showCloseButtonOnHover: true,
      });

      console.log("Pedido salvo:", pedido);
    },

    resetFlavors() {
      this.selectedFlavors = [];
      this.selectedCrust = "";
    },
    voltar() {
      router.push("/");
    },

    getHighestPrice() {
      let highestPrice = 0;

      this.selectedFlavors.forEach((flavor) => {
        const selectedFlavor = this.flavors.find((f) => f.name === flavor);
        if (selectedFlavor) {
          const price = selectedFlavor.prices[this.selectedSize];
          if (price > highestPrice) {
            highestPrice = price;
          }
        }
      });

      if (this.selectedCrust && this.crustPrices[this.selectedCrust]) {
        const crustPrice =
          this.crustPrices[this.selectedCrust][this.selectedSize];
        highestPrice += crustPrice;
      }

      return highestPrice.toFixed(2);
    },
  },
};
</script>

<style scoped>
.flavor-ingredients {
  color: white;
  font-family: "system-ui";
}
#namecheck {
  display: flex;
  align-items: center;
  justify-content: center;
}
#namePizza {
  color: #ffffff;
  margin-top: -5px;
  margin-left: 10px;
  font-family: "Barlow-SemiBold";
  font-size: 17px;
}

.flavor-price {
  font-family: "Barlow-SemiBold";
  color: #f25430;
  display: flex;
  justify-content: center;
  align-items: center;
}
.flavor-checkbox {
  height: 25px;
  width: 25px;
  margin: 0 !important;
  padding: 0;
}

.flavor-checkbox:checked {
  accent-color: #f25430;
}

#nomeepreco {
  display: flex;
  justify-content: space-between;
}

#selectTamanho {
  width: 100%;
  height: 40px;
}

#observacao {
  padding: 5px;
  margin-bottom: 20px;
  height: 60px;
}
#quantidadeDiv {
  font-weight: bold;
  color: #fdd426;
  font-size: 20px;
}

#textDividers {
  color: #f25430;
  font-size: 25px;
  font-weight: lighter;
  font-family: "Barlow-Black";
}
.dotted-line {
  display: flex;
  align-items: center;
  text-align: center;
  margin: 20px 0;
}

.dotted-line hr {
  flex: 1;
  border: none;
  border-top: 2px dashed white;
  margin: 0 10px;
}

.dotted-line span {
  font-size: 18px;
  font-weight: bold;
  color: #333;
}

.botao1 {
  background-color: #f2cb05;
  color: #000000;
  border: none;
  padding: 5px 10px;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
  border-radius: 5px;
  border-bottom-left-radius: 20px;
  border-top-left-radius: 20px;
  width: 35px;
  margin-right: 2px;
}

.botao2 {
  background-color: #f2cb05;
  color: #000000;
  border: none;
  padding: 5px 10px;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
  border-radius: 5px;
  border-bottom-right-radius: 20px;
  border-top-right-radius: 20px;
  width: 35px;
  margin-left: 2px;
}

#nomeItem {
  font-size: 16px;
  margin-left: 7px;
}
#tituloRadio {
  display: flex;
  align-items: center;
}

#tituloDoRadio {
  margin-left: 3px;
}

input[type="radio"] {
  margin-left: -3px;
  border: 0px;
  width: 30px;
  height: 2em;
  accent-color: #f27141;
}
</style>
