import dayjs from 'dayjs';
import { ICompany } from 'app/shared/model/company.model';
import { IDepartment } from 'app/shared/model/department.model';
import { ITeam } from 'app/shared/model/team.model';
import { ICountry } from 'app/shared/model/country.model';
import { Type } from 'app/shared/model/enumerations/type.model';

export interface IPerson {
  id?: number;
  name?: string | null;
  email?: string | null;
  mobileNo?: string | null;
  type?: Type | null;
  title?: string | null;
  role?: string | null;
  joinDate?: string | null;
  photoContentType?: string | null;
  photo?: string | null;
  company?: ICompany | null;
  department?: IDepartment | null;
  team?: ITeam | null;
  nationality?: ICountry | null;
}

export const defaultValue: Readonly<IPerson> = {};
