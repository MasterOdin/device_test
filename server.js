document.addEventListener('DOMContentLoaded', () => {
    console.log('Set listener for changes in device orientation...');
    for (let listener of ['deviceorientation', 'deviceorientationabsolute']) {        
        window.addEventListener(listener, (event) => {
            document.getElementById(listener + '-absolute').innerText = "" + event.absolute;
            document.getElementById(listener + '-alpha').innerText = "" + Math.round(event.alpha);
            document.getElementById(listener + '-beta').innerText = "" + Math.round(event.beta);
            document.getElementById(listener + '-gamma').innerText = "" + Math.round(event.gamma);
        });
    }
});
