function exibirModal(conteudo) {
    p = document.createElement('p');
    p.innerHTML = conteudo;
    p.className = 'text-center my-2'

    $('#modal-mensagem-erro-body').empty();
    $('#modal-mensagem-erro-body').append(p)
    $('.bd-example-modal-lg').modal('show');
}
