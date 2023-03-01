
window.addEventListener('DOMContentLoaded', init);

function init() {
    let alert = document.getElementById('alert');
    let confirm = document.getElementById('confirm');
    let prompt = document.getElementById('prompt');
    let saferPrompt = document.getElementById('saferPrompt');
    let field = document.querySelector('textarea');
    let output = document.querySelector('output');
    
    alert.addEventListener('click', (e) => {
        output.hidden = true;

        setTimeout(() => {
            window.alert('Alert generated!');
        }, 0);
    });

    confirm.addEventListener('click', function(e) {
        output.hidden = true;

        setTimeout(() => {
            output.hidden = false;
            let result = window.confirm('Do you confirm this?');
            output.firstElementChild = field.value;
            output.textContent = `Confirm result: ${result}`;
        }, 0);
    });

    prompt.addEventListener('click', function(e) {
        output.hidden = true;

        setTimeout(() => {
            output.hidden = false;
            let result = window.prompt('What is your name?');
            output.firstElementChild = field.value;
            if (result === '' || result === null) {
                output.innerHTML = 'User didn’t enter anything';
            } else {
                output.innerHTML = `Prompt Result: ${result}`;
            }
        }, 0);
    });

    saferPrompt.addEventListener('click', function(e) {
        output.hidden = true;

        setTimeout(() => {
            output.hidden = false;
            let result = window.prompt('What is your name?');
            output.firstElementChild = field.value;
            if (result === '' || result === null) {
                output.textContent = 'User didn’t enter anything';
            } else {
                let clean = DOMPurify.sanitize(result);
                output.textContent = `Prompt Result: ${clean}`;
            }
        }, 0);
    });
}