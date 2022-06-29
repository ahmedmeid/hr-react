import { IPerson } from 'app/shared/model/person.model';

export interface IDepartment {
  id?: number;
  name?: string | null;
  people?: IPerson[] | null;
}

export const defaultValue: Readonly<IDepartment> = {};
