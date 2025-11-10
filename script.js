fetch('/api/profiles')
  .then(r => r.json())
  .then(data => console.log(data));
