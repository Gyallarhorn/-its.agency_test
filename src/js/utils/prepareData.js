import axios from 'axios';
import { images, prices } from './data';
import { random, generateRandomString } from './random';

const COUNT = 20;

const createProduct = () => ({
  name: `Краска Wallquest, Brownsone MS${generateRandomString(5)}`,
  price: prices[random(0, prices.length - 1)],
  createdAt: new Date(),
  image: images.get(random(0, images.size)),
  isSale: Boolean(random()),
  isEclusive: Boolean(random()),
  isAvailable: Boolean(random()),
  isContractual: Boolean(random()),
  isNew: Boolean(random()),
  purchased: random(1, 50),
});

let count = 0;
const products = [];

const sendData = async (dataArray) => {
  try {
    const dataPromises = dataArray.map(async (elem) => {
      const response = await axios.post('https://itsagency-default-rtdb.europe-west1.firebasedatabase.app/.json', elem);
      return response;
    });

    await Promise.all(dataPromises);
    console.log('Все загружено');
  } catch (error) {
    console.log('Возникла проблема', error);
  }
};

const interval = setInterval(() => {
  if (count < COUNT) {
    const product = createProduct();
    products.push(product);
    count++;
    return;
  }
  clearInterval(interval);
  console.log('Массив товаров создан');
  sendData(products);
}, 60000);
