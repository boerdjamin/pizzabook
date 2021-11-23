import { User } from './user';
import { Pizza } from './pizza';
import { Ingridient } from './ingridient';
export interface Identifyable {
  readonly id: string;
}

export type IdentifyableEntity = Ingridient | Pizza | User;
