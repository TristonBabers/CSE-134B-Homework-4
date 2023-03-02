window.addEventListener('DOMContentLoaded', init);

function init() {
    // Select "Show Dialog Button" Elements
    const alertButton = document.getElementById('alert');
    const confirmButton = document.getElementById('confirm');
    const promptButton = document.getElementById('prompt');

    // Output & promptName
    const output = document.querySelector('output');
    const promptName = document.getElementById('promptName');

    // Dialog Elements
    const alertDialog = document.getElementById('alertDialog');
    const confirmDialog = document.getElementById('confirmDialog');
    const promptDialog = document.getElementById('promptDialog');

    // Show Modals
    alertButton.addEventListener('click', alert);
    function alert() {
        output.hidden = true;
        alertDialog.showModal();
    }
    confirmButton.addEventListener('click', confirm);
    function confirm() {
        output.hidden = true;
        confirmDialog.showModal();
    }
    promptButton.addEventListener('click', prompt);
    function prompt() {
        output.hidden = true;
        promptDialog.showModal();
    }

    // Change Text when Closing Dialogs
    confirmDialog.addEventListener('close', (event) => {
        output.textContent = `Confirm result: ${confirmDialog.returnValue}`;
        output.hidden = false;
    });
    promptDialog.addEventListener('close', (event) => {
        let result = promptName.value;
        if (result === '' || result === null || (promptDialog.returnValue === 'cancel')) {
            output.innerHTML = 'User didn’t enter anything';
        } else {
            let clean = DOMPurify.sanitize(result);
            output.innerHTML = `Prompt Result: ${clean}`;
        }
        output.hidden = false;
    });
}