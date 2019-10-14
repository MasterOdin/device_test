const absoluteDiv = document.getElementById('absolute');
const relativeDiv = document.getElementById('relative');

alert('attempting to setup sensors...');
if (navigator.permissions) {
  Promise.all([
    navigator.permissions.query({ name: "accelerometer" }),
    navigator.permissions.query({ name: "magnetometer" }),
    navigator.permissions.query({ name: "gyroscope" })
  ]).then((results) => {
    alert('all permissions queried...');
    if (results.every(result => result.state === 'granted')) {
      alert('all permissions granted...');
      const relative = new RelativeOrientationSensor({frequency: 60});
      let absolute = new AbsoluteOrientationSensor({frequency: 60});
      relative.onreading = () => {
        relativeDiv.innerHTML = `<pre>Relative: ${JSON.stringify(relative.quaternion, null, 2)}</pre>`;
        alert(relative.quaternion);
      };
      relative.onerror = (event) => {
        if (event.error.name === 'NotReadableError') {
          alert('relative sensor not available');
        }
        else {
          alert(event.error.name);
        }
      }
      absolute.onreading = () => {
        absoluteDiv.innerHTML = `<pre>Absolute: ${JSON.stringify(absolute.quaternion, null, 2)}</pre>`
      }
      absolute.onerror = (event) => {
        if (event.error.name === 'NotReadableError') {
          alert('absolute sensor not available');
        }
        else {
          alert(event.error.name);
        }
      }
      relative.start();
      absolute.start();
    }
    else {
      alert('failure...');
    }
  }).catch((err) => {
    alert(err);
  });
}
else {
  alert('Could not find navigator permissions');
}
