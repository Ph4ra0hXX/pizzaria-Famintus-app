<template>
  <div id="cardapio">
    <div id="listar">
      <div class="pizza-builder">
        <div class="dotted-line">
          <hr />
          <span id="textDividers">Escolha o tamanho</span>
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
            <span id="textDividers">Escolha os sabores</span>
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
          <span id="textDividers">Escolha a borda</span>
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
      selectedSize: "P", // Tamanho selecionado (Pequena por padrão)
      selectedFlavors: [], // Sabores selecionados
      selectedCrust: "", // Borda selecionada
      flavors: [
        {
          name: "Calabresa",
          ingredients:
            "Massa Famintu's, molho especial, mussarela, calabresa, cebola, milho, orégano.",
          prices: {
            P: 30.0,
            G: 40.0,
            GG: 50.0,
          },
        },
        {
          name: "Portuguesa",
          ingredients:
            "Massa Famintu's, molho especial, mussarela, calabresa, ovo, presunto, cebola, tomate, pimentão, milho, orégano.",
          prices: {
            P: 32.0,
            G: 42.0,
            GG: 52.0,
          },
        },
        {
          name: "Quatro queijos",
          ingredients:
            "Massa Famintu's, molho especial, mussarela, catupiry, cheddar, queijo coalho em cubos, cebola, orégano.",
          prices: {
            P: 35.0,
            G: 45.0,
            GG: 55.0,
          },
        },
        {
          name: "Frango",
          ingredients:
            "Massa Famintu's, molho especial, mussarela, frango, cebola, tomate, milho, orégano.",
          prices: {
            P: 31.0,
            G: 41.0,
            GG: 51.0,
          },
        },
        {
          name: "Famintus",
          ingredients:
            "Massa Famintu's, molo especial, mussarela, frango, carne de sol, calabresa, bacon, catupiry, cebola, tomate, milho, orégano.",
          prices: {
            P: 38.0,
            G: 48.0,
            GG: 58.0,
          },
        },
        {
          name: "Mista",
          ingredients:
            "Massa Famintu's, molho especial, mussarela, presunto, cebola, tomate, milho, orégano.",
          prices: {
            P: 33.0,
            G: 43.0,
            GG: 53.0,
          },
        },
        {
          name: "Margherita",
          ingredients:
            "Massa Famintu's, molho especial, mussarela, manjericão, tomate, orégano.",
          prices: {
            P: 29.0,
            G: 39.0,
            GG: 49.0,
          },
        },
        {
          name: "Catufrango",
          ingredients:
            "Massa Famintu's, molho especial, mussarela, frango, catupiry, cebola, milho, orégano.",
          prices: {
            P: 34.0,
            G: 44.0,
            GG: 54.0,
          },
        },
        {
          name: "Catusol",
          ingredients:
            "Massa Famintu's, molho especial, mussarela, carne de sol, catupiry, cebola, orégano.",
          prices: {
            P: 36.0,
            G: 46.0,
            GG: 56.0,
          },
        },
        {
          name: "Franbacon",
          ingredients:
            "Massa Famintu's, molho especial, mussarela, frango, bacon, cebola, orégano.",
          prices: {
            P: 33.0,
            G: 43.0,
            GG: 53.0,
          },
        },
        {
          name: "Carne de sol",
          ingredients:
            "Massa Famintu's, molho especial, mussarela, carne de sol, cebola, milho, orégano.",
          prices: {
            P: 35.0,
            G: 45.0,
            GG: 55.0,
          },
        },
        {
          name: "Carne de sol com queijo coalho",
          ingredients:
            "Massa Famintu's, molho especial, mussarela, carne de sol, queijo coalho em cubos, cream cheese, cebola roxa, tomate, orégano.",
          prices: {
            P: 37.0,
            G: 47.0,
            GG: 57.0,
          },
        },
        {
          name: "Calabacon",
          ingredients:
            "Massa Famintu's, molho especial, mussarela, calabresa, bacon, cream cheese, cebola roxa, orégano.",
          prices: {
            P: 36.0,
            G: 46.0,
            GG: 56.0,
          },
        },
        {
          name: "Frango Cremoso",
          ingredients:
            "Massa Famintu's, molho especial, mussarela, frango cremoso, cream cheese, cebola, orégano.",
          prices: {
            P: 35.0,
            G: 45.0,
            GG: 55.0,
          },
        },
        {
          name: "Toscana Especial",
          ingredients:
            "Massa Famintu's, molho especial, mussarela, linguiça toscana, cream cheese, cebola caramelizada, orégano.",
          prices: {
            P: 38.0,
            G: 48.0,
            GG: 58.0,
          },
        },
        {
          name: "Franbacon Especial",
          ingredients:
            "Massa Famintu's, molho especial, mussarela, frango desfiado, bacon, cream cheese, cebola roxa, milho, orégano.",
          prices: {
            P: 39.0,
            G: 49.0,
            GG: 59.0,
          },
        },
        {
          name: "Camarão Cremoso",
          ingredients:
            "Massa Famintu's, molho especial, mussarela, camarão cremoso, cebola, tomate, milho, orégano.",
          prices: {
            P: 42.0,
            G: 52.0,
            GG: 62.0,
          },
        },
        {
          name: "Hotdog",
          ingredients:
            "Massa Famintu's, molho especial, mussarela, molho especial de salsicha, cebola, milho, batata palha, orégano.",
          prices: {
            P: 33.0,
            G: 43.0,
            GG: 53.0,
          },
        },
        {
          name: "Lombo",
          ingredients:
            "Massa Famintu's, molho especial, mussarela, lombo, cebola, milho, orégano.",
          prices: {
            P: 35.0,
            G: 45.0,
            GG: 55.0,
          },
        },
        {
          name: "Italiana Cream",
          ingredients:
            "Massa Famintu's, molho especial, mussarela, tomate, cebola roxa, cream cheese, milho, orégano.",
          prices: {
            P: 37.0,
            G: 47.0,
            GG: 57.0,
          },
        },
        {
          name: "Chocobrownie",
          ingredients:
            "Massa Famintu's, mussarela, chocolate ao leite, pedaços de brownie.",
          prices: {
            P: 38.0,
            G: 48.0,
            GG: 58.0,
          },
        },
        {
          name: "Banana",
          ingredients:
            "Massa Famintu's, mussarela, discos de banana, canela, leite condensado.",
          prices: {
            P: 35.0,
            G: 45.0,
            GG: 55.0,
          },
        },
        {
          name: "Chocolate Crocante",
          ingredients:
            "Massa Famintu's, mussarela, chocolate ao leite com ovomaltine.",
          prices: {
            P: 36.0,
            G: 46.0,
            GG: 56.0,
          },
        },
        {
          name: "Chocolate com Disquete",
          ingredients:
            "Massa Famintu's, mussarela, chocolate ao leite, disquete.",
          prices: {
            P: 37.0,
            G: 47.0,
            GG: 57.0,
          },
        },
        {
          name: "Chocolate com Morango",
          ingredients:
            "Massa Famintu's, mussarela, chocolate ao leite, morango fatiado.",
          prices: {
            P: 39.0,
            G: 49.0,
            GG: 59.0,
          },
        },
      ],
      // Preços para bordas
      crustPrices: {
        chocolate: { P: 9.0, G: 11.0, GG: 15.0 },
        "cream-cheese": { P: 9.0, G: 15.0, GG: 20.0 },
        catupiry: { P: 0, G: 0, GG: 0 }, // Borda grátis
      },
    };
  },
  computed: {
    // Verifica se pode adicionar mais sabores, de acordo com o tamanho
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

      console.log(JSON.stringify(carrinho.itensCarrinho));

      const toast = useToast();

      router.push("/");

      toast.success("Adicionado com sucesso!", {
        timeout: 2000,
        position: "top-right",
        icon: false,
        showCloseButtonOnHover: true,
      });
    },

    // Reseta os sabores e a borda ao trocar o tamanho
    resetFlavors() {
      this.selectedFlavors = [];
      this.selectedCrust = "";
    },
    voltar() {
      router.push("/");
    },

    // Calcula o maior preço com base nos sabores e no preço da borda
    getHighestPrice() {
      let highestPrice = 0;

      // Encontra o maior preço entre os sabores selecionados
      this.selectedFlavors.forEach((flavor) => {
        const selectedFlavor = this.flavors.find((f) => f.name === flavor);
        if (selectedFlavor) {
          const price = selectedFlavor.prices[this.selectedSize];
          if (price > highestPrice) {
            highestPrice = price;
          }
        }
      });

      // Adicionar o preço da borda, se aplicável
      if (this.selectedCrust && this.crustPrices[this.selectedCrust]) {
        const crustPrice =
          this.crustPrices[this.selectedCrust][this.selectedSize];
        highestPrice += crustPrice;
      }

      return highestPrice.toFixed(2); // Retorna o preço total formatado
    },
  },
};
</script>

<style scoped>
#butOpcoes {
  background-color: #f25430;
  color: white;
}

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
  color: #f25430;
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
  color: #f25430;
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
  background-color: #f25430;
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
  background-color: #f25430;
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
