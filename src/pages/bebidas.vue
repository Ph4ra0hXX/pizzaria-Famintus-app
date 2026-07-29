<script>
import { ref, watch, onUpdated } from "vue";
import { carrinhoStore } from "../store/produtos";
import { useToast } from "vue-toastification";
import router from "../router/index";

export default {
  setup() {
    const toast = useToast();

    const carrinho = carrinhoStore();

    const Bebidas = ref({
      tipos: [
        { categoria: "Bebidas", nome: "Coca lata", quantidade: 0, preco: 7 },
        {
          categoria: "Bebidas",
          nome: "Coca lata zero",
          quantidade: 0,
          preco: 7,
        },
        { categoria: "Bebidas", nome: "Coca 600ml", quantidade: 0, preco: 9 },
        {
          categoria: "Bebidas",
          nome: "Coca 600ml zero",
          quantidade: 0,
          preco: 9,
        },
        { categoria: "Bebidas", nome: "Skol 600ml", quantidade: 0, preco: 15 },
        {
          categoria: "Bebidas",
          nome: "Heineken 330ml",
          quantidade: 0,
          preco: 15,
        },
        {
          categoria: "Bebidas",
          nome: "Budweiser 330ml",
          quantidade: 0,
          preco: 14,
        },
        { categoria: "Bebidas", nome: "Coca 1l", quantidade: 0, preco: 12 },
        {
          categoria: "Bebidas",
          nome: "Coca 1l zero",
          quantidade: 0,
          preco: 12,
        },
        { categoria: "Bebidas", nome: "Cajuína 1l", quantidade: 0, preco: 12 },
        { categoria: "Sucos", nome: "Suco de Goiaba Copo", quantidade: 0, preco: 7 },
        { categoria: "Sucos", nome: "Suco de Goiaba Jarra", quantidade: 0, preco: 13 },
        { categoria: "Sucos", nome: "Suco de Manga Copo", quantidade: 0, preco: 7 },
        { categoria: "Sucos", nome: "Suco de Manga Jarra", quantidade: 0, preco: 13 },
        { categoria: "Sucos", nome: "Suco de Abacaxi Copo", quantidade: 0, preco: 7 },
        { categoria: "Sucos", nome: "Suco de Abacaxi Jarra", quantidade: 0, preco: 13 },
        { categoria: "Sucos", nome: "Suco de Acerola Copo", quantidade: 0, preco: 7 },
        { categoria: "Sucos", nome: "Suco de Acerola Jarra", quantidade: 0, preco: 13 },
        { categoria: "Sucos", nome: "Suco de Maracujá Copo", quantidade: 0, preco: 8 },
        { categoria: "Sucos", nome: "Suco de Maracujá Jarra", quantidade: 0, preco: 15 },
        { categoria: "Sucos", nome: "Suco de Cajá Copo", quantidade: 0, preco: 7 },
        { categoria: "Sucos", nome: "Suco de Cajá Jarra", quantidade: 0, preco: 13 },
        { categoria: "Sucos", nome: "Suco de Umbu Copo", quantidade: 0, preco: 7 },
        { categoria: "Sucos", nome: "Suco de Umbu Jarra", quantidade: 0, preco: 13 },
        {
          categoria: "Vitaminas",
          nome: "Vitamina de Maracujá Copo",
          quantidade: 0,
          preco: 13,
        },
        {
          categoria: "Vitaminas",
          nome: "Vitamina de Maracujá Jarra",
          quantidade: 0,
          preco: 26,
        },
        {
          categoria: "Vitaminas",
          nome: "Vitamina de Goiaba Copo",
          quantidade: 0,
          preco: 11,
        },
        {
          categoria: "Vitaminas",
          nome: "Vitamina de Goiaba Jarra",
          quantidade: 0,
          preco: 22,
        },
      ],
    });

    function filtrarPorCategoria(categoria) {
      return Bebidas.value.tipos.filter((item) => item.categoria === categoria);
    }

    function salvarPedido() {
      carrinho.bebidas.push(Bebidas.value);

      router.push("/");

      toast.success("Adicionado com sucesso!", {
        timeout: 2000,
        position: "top-right",
        icon: false,
        showCloseButtonOnHover: true,
      });
    }

    function voltar() {
      router.push("/");
    }

    return {
      Bebidas,
      filtrarPorCategoria,
      salvarPedido,
      voltar,
    };
  },
};
</script>

<template>
  <div id="cardapio">
    <div id="listar">
      <div class="dotted-line">
        <hr />
        <span id="textDividers">Bebidas</span>
        <hr />
      </div>
      <div v-for="item in filtrarPorCategoria('Bebidas')" :key="item.nome">
        <button class="botao1" @click="item.quantidade++">+</button>

        <button
          v-if="item.quantidade > 0"
          class="botao2"
          @click="item.quantidade--"
        >
          -
        </button>

        <label style="pointer-events: none" id="nomeItem" for="adicional"
          ><span id="quantidadeDiv">{{ item.quantidade }}x</span>
          {{ item.nome }}</label
        >
        <label id="preco">R$: {{ item.preco.toFixed(2) }}</label>
        <p id="itens"></p>
        <br />
      </div>

      <div class="dotted-line">
        <hr />
        <span id="textDividers">Sucos</span>
        <hr />
      </div>
      <div v-for="item in filtrarPorCategoria('Sucos')" :key="item.nome">
        <button class="botao1" @click="item.quantidade++">+</button>

        <button
          v-if="item.quantidade > 0"
          class="botao2"
          @click="item.quantidade--"
        >
          -
        </button>

        <label style="pointer-events: none" id="nomeItem" for="adicional"
          ><span id="quantidadeDiv">{{ item.quantidade }}x</span>
          {{ item.nome }}</label
        >
        <label id="preco">R$: {{ item.preco.toFixed(2) }}</label>
        <p id="itens"></p>
        <br />
      </div>

      <div class="dotted-line">
        <hr />
        <span id="textDividers">Vitaminas</span>
        <hr />
      </div>
      <div v-for="item in filtrarPorCategoria('Vitaminas')" :key="item.nome">
        <button class="botao1" @click="item.quantidade++">+</button>

        <button
          v-if="item.quantidade > 0"
          class="botao2"
          @click="item.quantidade--"
        >
          -
        </button>

        <label style="pointer-events: none" id="nomeItem" for="adicional"
          ><span id="quantidadeDiv">{{ item.quantidade }}x</span>
          {{ item.nome }}</label
        >
        <label id="preco">R$: {{ item.preco.toFixed(2) }}</label>
        <p id="itens"></p>
        <br />
      </div>

      <button @click="salvarPedido" id="butOpcoes" type="submit" value="Submit">
        adicionar
      </button>

      <button id="butOpcoes2" @click="voltar()" type="submit" value="Submit">
        voltar
      </button>
    </div>
  </div>
</template>

<style>
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
  font-family: "Great Vibes";
  font-size: 40px;
  font-weight: lighter;
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
