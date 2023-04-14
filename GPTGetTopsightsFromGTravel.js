// seleciona todos os elementos div pelo nome da classe
const divElements = document.querySelectorAll('.skFvHc.YmWhbc');

// cria uma lista vazia para armazenar os valores capturados
const list = [];

// itera sobre cada elemento div capturado e adiciona o valor do texto à lista
divElements.forEach(divElement => {
  list.push(divElement.innerText);
});

// exibe a lista no console
console.log(list);
