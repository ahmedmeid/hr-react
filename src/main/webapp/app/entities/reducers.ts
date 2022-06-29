import company from 'app/entities/company/company.reducer';
import department from 'app/entities/department/department.reducer';
import team from 'app/entities/team/team.reducer';
import country from 'app/entities/country/country.reducer';
import person from 'app/entities/person/person.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

const entitiesReducers = {
  company,
  department,
  team,
  country,
  person,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
};

export default entitiesReducers;
