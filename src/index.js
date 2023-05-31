let interval = setInterval(() => {
  console.log('(1 )');
  clearInterval(interval);
});

setImmediate(() => console.log('(2 )'));

setTimeout(() => console.log('(3 )'));

process.nextTick(() => console.log('(4 )'));

console.log('(5 )');

let myPromise = () =>
  new Promise((resolve) =>
    setTimeout(() => {
      console.log('(6 )');
      resolve();
    })
  );

let myPromise2 = () =>
  new Promise((resolve) => {
    console.log('(7 )');
    resolve();
  });

myPromise().then(console.log('(8 )'));

myPromise2().then(console.log('(9 )'));
