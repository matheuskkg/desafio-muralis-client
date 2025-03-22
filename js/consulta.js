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

    const botoes = $("<tr>");

    botoes.append(`<button class="btn btn-primary btn-sm my-1 mx-2" onclick="editarCliente(${cliente.id})">Editar</button>`);
    botoes.append(`<button class="btn btn-danger btn-sm my-1 mx-2" onclick="excluirCliente(${cliente.id})">Excluir</button>`);
    botoes.append(`<button class="btn btn-info btn-sm my-1 mx-2" onclick="contatosCliente(${cliente.id})">Contatos</button>`);

    row.append(botoes);

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

            sessionStorage.setItem("clientes", JSON.stringify(response));
            response.forEach(cliente => {
                adicionarNaTabela(cliente);
            });
        }
    }
});

function editarCliente(id) {
    const clientes = JSON.parse(sessionStorage.getItem("clientes"));
    const cliente = clientes.find(cliente => id === cliente.id);

    sessionStorage.setItem("cliente", JSON.stringify(cliente));
    window.location.assign("cadastrar-clientes.html");
}