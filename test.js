let ws = new WebSocket('ws://9.232.10.54:4545/');
ws.onopen = () => {
  alert('websocket open');
};

ws.onerror = (error) => {
  alert(JSON.stringify(error));
};
