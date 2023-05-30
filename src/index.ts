type TypeProduct = {
  productName: string;
  price: number;
};

const getRandomNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getDataStructure = (): [number, ...TypeProduct[]] => {
  const creationTime = new Date().getTime();
  const dataStructure: [number, ...TypeProduct[]] = [creationTime];
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

getDataStructure();
