function validarCPF() {
    let cpf = document.querySelector('#cpf').value.trim()
        
    if (cpf.length !== 11 || !/^\d{11}$/.test(cpf)) {
        const resultadoDiv = document.getElementById('resultado')
        resultadoDiv.textContent = "CPF inválido. Digite apenas números."
        resultadoDiv.classList.remove('valido', 'invalido')
        resultadoDiv.classList.add('erro')
        resultadoDiv.style.display = 'block'
        return
    }

    let primeiroNum = calcularNum(cpf, 10)
    let segundoNum = calcularNum(cpf, 11, primeiroNum)

    const resultadoDiv = document.getElementById('resultado')
    
    if (cpf[9] == primeiroNum && cpf[10] == segundoNum) {
        resultadoDiv.textContent = "CPF Válido!"
        resultadoDiv.classList.remove('erro', 'invalido')
        resultadoDiv.classList.add('valido')
        resultadoDiv.style.display = 'block'
    } else {
        resultadoDiv.textContent = "CPF Inválido!"
        resultadoDiv.classList.remove('valido', 'erro')
        resultadoDiv.classList.add('invalido')
        resultadoDiv.style.display = 'block'
    }
}

function calcularNum(cpf, numDigito, primeiroNum) {
    let multiplicadores

    if (numDigito === 10) {
        multiplicadores = [10, 9, 8, 7, 6, 5, 4, 3, 2]
    } else {
        multiplicadores = [11, 10, 9, 8, 7, 6, 5, 4, 3, 2]
        cpf = cpf + primeiroNum
    }

    let soma = 0;
    for (let i = 0; i < multiplicadores.length; i++) {
        soma += cpf[i] * multiplicadores[i]
    }

    let digito = soma % 11
    return digito < 2 ? 0 : 11 - digito
}
