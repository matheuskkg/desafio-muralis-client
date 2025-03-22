$("#cadastrar").on("click", function () {
    limparErros();

    const nome = $("#nomeCliente").val();
    const cpf = $("#cpfCliente").val();
    const dataNascimento = $("#dataNascimentoCliente").val();
    const endereco = $("#enderecoCliente").val();

    var erros = 0;

    if (nome.trim() == '') {
        exibirErro('O nome do cliente não pode estar vazio.');
        erros++;
    }

    if (cpf.trim() == '') {
        exibirErro('O CPF do cliente não pode estar vazio.');
        erros++;
    }

    if (cpf.length != 14) {
        exibirErro('O CPF do cliente deve conter 14 caracteres.');
        erros++;
    }

    if (erros) {
        return;
    }

    const cliente = {};
    cliente.nome = nome;
    cliente.cpf = cpf;
    cliente.dataNascimento = (dataNascimento == undefined || dataNascimento.trim() == '') ? null : dataNascimento;
    cliente.endereco = (endereco == undefined || endereco.trim() == '') ? null : endereco;

    $.ajax({
        url: "http://localhost:8080/cliente",
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify(cliente),
        success: function () {
            exibirModal("Cliente cadastrado!");
            limparInputs();
        },
        statusCode: {
            400: function (response) {
                response = response.responseJSON;
                response.erros.forEach(erro => {
                    exibirErro(erro);
                });
            }
        }
    })
});

function limparInputs() {
    $("#nomeCliente").val('');
    $("#cpfCliente").val('');
    $("#dataNascimentoCliente").val('');
    $("#enderecoCliente").val('');
}

function limparErros() {
    $("#validacao-erro").empty();
}

function exibirErro(mensagem) {
    p = document.createElement('p');
    p.innerHTML = mensagem;

    $(p).css('color', 'red');
    $("#validacao-erro").append(p);
}