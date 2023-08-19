// variáveis:
const sectionCadastro = document.getElementById("cadastro");
const sectionEndereco = document.getElementById("endereco");
const botaoFechar = document.getElementById("fechar");
const botaoFecharEndereco = document.getElementById("fecharEndereco");
const botaoContinuar = document.getElementById("continuar");
const botaoEnviar = document.getElementById("enviar");
const botaoConcluir = document.getElementById("concluir");
const inputNome = document.getElementById("nome");
const inputNomeCompleto = document.getElementById("nomeCompleto");
const inputIdade = document.getElementById("idade");
const inputCpf = document.getElementById("cpf");
const inputSenha = document.getElementById("senha");
const inputEmail = document.getElementById("email");
const inputCep = document.getElementById("cep");
const inputEndereco = document.getElementById("logradouro");
const inputBairro = document.getElementById("bairro");
const inputCidade = document.getElementById("cidade");
const inputNumero = document.getElementById("numero");

//funções :
function fecharSectionCadastro() {
  sectionCadastro.style.right = "-100vw";

  limparCampos();
  removerClassHabilitar();
}

function fecharSectionEndereco() {
  sectionEndereco.style.right = "-100vw";
  limparCamposEndereco();
  removerClassHabilitar();
  fecharSectionCadastro();
}

function abrirSectionCadastro() {
  sectionCadastro.style.display = "flex";
  sectionCadastro.style.right = "0";
  inputIdade.focus();
}

function abrirSectionEndereco() {
  sectionEndereco.style.display = "flex";
  sectionEndereco.style.right = "0";
}

function habilitarBotaoContinuar() {
  if (inputNome.value.length >= 3) {
    botaoContinuar.disabled = false;
    botaoContinuar.classList.add("habilitar");
  } else {
    botaoContinuar.disabled = true;
    botaoContinuar.classList.remove("habilitar");
  }
}

function enviarNome() {
  inputNomeCompleto.value = inputNome.value;
}

function limparCampos() {
  inputNome.value = "";
  inputNomeCompleto.value = "";
  inputIdade.value = "";
  inputCpf.value = "";
  inputSenha.value = "";
  inputEmail.value = "";
}

function limparCamposEndereco() {
  inputCep.value = "";
  inputEndereco.value = "";
  inputBairro.value = "";
  inputCidade.value = "";
  inputNumero.value = "";
}

function validarCampos() {
  if (
    inputNomeCompleto.value != "" &&
    inputIdade.value >= 18 &&
    inputCpf.value != "" &&
    inputSenha.value != "" &&
    inputEmail.value != ""
  ) {
    habilitarBotaoEnviar();
  }
}

function validarCamposEndereco() {
  if (
    inputCep.value != "" &&
    inputCep.value.length == 8 &&
    inputEndereco.value != "" &&
    inputBairro.value != "" &&
    inputCidade.value != "" &&
    inputNumero.value != ""
  ) {
    habilitarBotaoConcluir();
  }
}

function habilitarBotaoEnviar() {
  botaoEnviar.disabled = false;
  botaoEnviar.classList.add("habilitar");
}

function habilitarBotaoConcluir() {
  botaoConcluir.disabled = false;
  botaoConcluir.classList.add("habilitar");
}

function removerClassHabilitar() {
  botaoContinuar.classList.remove("habilitar");
  botaoEnviar.classList.remove("habilitar");
  botaoContinuar.disabled = true;
  botaoEnviar.disabled = true;
}

function formatarCPF() {
  let value = inputCpf.value.replace(/\D/g, "");

  if (value.length > 11) {
    value = value.slice(0, 11);
  }

  if (value.length > 9) {
    value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  } else if (value.length > 6) {
    value = value.replace(/(\d{3})(\d{3})(\d{3})/, "$1.$2.$3");
  } else if (value.length > 3) {
    value = value.replace(/(\d{3})(\d{3})/, "$1.$2");
  }

  inputCpf.value = value;
}

function validarQuantidadeDigitos() {
  const cpf = inputCpf.value.replace(/[.-]/g, "");
  if (cpf < 11) {
    return false;
  }
  return true;
}

function validarPrimeiroDigitoVerificador() {
  let soma = 0;
  const cpf = inputCpf.value.replace(/[.-]/g, "");
  soma += cpf[0] * 10;
  soma += cpf[1] * 9;
  soma += cpf[2] * 8;
  soma += cpf[3] * 7;
  soma += cpf[4] * 6;
  soma += cpf[5] * 5;
  soma += cpf[6] * 4;
  soma += cpf[7] * 3;
  soma += cpf[8] * 2;

  const resto = soma % 11;

  let primeiroDigito = 0;

  if (resto > 2) {
    primeiroDigito = 11 - resto;
  }

  if (primeiroDigito == cpf[9]) {
    return true;
  }
  return false;
}

function validarSegundoDigitoVerificador() {
  let soma = 0;
  const cpf = inputCpf.value.replace(/[.-]/g, "");
  soma += cpf[0] * 11;
  soma += cpf[1] * 10;
  soma += cpf[2] * 9;
  soma += cpf[3] * 8;
  soma += cpf[4] * 7;
  soma += cpf[5] * 6;
  soma += cpf[6] * 5;
  soma += cpf[7] * 4;
  soma += cpf[8] * 3;
  soma += cpf[9] * 2;

  const resto = soma % 11;

  let segundoDigito = 0;

  if (resto > 2) {
    segundoDigito = 11 - resto;
  }

  if (segundoDigito == cpf[10]) {
    return true;
  }
  return false;
}

function validarRepetidos() {
  const cpf = inputCpf.value.replace(/[.-]/g, "");
  const primeiroDigito = cpf[0];
  let diferente = false;

  for (let i = 1; i < cpf.length; i++) {
    if (primeiroDigito != cpf[i]) {
      diferente = true;
    }
  }
  return diferente;
}

function validarCpf() {
  if (validarQuantidadeDigitos() == false) {
    alert("CPF inválido");
    return false;
  }
  if (validarPrimeiroDigitoVerificador() == false) {
    alert("Primeiro dígito inválido");
    return false;
  }
  if (validarSegundoDigitoVerificador() == false) {
    alert("Segundo dígito inválido");
    return false;
  }
  if (validarRepetidos() == false) {
    alert("Dígitos repetidos");
    return false;
  }
  alert("CPF válido!");
  return true;
}

// eventos :
botaoFechar.addEventListener("click", fecharSectionCadastro);

botaoFecharEndereco.addEventListener("click", function () {
  fecharSectionEndereco();
});

botaoContinuar.addEventListener("click", function (evento) {
  evento.preventDefault();
  enviarNome();
  abrirSectionCadastro();
});

botaoEnviar.addEventListener("click", function (evento) {
  evento.preventDefault();
  abrirSectionEndereco();
});

botaoConcluir.addEventListener("click", function (evento) {
  evento.preventDefault();
  alert("Cadastro concluído com Sucesso!");
  fecharSectionEndereco();
});

inputNome.addEventListener("input", habilitarBotaoContinuar);

inputNomeCompleto.addEventListener("input", validarCampos);
inputIdade.addEventListener("input", validarCampos);
inputCpf.addEventListener("input", function () {
  validarCampos();
  formatarCPF();
});

inputSenha.addEventListener("input", validarCampos);
inputEmail.addEventListener("input", validarCampos);

inputCep.addEventListener("input", validarCamposEndereco);
inputEndereco.addEventListener("input", validarCamposEndereco);
inputBairro.addEventListener("input", validarCamposEndereco);
inputCidade.addEventListener("input", validarCamposEndereco);
inputNumero.addEventListener("input", validarCamposEndereco);

inputCep.addEventListener("focusout", async () => {
  const resposta = await fetch(
    `https://viacep.com.br/ws/${inputCep.value}/json/`
  );
  const respostaJson = await resposta.json();

  inputEndereco.value = respostaJson.logradouro;
  inputBairro.value = respostaJson.bairro;
  inputCidade.value = respostaJson.localidade;
});

inputCpf.addEventListener("focusout", function () {
  validarCpf();
});
