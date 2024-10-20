import { defineStore } from "pinia";

// Definindo a função fora da store
function calcularTotal(pedidos) {
  let total = 0;
  let totalItens = 0; // Variável para contar a quantidade total de itens

  pedidos.forEach((pedido) => {
    if (pedido.preco) {
      total += parseFloat(pedido.preco);
      totalItens += 1; // Contar o pedido como um item
    }

    if (pedido.batataFrita) {
      pedido.batataFrita.forEach((item) => {
        if (item.quantidade >= 1) {
          total += item.preco * item.quantidade;
          totalItens += item.quantidade; // Adiciona a quantidade de batatas fritas
        }
      });
    }

    if (pedido.tipos) {
      pedido.tipos.forEach((item) => {
        if (item.quantidade >= 1) {
          total += item.preco * item.quantidade;
          totalItens += item.quantidade; // Adiciona a quantidade de tipos
        }
      });
    }
  });

  // Retorna um objeto com o total e a quantidade de itens
  return {
    total: total.toFixed(2),
    getTotalPedidos: totalItens,
  };
}

// A store carrinhoStore
export const carrinhoStore = defineStore("carrinho", {
  state: () => {
    return {
      burgers: [],
      macarronadas: [],
      batatas: [],
      combos: [],
      bebidas: [],
      sobremesas: [],
      dadosPessoais: {
        nome: "",
        rua: "",
        bairro: "",
        numero: "",
        referencia: "",
        formaDeEntrega: "",
        formaDePagamento: "",
        troco: "",
      },
      pedidos: [],
      valorTotal: 0,
      quantidadeDeItens: 0,
      getTotalPedidos: 0,
      observacao: "",
    };
  },
  getters: {
    carrinhoCompleto(state) {
      return {
        state,
      };
    },
    valorTotal(state) {
      const { total, getTotalPedidos } = calcularTotal(this.itensCarrinho);
      state.getTotalPedidos = getTotalPedidos; // Atualiza a quantidade total na store
      return total;
    },

    itensCarrinho(state) {
      return [
        ...state.burgers,
        ...state.macarronadas,
        ...state.batatas,
        ...state.combos,
        ...state.bebidas,
        ...state.sobremesas,
        ...state.pedidos,
      ];
    },
    valorTotal(state) {
      // Chama a função calcularTotal com os itens do carrinho
      return calcularTotal(this.itensCarrinho);
    },
  },
});
export const produtosStore = defineStore("produto", {
  state: () => {
    return {
      cardDataStore: [
        {
          id: 8,
          nome: "ENTRADAS",
          img: "food6.png",
          descricao: "Para começar bem",
          url: "/combo",
        },
        {
          id: 1,
          nome: "PIZZAS",
          img: "pizza.png",
          descricao: "Monte do seu jeito",
          url: "/burger",
        },
        /*{
          id: 6,
          nome: "BATATA FRITA",
          img: "food3.webp",
          descricao: "No ponto certo",
          url: "/batata",
        },*/
        {
          id: 7,
          nome: "SOBREMESAS",
          img: "food5.png",
          descricao: "Para adoçar",
          url: "/sobremesas",
        },
        {
          id: 4,
          nome: "BEBIDAS",
          img: "food4.png",
          descricao: "Refrescantes",
          url: "/bebidas",
        },
      ],
    };
  },
});

export const produtosStore2 = defineStore("produto2", {
  state: () => {
    return {
      cardDataStore: [
        {
          id: 8,
          nome: "ENTRADAS",
          img: "food6.png",
          descricao: "Combo Completo",
          url: "/combo",
        },
        {
          id: 1,
          nome: "PIZZAS",
          img: "food1.webp",
          descricao: "Para começar bem",
          url: "/burger",
        },
        /*  {
          id: 2,
          nome: "MACARONADA",
          img: "food2.webp",
          descricao: "Monte do seu jeito",
          url: "/macarronada",
        },
       {
          id: 6,
          nome: "BATATA FRITA",
          img: "food3.webp",
          descricao: "No ponto certo",
          url: "/batata",
        },*/
        {
          id: 7,
          nome: "SOBREMESAS",
          img: "food5.png",
          descricao: "Para adoçar",
          url: "/sobremesas",
        },
        {
          id: 4,
          nome: "BEBIDAS",
          img: "food4.png",
          descricao: "Refrescantes",
          url: "/bebidas",
        },
      ],
    };
  },
});
