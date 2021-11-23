import { IUser } from './user';
import { IPizza } from './pizza';
import { IIngridient } from './ingridient';
export interface Identifyable {
  readonly id: string;
}

export type IdentifyableEntity = IIngridient | IPizza | IUser;
