import { Ingridient } from './ingridient';
import { Pizza } from './pizza';
import { User } from './user';

export interface Identifyable {
  readonly id: string;
}

export type IdentifyableEntity = Ingridient | Pizza | User;
