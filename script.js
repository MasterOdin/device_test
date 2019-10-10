let data_points = [];
const button = document.getElementById('button');
const instructions_button = document.getElementById('instructions_general_button');
const debug = document.getElementById('debug');
const step = document.getElementById('step_num');
const done = document.getElementById('done');
const count = document.getElementById('count');
const nope = document.getElementById('nope');
const relative = document.getElementById('relative');
const absolute = document.getElementById('absolute');

/*
if (!('ontouchstart' in window)) {
  nope.style.display = 'block';
  button.style.display = 'none';
  count.style.display = 'none';
}
*/

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
  document.getElementById(`step_${data_points.length}`).style.display = 'none';
  data_points.push({device_orientation, device_orientation_absolute});
  let next_step = document.getElementById(`step_${data_points.length}`);

  step.textContent = data_points.length;
  count.textContent = data_points.length;
  if (!next_step || data_points.length === 6) {
    button.style.display = 'none';
    count.style.display = 'none';
    done.style.display = 'block';
    try {
      const response = await fetch('https://data.mpeveler.com/', {
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
    }
    catch (exc) {
      alert("Failed to save data.");
    }
  }
  else {
    next_step.style.display = 'block';
  }
});

instructions_button.addEventListener('click', () => {
  document.getElementById('instructions_general').style.display = 'none';
  document.getElementById('instructions').style.display = 'block';

  content.style.display = 'block';
  button.style.display = 'block';
  count.style.display = 'block';
  relative.style.display = 'table';
  absolute.style.display = 'table';
  debug.style.display = 'flex';

  document.getElementById('step').style.display = 'block';
  step.textContent = data_points.length;
  document.getElementById(`step_${data_points.length}`).style.display = 'block';
});
