type Cake = {
  vietnameseName: string;
  englishName: string;
  imgUrl: string;
  unitPrice: number;
  ingredients: string;
  soldOut: boolean;
};

const randNum = (array: (string | number)[]) =>
  Math.floor(Math.random() * array.length);

const cakeNames: string[] = [
  "Banh Chung",
  "Banh Chuoi",
  "Banh Bo",
  "Banh Deo",
  "Banh Dau Xanh",
];

const unitPrices: number[] = [5.99, 6.99, 3.99, 4.99, 7.99];

const ingredientList: string[] = [
  "sticky rice, pork, mung beans, and pepper",
  "sliced bananas, condensed milk, sugar, and coconut milk",
  "sweet and savory minced pork and wood ear mushrooms",
  "mung beans, vegetable oil or pork fat, and sugar",
  "sweet syrup and a rich filling that can include taro, mung beans, coconut, lotus seeds",
];

const imgUrls: string[] = [
  "/banh chung.jpg",
  "/banh chuoi.jpg",
  "/banh dau xanh.jpg",
  "/banh deo.jpg",
];

export const cakes: Cake[] = [
  {
    vietnameseName: cakeNames[randNum(cakeNames)],
    englishName: "",
    imgUrl: imgUrls[randNum(imgUrls)],
    unitPrice: unitPrices[randNum(unitPrices)],
    ingredients: ingredientList[randNum(ingredientList)],
    soldOut: false,
  },
  {
    vietnameseName: cakeNames[randNum(cakeNames)],
    englishName: "",
    imgUrl: imgUrls[randNum(imgUrls)],
    unitPrice: unitPrices[randNum(unitPrices)],
    ingredients: ingredientList[randNum(ingredientList)],
    soldOut: false,
  },
  {
    vietnameseName: cakeNames[randNum(cakeNames)],
    englishName: "",
    imgUrl: imgUrls[randNum(imgUrls)],
    unitPrice: unitPrices[randNum(unitPrices)],
    ingredients: ingredientList[randNum(ingredientList)],
    soldOut: false,
  },
  {
    vietnameseName: cakeNames[randNum(cakeNames)],
    englishName: "",
    imgUrl: imgUrls[randNum(imgUrls)],
    unitPrice: unitPrices[randNum(unitPrices)],
    ingredients: ingredientList[randNum(ingredientList)],
    soldOut: false,
  },
  {
    vietnameseName: cakeNames[randNum(cakeNames)],
    englishName: "",
    imgUrl: imgUrls[randNum(imgUrls)],
    unitPrice: unitPrices[randNum(unitPrices)],
    ingredients: ingredientList[randNum(ingredientList)],
    soldOut: false,
  },
  {
    vietnameseName: cakeNames[randNum(cakeNames)],
    englishName: "",
    imgUrl: imgUrls[randNum(imgUrls)],
    unitPrice: unitPrices[randNum(unitPrices)],
    ingredients: ingredientList[randNum(ingredientList)],
    soldOut: false,
  },
  {
    vietnameseName: cakeNames[randNum(cakeNames)],
    englishName: "",
    imgUrl: imgUrls[randNum(imgUrls)],
    unitPrice: unitPrices[randNum(unitPrices)],
    ingredients: ingredientList[randNum(ingredientList)],
    soldOut: false,
  },
  {
    vietnameseName: cakeNames[randNum(cakeNames)],
    englishName: "",
    imgUrl: imgUrls[randNum(imgUrls)],
    unitPrice: unitPrices[randNum(unitPrices)],
    ingredients: ingredientList[randNum(ingredientList)],
    soldOut: false,
  },
  {
    vietnameseName: cakeNames[randNum(cakeNames)],
    englishName: "",
    imgUrl: imgUrls[randNum(imgUrls)],
    unitPrice: unitPrices[randNum(unitPrices)],
    ingredients: ingredientList[randNum(ingredientList)],
    soldOut: false,
  },
  {
    vietnameseName: cakeNames[randNum(cakeNames)],
    englishName: "",
    imgUrl: imgUrls[randNum(imgUrls)],
    unitPrice: unitPrices[randNum(unitPrices)],
    ingredients: ingredientList[randNum(ingredientList)],
    soldOut: false,
  },
];
