let data_points = [];
const button = document.getElementById('button');
const done = document.getElementById('done');
const count = document.getElementById('count');
const nope = document.getElementById('nope');
const relative = document.getElementById('relative');
const absolute = document.getElementById('absolute');

if (!('ontouchstart' in window)) {
  nope.style.display = 'block';
  button.style.display = 'none';
  count.style.display = 'none';
}

let device_orientation = {};
let device_orientation_absolute = {};

window.addEventListener('deviceorientation', (event) => {
  relative.children[0].children[1].textContent = event.alpha.toFixed(4);
  relative.children[1].children[1].textContent = event.beta.toFixed(4);
  relative.children[2].children[1].textContent = event.gamma.toFixed(4);

  device_orientation = {
    alpha: event.alpha,
    beta: event.beta,
    gamma: event.gamma,
    absolute: event.absolute
  };
});

window.addEventListener('deviceorientationabsolute', (event) => {
  /*
  if (event.alpha === null) {
    nope.style.display = 'block';
    button.style.display = 'none';
    count.style.display = 'none';
    return;
  }
  */
  absolute.children[0].children[1].textContent = event.alpha.toFixed(4);
  absolute.children[1].children[1].textContent = event.beta.toFixed(4);
  absolute.children[2].children[1].textContent = event.gamma.toFixed(4);

  device_orientation_absolute = {
    alpha: event.alpha,
    beta: event.beta,
    gamma: event.gamma,
    absolute: event.absolute
  };
});

button.addEventListener('click', async () => {
  data_points.push({device_orientation, device_orientation_absolute});
  count.textContent = data_points.length;
  if (data_points.length === 13) {
    const response = await fetch('http://165.227.212.34:20020/', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data_points)
    });
    const json = await response.json();
    if (json.status === 'error') {
      alert(json.message);
    }
    else {
      button.style.display = 'none';
      count.style.display = 'none';
      done.style.display = 'block';
    }
  }
});
