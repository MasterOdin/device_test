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
        absoluteDiv.innerHTML = `<pre>${JSON.stringify(absolute.quaternion, null, 2)}</pre>`;
        relativeDiv.innerHTML = `<pre>${JSON.stringify(relative.quaternion, null, 2)}</pre>`;
      });
    }
    else {
      alert('failure...');
    }
  }).catch((err) => {
    alert(err);
  });
}
