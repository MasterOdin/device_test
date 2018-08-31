document.addEventListener('DOMContentLoaded', () => {
    console.log('Set listener for changes in device orientation...');
    for (let event of ['deviceorientation', 'deviceorientationabsolute']) {        
        window.addEventListener('deviceorientationabsolute', (event) => {
            document.getElementById(event + '-absolute').innerText = "" + event.absolute;
            document.getElementById(event + '-alpha').innerText = "" + Math.round(event.alpha);
            document.getElementById(event + '-beta').innerText = "" + Math.round(event.beta);
            document.getElementById(event + '-gamma').innerText = "" + Math.round(event.gamma);
        });
    }
});
