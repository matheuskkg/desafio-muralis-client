class FormCliente extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
            <div class="container">
                <div class="row d-flex justify-content-center align-items-center" style="height: 80vh;">
                    <div class="col-6">
                        <form>
                            <div class="form-group">
                                <label for="nomeCliente">Nome do cliente</label>
                                <input type="text" class="form-control" id="nomeCliente" placeholder="Nome do cliente">
                            </div>
                            <div class="form-group">
                                <label for="cpfCliente">CPF</label>
                                <input type="text" oninput="this.value = mask_cpf(this.value)" maxlength="14" class="form-control" id="cpfCliente" placeholder="123.456.789-00">
                            </div>
                            <div class="form-group">
                                <label for="dataNascimentoCliente">Data de nascimento</label>
                                <input type="date" onfocus="this.max=new Date().toISOString().split('T')[0]" class="form-control" id="dataNascimentoCliente">
                            </div>
                            <div class="form-group">
                                <label for="enderecoCliente">Endereço do cliente</label>
                                <input type="text" class="form-control" id="enderecoCliente" placeholder="Rua Abacaxi, 123">
                            </div>
                            <div class="form-group form-check">
                                <small class="form-text text-muted">* representa campos obrigatórios.</small>
                            </div>
                            <button type="submit" id="salvar" class="btn btn-primary">Cadastrar</button>
                        </form>
                        <div class="my-2" style="min-height: 100px;">
                            <small class="form-text text-muted" id="validacao-erro"></small>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}

customElements.define('form-cliente', FormCliente);