const products = [
  {
    id: 1,
    name: "Sony WH-1000XM6",
    brand: "Sony",
    price: 399,
    category: "headphones",
    image: "images/over-ear-headphones/sony-wh-1000xm6.png"
  },
  {
    id: 2,
    name: "Studio Microphone",
    brand: "Rode",
    price: 149,
    discount: 20,
    category: "microphones",
    image: "images/studio-microphone/mic1.png"
  },
  {
    id: 3,
    name: "Logitech Mic",
    brand: "Logitech",
    price: 249,
    discount: 20,
    category: "microphones",
    image: "images/studio-microphone/logitech.png"
  },
  {
    id: 4,
    name: "Maono Mic",
    brand: "Maono",
    price: 129,
    category: "microphones",
    image: "images/studio-microphone/maono.png"
  },
  {
    id: 5,
    name: "Shure Mic",
    brand: "Shure",
    price: 299,
    category: "microphones",
    image: "images/studio-microphone/shure.png"
  },
  {
    id: 6,
    name: "Bose Speaker",
    brand: "Bose",
    price: 399,
    category: "speakers",
    image: "images/portable-bluetooth-speaker/bose.png"
  },
  {
    id: 7,
    name: "JBL Speaker",
    brand: "JBL",
    price: 169,
    category: "speakers",
    image: "images/portable-bluetooth-speaker/jbl.png"
  },
  {
    id: 8,
    name: "W-King Speaker",
    brand: "W-King",
    price: 129,
    category: "speakers",
    image: "images/portable-bluetooth-speaker/w-king.png"
  },
  {
    id: 9,
    name: "W-King Speaker",
    brand: "W-King",
    price: 119,
    category: "speakers",
    image: "images/portable-bluetooth-speaker/w-king.png"
  }
];

function getFinalPrice(product) {
  if (product.discount) {
    return product.price * (1 - product.discount / 100);
  }
  return product.price;
}