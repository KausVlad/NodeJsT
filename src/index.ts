type TypeProduct = {
  productName: string;
  price: number;
};

const getRandomNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getTime = (): string => {
  const timestamp = new Date().getTime();
  const date = new Date(timestamp);

  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');

  return `${hours}:${minutes}:${seconds}`;
};

const getDataStructure = (): [string, ...TypeProduct[]] => {
  const creationTime = getTime();
  const dataStructure: [string, ...TypeProduct[]] = [creationTime];
  for (let i = 1; i <= 100; i++) {
    const productName = `Product ${i}`;
    const price = getRandomNumber(10, 100);
    dataStructure.push({
      productName,
      price,
    });
  }
  return dataStructure;
};
const dataStructure = getDataStructure();

console.log(`Creation time of data structure: ${dataStructure[0]}`);

const getSpecificData = (
  dataId: number
): [string, string | TypeProduct, number] => {
  return [getTime(), dataStructure[dataId], dataId];
};

const specificData = getSpecificData(50);

console.log(
  `Call time of element number ${specificData[2]} : ${
    specificData[0]
  } \nThis element has the following parameters: ${
    typeof specificData[1] === 'object' ? specificData[1].productName : ''
  } with price ${
    typeof specificData[1] === 'object' ? specificData[1].price : ''
  }$ `
);
