import {
  mockBase,
  mockCheese,
  mockTopping,
  mockSauce,
} from './ingridients.mock';
import { Pizza } from '../src/models/pizza';

export const mockPizza = {
  name: 'Pizza Pesto',
  toppings: [mockBase, mockCheese, mockTopping, mockSauce],
  isVegan: false,
  canBeVeganized: true,
};

export const pizzaCollection: Pizza[] = [
  {
    name: 'Magherita',
    toppings: [mockBase, mockCheese, mockTopping],
    isVegan: false,
    canBeVeganized: true,
  },
  mockPizza,
];
