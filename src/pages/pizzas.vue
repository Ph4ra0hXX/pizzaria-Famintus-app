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
            <option value="P">P</option>
            <option value="G">G</option>
            <option value="GG">GG</option>
          </select>
        </div>

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
            <option value="cheddar">
              Cheddar (R$
              {{ crustPrices.cheddar[selectedSize].toFixed(2) }})
            </option>
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
        <div class="dotted-line">
          <hr />
          <span id="textDividers">Escolha o adicional:</span>
          <hr />
        </div>
        <label class="additional-option">
          <input
            type="checkbox"
            v-model="selectedQueijoCoalho"
            class="flavor-checkbox"
          />
          Queijo coalho (R$ {{ queijoCoalhoPrice.toFixed(2) }})
        </label>
      </div>
      <br />
      <br />
      <br />
      <br />

      <button
        @click="salvarPedido"
        id="butOpcoes"
        type="submit"
        value="Submit"
        :disabled="!hasSelectedFlavor"
      >
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
      selectedSize: "G",
      selectedFlavors: [],
      selectedCrust: "",
      selectedQueijoCoalho: false,
      queijoCoalhoPrice: 5.0,
      flavors: [
        {
          name: "Chocobrownie",
          ingredients:
            "Massa Famintu's, creme de leite, chocolate ao leite e pedaços de brownie",
          prices: { P: 40, G: 62, GG: 75 },
        },
        {
          name: "Chocolate Crocante",
          ingredients:
            "Massa Famintu's, creme de leite, chocolate ao leite com ovomaltine",
          prices: { P: 40, G: 62, GG: 75 },
        },
        {
          name: "Chocolate com Disquete",
          ingredients:
            "Massa Famintu's, creme de leite, chocolate ao leite e disquetes",
          prices: { P: 40, G: 62, GG: 75 },
        },
        {
          name: "Chocolate com Morango",
          ingredients:
            "Massa Famintu's, creme de leite, chocolate ao leite e morangos fatiados",
          prices: { P: 40, G: 62, GG: 75 },
        },
        {
          name: "Chocolate com Oreo",
          ingredients:
            "Massa Famintu's, creme de leite, chocolate e Oreo em pedaços",
          prices: { P: 40, G: 62, GG: 75 },
        },
      ],
      crustPrices: {
        cheddar: { P: 5.0, G: 10.0, GG: 15.0 },
        chocolate: { P: 10.0, G: 15.0, GG: 20.0 },
        "cream-cheese": { P: 10.0, G: 15.0, GG: 20.0 },
        catupiry: { P: 0, G: 0, GG: 0 },
      },
    };
  },
  computed: {
    isFlavorDisabled() {
      const maxFlavors = 2;
      return this.selectedFlavors.length >= maxFlavors;
    },
    hasSelectedFlavor() {
      return this.selectedFlavors.length > 0;
    },
  },
  methods: {
    salvarPedido() {
      if (!this.hasSelectedFlavor) {
        const toast = useToast();

        toast.warning("Escolha pelo menos uma pizza.", {
          timeout: 2000,
          position: "top-right",
          icon: false,
          showCloseButtonOnHover: true,
        });

        return;
      }

      const pedido = {
        tamanho: this.selectedSize,
        sabores: this.selectedFlavors,
        borda: this.selectedCrust || "Sem borda",
        adicional: this.selectedQueijoCoalho ? "Queijo coalho" : "Sem adicional",
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
      this.selectedQueijoCoalho = false;
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

      if (this.selectedQueijoCoalho) {
        highestPrice += this.queijoCoalhoPrice;
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

.additional-option {
  color: #ffffff;
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: "Barlow-SemiBold";
  font-size: 17px;
}

#nomeepreco {
  display: flex;
  justify-content: space-between;
}

#selectTamanho {
  width: 100%;
  height: 40px;
  margin-bottom: 30px;
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
