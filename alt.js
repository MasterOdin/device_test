const absoluteDiv = document.getElementById('absolute');
const relativeDiv = document.getElementById('relative');

if (navigator.permissions) {
  Promise.all([
    navigator.permissions.query({name: 'accelerometer'}),
    navigator.permissions.query({name: 'magnetometer'}),
    navigator.permissions.query({name: 'gyroscope'})
  ]).then((results) => {
    if (results.every(result => result.state === 'granted')) {
      const relative = new RelativeOrientationSensor({frequency: 60});
      let absolute = new AbsoluteOrientationSensor({frequency: 60});
      relative.addEventListener('reading', () => {

      });
      relative.onreading = () => {
        relativeDiv.innerHTML = `<pre>Relative: ${JSON.stringify(relative.quaternion, null, 2)}</pre>`;
      };
      relative.onerror = (event) => {
        if (event.error.name === 'NotReadableError') {
          alert('relative sensor not available');
        }
      }
      absolute.onreading = () => {
        absoluteDiv.innerHTML = `<pre>Absolute: ${JSON.stringify(absolute.quaternion, null, 2)}</pre>`
      }
      absolute.onerror = (event) => {
        if (event.error.name === 'NotReadableError') {
          alert('absolute sensor not available');
        }
      }
    }
    else {
      alert('failure...');
    }
  }).catch((err) => {
    alert(err);
  });
}
