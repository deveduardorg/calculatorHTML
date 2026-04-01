const visor = document.getElementById("result");

function insert(num) {
  //movendo o conteúdo para dentro da função. Isso significa que ela só guarda o valor de quando a página carregou pela primeira vez (vazio ou o que estiver no HTML). Para a calculadora funcionar, você precisa descobrir o que está no visor no momento exato do clique.
  let conteudo = visor.innerHTML;

  // regra da vírgula
  if (num === ".") {
    if (conteudo === "0" || conteudo === "") {
      visor.innerHTML = "0.";
      return;
    }
    //se o conteúdo já tiver uma vírgula, não pode adicionar outra, com operações mat
    const partes = conteudo.split(/[\+\-\*\/\%\^]/);
    const ultimoNumero = partes[partes.length - 1];
    if (ultimoNumero.includes(".")) {
      return;
    }
  }

  //Regra para substituir o zero inicial por um número
  if (conteudo === "0" && num !== ".") {
    visor.innerHTML = num;
  } else {
    conteudo += num;
    visor.innerHTML = conteudo;
  }
  visor.scrollLeft = visor.scrollWidth;
}
function reset() {
  visor.innerHTML = "0";
}

function deleteNumber() {
  visor.innerHTML = visor.innerHTML.slice(0, -1);
  if (visor.innerHTML === "") {
    visor.innerHTML = "0";
  }
}
function calcular() {
  let expressao = visor.innerHTML;

  try {
    // 1. Faz a conta
    let expressaoTraduzida = expressao.replace(/\^/g, "**");
    let resultado = eval(expressao);

    // 2. Formata o resultado para não quebrar o layout
    if (!Number.isInteger(resultado)) {
      // Se for decimal: limita a 4 casas e remove zeros inúteis no fim
      visor.innerHTML = parseFloat(resultado.toFixed(4));
    } else {
      // Se for inteiro: mostra o número limpo
      visor.innerHTML = resultado;
      visor.scrollLeft = visor.scrollWidth;
    }
  } catch (erro) {
    // 3. Se a conta for impossível, avisa ao usuário
    alert("Expressão inválida!");
    reset();
  }
  // faz com que o evento de pressionar uma tecla seja escutado em todo o documento
}
document.addEventListener("keydown", (event) => {
  const tecla = event.key; // captura a tecla pressionada para a variável tecla
  //verifica se a tecla pressionada é um número ou um operador válido. Se for, chama a função insert para adicionar a tecla ao visor.
  if (tecla === " " || tecla === "Enter") {
    event.preventDefault(); // impede a ação padrão do navegador para a barra de espaço e a tecla Enter, que pode causar rolagem ou submissão de formulário
  }

  if (/[0-9\+\-\*\/\%\^\.]/.test(tecla)) {
    insert(tecla); // chama a função insert passando a tecla como argumento
  }
  if (tecla === "Enter") {
    calcular();
  }
  if (tecla === "Backspace") {
    deleteNumber();
  }
  if (tecla === " ") {
    reset();
  }
});
