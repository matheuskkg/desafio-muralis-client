//https://gist.github.com/fernandovaller/b10a3be0e7b3b46e5895b0f0e75aada5
function mask_cpf(v) {
    v = v.replace(/\D/g, "")
    v = v.replace(/(\d{3})(\d)/, "$1.$2")
    v = v.replace(/(\d{3})(\d)/, "$1.$2")
    v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2")

    return v
}
