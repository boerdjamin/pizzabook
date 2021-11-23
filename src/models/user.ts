import { Identifyable } from './identifyable';
export interface User {
  readonly name: string;
  readonly pizza?: string[];
}

export type IUser = User & Identifyable;
