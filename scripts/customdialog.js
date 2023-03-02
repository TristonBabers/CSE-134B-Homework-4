window.addEventListener('DOMContentLoaded', init);

function init() {
    // Show Dialog Button Elements
    const alertButton = document.getElementById('alert');
    const confirmButton = document.getElementById('confirm');
    const promptButton = document.getElementById('prompt');

    // Output
    const output = document.querySelector('output');

    // Dialog Elements
    const alertDialog = document.getElementById('alertDialog');
    const confirmDialog = document.getElementById('confirmDialog');
    const promptDialog = document.getElementById('promptDialog');

    // Show Modals
    alertButton.addEventListener('click', alert);
    function alert() {
        alertDialog.showModal();
    }
    // NOT DONE NOT DONE !?!?!?!?!?!?!?!?!?!?!?
    confirmButton.addEventListener('click', confirm);
    function confirm() {
        confirmDialog.showModal();
        setTimeout(() => {
            output.hidden = false;
            let result = querySelector.firstElementChild
            
            output.firstElementChild = output.value;
            output.textContent = `Confirm result: ${result}`;
        }, 0);
    }
    promptButton.addEventListener('click', prompt);
    function prompt() {
        promptDialog.showModal();
    }
}