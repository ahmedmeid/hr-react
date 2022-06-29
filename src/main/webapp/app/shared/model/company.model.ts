import { IPerson } from 'app/shared/model/person.model';

export interface ICompany {
  id?: number;
  name?: string | null;
  people?: IPerson[] | null;
}

export const defaultValue: Readonly<ICompany> = {};
