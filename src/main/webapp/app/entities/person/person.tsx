import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { openFile, byteSize, Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IPerson } from 'app/shared/model/person.model';
import { getEntities } from './person.reducer';

export const Person = (props: RouteComponentProps<{ url: string }>) => {
  const dispatch = useAppDispatch();

  const personList = useAppSelector(state => state.person.entities);
  const loading = useAppSelector(state => state.person.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  const { match } = props;

  return (
    <div>
      <h2 id="person-heading" data-cy="PersonHeading">
        <Translate contentKey="hrApp.person.home.title">People</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="hrApp.person.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to="/person/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="hrApp.person.home.createLabel">Create new Person</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {personList && personList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="hrApp.person.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="hrApp.person.name">Name</Translate>
                </th>
                <th>
                  <Translate contentKey="hrApp.person.email">Email</Translate>
                </th>
                <th>
                  <Translate contentKey="hrApp.person.mobileNo">Mobile No</Translate>
                </th>
                <th>
                  <Translate contentKey="hrApp.person.type">Type</Translate>
                </th>
                <th>
                  <Translate contentKey="hrApp.person.title">Title</Translate>
                </th>
                <th>
                  <Translate contentKey="hrApp.person.role">Role</Translate>
                </th>
                <th>
                  <Translate contentKey="hrApp.person.joinDate">Join Date</Translate>
                </th>
                <th>
                  <Translate contentKey="hrApp.person.photo">Photo</Translate>
                </th>
                <th>
                  <Translate contentKey="hrApp.person.company">Company</Translate>
                </th>
                <th>
                  <Translate contentKey="hrApp.person.department">Department</Translate>
                </th>
                <th>
                  <Translate contentKey="hrApp.person.team">Team</Translate>
                </th>
                <th>
                  <Translate contentKey="hrApp.person.nationality">Nationality</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {personList.map((person, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/person/${person.id}`} color="link" size="sm">
                      {person.id}
                    </Button>
                  </td>
                  <td>{person.name}</td>
                  <td>{person.email}</td>
                  <td>{person.mobileNo}</td>
                  <td>
                    <Translate contentKey={`hrApp.Type.${person.type}`} />
                  </td>
                  <td>{person.title}</td>
                  <td>{person.role}</td>
                  <td>{person.joinDate ? <TextFormat type="date" value={person.joinDate} format={APP_LOCAL_DATE_FORMAT} /> : null}</td>
                  <td>
                    {person.photo ? (
                      <div>
                        {person.photoContentType ? (
                          <a onClick={openFile(person.photoContentType, person.photo)}>
                            <img src={`data:${person.photoContentType};base64,${person.photo}`} style={{ maxHeight: '30px' }} />
                            &nbsp;
                          </a>
                        ) : null}
                        <span>
                          {person.photoContentType}, {byteSize(person.photo)}
                        </span>
                      </div>
                    ) : null}
                  </td>
                  <td>{person.company ? <Link to={`/company/${person.company.id}`}>{person.company.name}</Link> : ''}</td>
                  <td>{person.department ? <Link to={`/department/${person.department.id}`}>{person.department.name}</Link> : ''}</td>
                  <td>{person.team ? <Link to={`/team/${person.team.id}`}>{person.team.name}</Link> : ''}</td>
                  <td>{person.nationality ? <Link to={`/country/${person.nationality.id}`}>{person.nationality.name}</Link> : ''}</td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/person/${person.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`/person/${person.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`/person/${person.id}/delete`} color="danger" size="sm" data-cy="entityDeleteButton">
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="hrApp.person.home.notFound">No People found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Person;
