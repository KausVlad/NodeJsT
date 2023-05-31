let interval = setInterval(() => {
  console.log('(1 6)');
  clearInterval(interval);
});

setImmediate(() => console.log('(2 9)'));

setTimeout(() => console.log('(3 7)'));

process.nextTick(() => console.log('(4 5)'));

console.log('(5 1)');

let myPromise = () =>
  new Promise((resolve) =>
    setTimeout(() => {
      console.log('(6 8)');
      resolve();
    })
  );

let myPromise2 = () =>
  new Promise((resolve) => {
    console.log('(7 3)');
    resolve();
  });

myPromise().then(console.log('(8 2)'));

myPromise2().then(console.log('(9 4)'));
