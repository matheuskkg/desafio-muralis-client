function adicionarNaTabela(contato) {
    const tableBody = $("#contatos-consulta tbody");

    const row = $("<tr>");

    row.append(`<td>${contato.tipo}</td>`);
    row.append(`<td>${contato.valor}</td>`);
    row.append(`<td>${contato.observacao || 'N/A'}</td>`);

    const botoes = $(`
        <td>
            <div class="d-flex flex-row justify-content-center">
                <button class="btn btn-primary btn-sm mx-1 editar-contato" data-id="${contato.id}">Editar</button>
                <button class="btn btn-danger btn-sm mx-1 excluir-contato" data-id="${contato.id}">Excluir</button>
            </div>
        </td>
    `);

    row.append(botoes);

    tableBody.append(row);
}

const cliente = JSON.parse(sessionStorage.getItem("cliente"));

$("#nomeCliente").val(cliente.nome);
$("#cpfCliente").val(cliente.cpf);
$("#dataNascimentoCliente").val(cliente.dataNascimento);
$("#enderecoCliente").val(cliente.endereco);

$.ajax({
    url: "http://localhost:8080/cliente/contato/" + parseInt(cliente.id),
    method: "GET",
    success: function(response) {
        if (Array.isArray(response)) {
            sessionStorage.setItem("contatos", JSON.stringify(response));
            response.forEach(contato => {
                adicionarNaTabela(contato);
            });
        }
    }
});

$("#cadastrar-contato").on("click", function () {
    sessionStorage.setItem("operacao", "criar");
    window.location.assign("cadastrar-contatos.html");
});

$(document).on("click", ".editar-contato", function () {
    const id = $(this).data("id");
    const contatos = JSON.parse(sessionStorage.getItem("contatos"));
    const contato = contatos.find(contato => id === contato.id);
    sessionStorage.setItem("contato", JSON.stringify(contato));
    sessionStorage.setItem("operacao", "editar");
    window.location.assign("cadastrar-contatos.html");
});

$(document).on("click", ".excluir-contato", function () {
    const id = $(this).data("id");
    const contatos = JSON.parse(sessionStorage.getItem("contatos"));
    const contato = contatos.find(contato => id === contato.id);
    sessionStorage.setItem("contato", JSON.stringify(contato));
    sessionStorage.setItem("operacao", "excluir");
    window.location.assign("cadastrar-contatos.html");
});