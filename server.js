document.addEventListener('DOMContentLoaded', () => {
    console.log('Set listener for changes in device orientation...');
    window.addEventListener('deviceorientationabsolute', (event) => {
        console.log('New Orientation:');
        console.log('    Absolute: ' + event.absolute);
        console.log('    Alpha   : ' + event.alpha);
        console.log('    Beta    : ' + event.beta);
        console.log('    Gamma   : ' + event.gamma);
        document.getElementById('absolute').innerText = "" + event.absolute;
        document.getElementById('alpha').innerText = "" + Math.round(event.alpha);
        document.getElementById('beta').innerText = "" + Math.round(event.beta);
        document.getElementById('gamma').innerText = "" + Math.round(event.gamma);
    }, true);
});
