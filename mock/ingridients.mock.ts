import { FoodType } from './../src/models/food-type';

export const mockBase = {
  name: 'Tomatensauce',
  isVegan: true,
  foodType: FoodType.base,
};

export const mockCheese = {
  name: 'Mozzarella',
  isVegan: false,
  foodType: FoodType.cheese,
};

export const mockTopping = {
  name: 'Tomaten',
  isVegan: true,
  foodType: FoodType.vegetable,
};

export const mockSauce = {
  name: 'Pesto',
  isVegan: true,
  foodType: FoodType.additionalSauce,
};
