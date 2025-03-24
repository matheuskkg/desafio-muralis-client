function buscarPorNomeCpf() {
    const nome = $("#nomeBusca").val();
    const cpf = $("#cpfBusca").val();

    const url = `http://localhost:8080/cliente/by?nome=${nome}&cpf=${cpf}`;

    $.ajax({
        url: url,
        method: "GET",
        success: function(response) {
            if (Array.isArray(response)) {
                limparTabela();

                response.forEach(cliente => {
                    adicionarNaTabela(cliente);
                });
            }
        },
        statusCode: {
            400: function(response) {
                erro = response.responseJSON;

                exibirModal(erro.erros[0]);
            }
        }
    });
}

// Procura um cliente pelo id, os clientes devem estar armazenados na sessionStorage
function buscarPorId(id) {
    const clientes = JSON.parse(sessionStorage.getItem("clientes"));
    return clientes.find(cliente => id === cliente.id);
}

function adicionarNaTabela(cliente) {
    const tableBody = $("#clientes-consulta tbody");

    const row = $("<tr>");

    row.append(`<td>${cliente.nome || 'N/A'}</td>`);
    row.append(`<td>${cliente.cpf || 'N/A'}</td>`);
    row.append(`<td>${cliente.dataNascimento || 'N/A'}</td>`);
    row.append(`<td>${cliente.endereco || 'N/A'}</td>`);

    const botoes = $(`
        <td>
            <div class="d-flex flex-row justify-content-center">
                <button class="btn btn-primary btn-sm mx-1 editar-cliente" data-id="${cliente.id}">Editar</button>
                <button class="btn btn-danger btn-sm mx-1 excluir-cliente" data-id="${cliente.id}">Excluir</button>
                <button class="btn btn-info btn-sm mx-1 contatos-cliente" data-id="${cliente.id}">Contatos</button>
            </div>
        </td>
    `);

    row.append(botoes);

    tableBody.append(row);
}

function limparTabela() {
    $("#clientes-consulta tbody").empty();
}
// Query inicial para carregar a tabela
$.ajax({
    url: "http://localhost:8080/cliente",
    method: "GET",
    success: function(response) {
        if (Array.isArray(response)) {
            limparTabela();

            sessionStorage.setItem("clientes", JSON.stringify(response));
            response.forEach(cliente => {
                adicionarNaTabela(cliente);
            });
        }
    }
});

$("#buscar").on("click", function() {
    buscarPorNomeCpf();
});

$("#cadastrar-cliente").on("click", function () {
    sessionStorage.setItem("operacao", "criar");
});

$(document).on("click", ".editar-cliente", function () {
    sessionStorage.setItem("operacao", "atualizar");
    sessionStorage.setItem("cliente", JSON.stringify(buscarPorId($(this).data("id"))));
    window.location.assign("cadastrar-clientes.html");
});

$(document).on("click", ".excluir-cliente", function () {
    sessionStorage.setItem("operacao", "excluir");
    sessionStorage.setItem("cliente", JSON.stringify(buscarPorId($(this).data("id"))));
    window.location.assign("cadastrar-clientes.html");
});

$(document).on("click", ".contatos-cliente", function () {
    sessionStorage.setItem("cliente", JSON.stringify(buscarPorId($(this).data("id"))));
    window.location.assign("consultar-contatos.html");
});