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

function adicionarNaTabela(cliente) {
    const tableBody = $("#clientes-consulta tbody");

    const row = $("<tr>");

    row.append(`<td>${cliente.nome || 'N/A'}</td>`);
    row.append(`<td>${cliente.cpf || 'N/A'}</td>`);
    row.append(`<td>${cliente.dataNascimento || 'N/A'}</td>`);
    row.append(`<td>${cliente.endereco || 'N/A'}</td>`);

    tableBody.append(row);
}

function limparTabela() {
    $("#clientes-consulta tbody").empty();
}

$("#buscar").on("click", function() {
    buscarPorNomeCpf();
});

$.ajax({
    url: "http://localhost:8080/cliente",
    method: "GET",
    success: function(response) {
        if (Array.isArray(response)) {
            limparTabela();

            response.forEach(cliente => {
                adicionarNaTabela(cliente);
            });
        }
    }
})