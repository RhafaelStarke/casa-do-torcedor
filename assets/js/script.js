//seleciona o formulário e a mensagem de feedback.
const form = document.querySelector('.signup-form');
const submitButton = document.getElementById('submit-btn');
const toast = document.getElementById('toast-notification');
let toastTimeout;

function showToast(message, isSuccess = true) {
    clearTimeout(toastTimeout);

    toast.textContent = message;
    toast.className = isSuccess ? 'success' : 'error';

    toast.classList.add('show');

    toastTimeout = setTimeout(() => {
        toast.classList.remove('show');
    }, 5000);
}

//adiciona um "ouvinte" para o evento de envio do formulário
submitButton.addEventListener('click', async () => {

    //pega os inputs diretamente pelo seu atributo 'name'.
    const emailInput = form.querySelector('input[name="email"]');
    const timeInput = form.querySelector('select[name="time"]');

    //pega o valor de cada input.
    const email = emailInput.value;
    const time = timeInput.value;

    if (!email || !time) {
        showToast('Por favor, preencha seu time e e-mail.', false);
        return;
    }

    try {
        //envia os dados para o backend usando a API Fetch
        const response = await fetch('https://formspree.io/f/movnlrpv', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({time, email}),
        });

        const result = await response.json();

        if (response.ok) {
            form.reset();
            showToast('Inscrição realizada com sucesso!', true);
        } else {
            showToast('Houve um erro ao enviar. Tente novamente.', false);
        }

    } catch (error) {
        console.error('Erro de conexão: ', error);
        showToast('Erro de conexão com o servidor.', false);
    }

});
