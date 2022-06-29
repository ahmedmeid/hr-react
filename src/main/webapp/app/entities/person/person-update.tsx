import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm, ValidatedBlobField } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { ICompany } from 'app/shared/model/company.model';
import { getEntities as getCompanies } from 'app/entities/company/company.reducer';
import { IDepartment } from 'app/shared/model/department.model';
import { getEntities as getDepartments } from 'app/entities/department/department.reducer';
import { ITeam } from 'app/shared/model/team.model';
import { getEntities as getTeams } from 'app/entities/team/team.reducer';
import { ICountry } from 'app/shared/model/country.model';
import { getEntities as getCountries } from 'app/entities/country/country.reducer';
import { IPerson } from 'app/shared/model/person.model';
import { Type } from 'app/shared/model/enumerations/type.model';
import { getEntity, updateEntity, createEntity, reset } from './person.reducer';

export const PersonUpdate = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const companies = useAppSelector(state => state.company.entities);
  const departments = useAppSelector(state => state.department.entities);
  const teams = useAppSelector(state => state.team.entities);
  const countries = useAppSelector(state => state.country.entities);
  const personEntity = useAppSelector(state => state.person.entity);
  const loading = useAppSelector(state => state.person.loading);
  const updating = useAppSelector(state => state.person.updating);
  const updateSuccess = useAppSelector(state => state.person.updateSuccess);
  const typeValues = Object.keys(Type);
  const handleClose = () => {
    props.history.push('/person');
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(props.match.params.id));
    }

    dispatch(getCompanies({}));
    dispatch(getDepartments({}));
    dispatch(getTeams({}));
    dispatch(getCountries({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...personEntity,
      ...values,
      company: companies.find(it => it.id.toString() === values.company.toString()),
      department: departments.find(it => it.id.toString() === values.department.toString()),
      team: teams.find(it => it.id.toString() === values.team.toString()),
      nationality: countries.find(it => it.id.toString() === values.nationality.toString()),
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  const defaultValues = () =>
    isNew
      ? {}
      : {
          type: 'FTE',
          ...personEntity,
          company: personEntity?.company?.id,
          department: personEntity?.department?.id,
          team: personEntity?.team?.id,
          nationality: personEntity?.nationality?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="hrApp.person.home.createOrEditLabel" data-cy="PersonCreateUpdateHeading">
            <Translate contentKey="hrApp.person.home.createOrEditLabel">Create or edit a Person</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? (
                <ValidatedField
                  name="id"
                  required
                  readOnly
                  id="person-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField label={translate('hrApp.person.name')} id="person-name" name="name" data-cy="name" type="text" />
              <ValidatedField label={translate('hrApp.person.email')} id="person-email" name="email" data-cy="email" type="text" />
              <ValidatedField
                label={translate('hrApp.person.mobileNo')}
                id="person-mobileNo"
                name="mobileNo"
                data-cy="mobileNo"
                type="text"
              />
              <ValidatedField label={translate('hrApp.person.type')} id="person-type" name="type" data-cy="type" type="select">
                {typeValues.map(type => (
                  <option value={type} key={type}>
                    {translate('hrApp.Type.' + type)}
                  </option>
                ))}
              </ValidatedField>
              <ValidatedField label={translate('hrApp.person.title')} id="person-title" name="title" data-cy="title" type="text" />
              <ValidatedField label={translate('hrApp.person.role')} id="person-role" name="role" data-cy="role" type="text" />
              <ValidatedField
                label={translate('hrApp.person.joinDate')}
                id="person-joinDate"
                name="joinDate"
                data-cy="joinDate"
                type="date"
              />
              <ValidatedBlobField
                label={translate('hrApp.person.photo')}
                id="person-photo"
                name="photo"
                data-cy="photo"
                isImage
                accept="image/*"
              />
              <ValidatedField id="person-company" name="company" data-cy="company" label={translate('hrApp.person.company')} type="select">
                <option value="" key="0" />
                {companies
                  ? companies.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.name}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField
                id="person-department"
                name="department"
                data-cy="department"
                label={translate('hrApp.person.department')}
                type="select"
              >
                <option value="" key="0" />
                {departments
                  ? departments.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.name}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField id="person-team" name="team" data-cy="team" label={translate('hrApp.person.team')} type="select">
                <option value="" key="0" />
                {teams
                  ? teams.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.name}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField
                id="person-nationality"
                name="nationality"
                data-cy="nationality"
                label={translate('hrApp.person.nationality')}
                type="select"
              >
                <option value="" key="0" />
                {countries
                  ? countries.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.name}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/person" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </ValidatedForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default PersonUpdate;
