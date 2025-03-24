function preencherInputsCliente(cliente) {
    $("#nomeCliente").val(cliente.nome);
        $("#cpfCliente").val(cliente.cpf);
        $("#dataNascimentoCliente").val(cliente.dataNascimento);
        $("#enderecoCliente").val(cliente.endereco);
}

function validarInputsCliente(nome, cpf) {
    let erros = 0;

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

    return !erros > 0;
}

const operacao = sessionStorage.getItem("operacao");
let url = "http://localhost:8080/cliente";
let method;

$(document).ready(function () {
    if (operacao === "criar") {
        method = "POST";

        $("#salvar").addClass("btn btn-primary").text("Cadastrar");
    } 
    
    if (operacao === "atualizar") {
        const clienteEditar = JSON.parse(sessionStorage.getItem('cliente'));
        preencherInputsCliente(clienteEditar);

        url += "/" + clienteEditar.id;
        method = "PUT";

        $("#salvar").addClass("btn btn-primary").text("Editar");
    }

    if (operacao === "excluir") {
        const clienteExcluir = JSON.parse(sessionStorage.getItem('cliente'));
        preencherInputsCliente(clienteExcluir);

        url += "/" + clienteExcluir.id;
        method = "DELETE";

        $("#salvar").addClass("btn btn-danger").text("Excluir");
        $("input").prop("disabled", true)
    }
});

$(document).on("click", "#salvar", function () {
    limparErros();

    const nome = $("#nomeCliente").val();
    const cpf = $("#cpfCliente").val();
    const dataNascimento = $("#dataNascimentoCliente").val();
    const endereco = $("#enderecoCliente").val();

    if (!validarInputsCliente(nome, cpf)) {
        return;
    }

    const cliente = {};
    cliente.nome = nome;
    cliente.cpf = cpf;
    cliente.dataNascimento = (dataNascimento == undefined || dataNascimento.trim() == '') ? null : dataNascimento;
    cliente.endereco = (endereco == undefined || endereco.trim() == '') ? null : endereco;

    $.ajax({
        url: url,
        method: method,
        contentType: "application/json",
        data: JSON.stringify(cliente),
        success: function () {
            exibirModal("Cliente salvo!");
        },
        statusCode: {
            400: function (response) {
                response = response.responseJSON;
                response.erros.forEach(erro => {
                    exibirErro(erro);
                });
            }
        }
    });
});

$(".modal").on("hidden.bs.modal", function () {
    window.location = "consultar-clientes.html";
});