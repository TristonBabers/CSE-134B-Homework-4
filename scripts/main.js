window.addEventListener('DOMContentLoaded', init);

function init() {
    let main = document.querySelectoy('main');
    let r = 0;
    let g = 0;
    let b = 0;

    function rainbow() {
        if (r < 255) {
            r += 1;
        } else {
            r = 0;
        }
        if (g < 255) {
            g += 1;
        } else {
            g = 0;
        }
        if (b < 255) {
            b += 1;
        } else {
            b = 0;
        }
        body.style.backgroundColor = `#${r}${g}${b}`;
    }

    setTimeout(function() {
        rainbow();
    }, 1);
}