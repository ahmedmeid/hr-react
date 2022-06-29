import { IPerson } from 'app/shared/model/person.model';

export interface ITeam {
  id?: number;
  name?: string | null;
  people?: IPerson[] | null;
}

export const defaultValue: Readonly<ITeam> = {};
