//https://gist.github.com/fernandovaller/b10a3be0e7b3b46e5895b0f0e75aada5
function mask_cpf(v) {
    v = v.replace(/\D/g, "")
    v = v.replace(/(\d{3})(\d)/, "$1.$2")
    v = v.replace(/(\d{3})(\d)/, "$1.$2")
    v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2")

    return v
}

function exibirModal(conteudo) {
    p = document.createElement('p');
    p.innerHTML = conteudo;
    p.className = 'text-center my-2'

    $('#modal-mensagem-erro-body').empty();
    $('#modal-mensagem-erro-body').append(p)
    $('.bd-example-modal-lg').modal('show');
}

function exibirErro(mensagem) {
    p = document.createElement('p');
    p.innerHTML = mensagem;

    $(p).css('color', 'red');
    $("#validacao-erro").append(p);
}

function limparErros() {
    $("#validacao-erro").empty();
}

$("form-cliente, form").submit(function (e) {
    e.preventDefault();
});

