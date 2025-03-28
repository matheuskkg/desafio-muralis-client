function preencherInputsContato(contato) {
    $("input[type='radio'][name='tipoContato'][value='" + contato.tipo + "']").prop("checked", true);
    $("#contato").val(contato.valor);
    $("#observacao").val(contato.observacao);
}

function validarInputsContato(tipo, valor) {
    if (valor.trim() === '') {
        exibirErro("Deve ser inserido o e-mail/telefone.");

        return false;
    }

    if (tipo === 'e-mail') {
        const regex = new RegExp("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$");
        
        if (!regex.test(valor)) {
            exibirErro("E-mail inválido.");
            return false;
        }
    }

    if (tipo === 'telefone') {
        const regex = new RegExp(/^\d+$/);

        if (!regex.test(valor)) {
            exibirErro("Telefone inválido.");
            return false;
        }
    }

    return true;
}

const cliente = JSON.parse(sessionStorage.getItem("cliente"));

$("#nomeCliente").val(cliente.nome);
$("#cpfCliente").val(cliente.cpf);
$("#dataNascimentoCliente").val(cliente.dataNascimento);
$("#enderecoCliente").val(cliente.endereco);

let url = "http://localhost:8080/cliente/contato";
let method;
const operacao = sessionStorage.getItem("operacao");
$(document).ready(function () {
    if (operacao === "criar") {
        method = "POST";
        $("#salvar").addClass("btn btn-primary").text("Cadastrar");
    }

    if (operacao === "editar") {
        const contatoEditar = JSON.parse(sessionStorage.getItem("contato"));
        preencherInputsContato(contatoEditar);

        url += "/" + contatoEditar.id;
        method = "PUT";
        $("#salvar").addClass("btn btn-primary").text("Editar");
    }

    if (operacao === "excluir") {
        const contatoExcluir = JSON.parse(sessionStorage.getItem("contato"));
        preencherInputsContato(contatoExcluir);

        url += "/" + contatoExcluir.id;
        method = "DELETE";

        $("#salvar").addClass("btn btn-danger").text("Excluir");
        $("input").prop("disabled", true);
    }
});

$("#salvar").on("click", function (e) {
    limparErros();

    const tipoContato = $("input[type='radio'][name='tipoContato']:checked").val();
    const contatoValor = $("#contato").val();
    const observacao = $("#observacao").val();

    if (!validarInputsContato(tipoContato, contatoValor)) {
        return;
    }

    const contato = {};
    contato.cliente = cliente;
    contato.tipo = tipoContato;
    contato.valor = contatoValor;
    contato.observacao = observacao;

    $.ajax({
        url: url,
        method: method,
        contentType: "application/json",
        data: JSON.stringify(contato),
        success: function () {
            exibirModal("Contato salvo!");
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
    window.location = "consultar-contatos.html";
});