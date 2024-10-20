import { defineStore } from "pinia";

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
      observacao: "",
    };
  },
  getters: {
    carrinhoCompleto(state) {
      return {
        state,
      };
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
