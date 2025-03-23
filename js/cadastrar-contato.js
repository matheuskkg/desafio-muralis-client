function preencherInputsContato(contato) {
    $("input[type='radio'][name='tipoContato'][value='" + contato.tipo.tipo + "']").prop("checked", true);
    $("#contato").val(contato.valor);
    $("#observacao").val(contato.observacao);
}

$("#modal-mensagem-erro").on("hidden.bs.modal", function () {
    window.location.replace("consultar-contatos.html");
});

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
    }

    if (operacao === "editar") {
        const contatoEditar = JSON.parse(sessionStorage.getItem("contato"));
        preencherInputsContato(contatoEditar);

        url += "/" + contatoEditar.id;
        method = "PUT";
    }

    if (operacao === "excluir") {
        const contatoExcluir = JSON.parse(sessionStorage.getItem("contato"));
        preencherInputsContato(contatoExcluir);

        url += "/" + contatoExcluir.id;
        method = "DELETE";

        $("#salvar").removeClass("btn-primary").addClass("btn-danger").text("Excluir");
        $("input").prop("disabled", true);
    }
});

$("#salvar").on("click", function (e) {
    if (operacao === "excluir") {
        $.ajax({
            url: url,
            method: method,
            success: function () {
                exibirModal("Contato excluido!");
                return;
            }
        });
    }

    e.preventDefault();
    limparErros();

    const tipoContato = $("input[type='radio'][name='tipoContato']:checked").val();
    const contatoValor = $("#contato").val();
    const observacao = $("#observacao").val();

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
                    console.log(response.erros);
                    exibirErro(erro);
                });
            }
        }
    });
});