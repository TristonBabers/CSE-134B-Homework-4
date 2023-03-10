window.addEventListener('DOMContentLoaded', init);

function init() {
    const alert = document.getElementById('alert');
    const confirm = document.getElementById('confirm');
    const prompt = document.getElementById('prompt');
    const saferPrompt = document.getElementById('saferPrompt');
    const output = document.querySelector('output');
    
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
            output.firstElementChild = output.value;
            output.textContent = `Confirm result: ${result}`;
        }, 0);
    });

    prompt.addEventListener('click', function(e) {
        output.hidden = true;

        setTimeout(() => {
            output.hidden = false;
            let result = window.prompt('What is your name?');
            output.firstElementChild = output.value;
            if (result === '' || result === null) {
                output.innerHTML = 'User didn’t enter anything';
            } else {
                output.innerHTML = `Prompt Result: ${result}`;
            }
        }, 0);
    });

    saferPrompt.addEventListener('click', (e) => {
        output.hidden = true;

        setTimeout(() => {
            output.hidden = false;
            let result = window.prompt('What is your name?');
            output.firstElementChild = output.value;
            if (result === '' || result === null) {
                output.innerHTML = 'User didn’t enter anything';
            } else {
                let clean = DOMPurify.sanitize(result);
                output.innerHTML = `Prompt Result: ${clean}`;
            }
        }, 0);
    });
}