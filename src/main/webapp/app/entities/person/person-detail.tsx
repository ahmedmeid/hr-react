import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, openFile, byteSize, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './person.reducer';

export const PersonDetail = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
  }, []);

  const personEntity = useAppSelector(state => state.person.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="personDetailsHeading">
          <Translate contentKey="hrApp.person.detail.title">Person</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{personEntity.id}</dd>
          <dt>
            <span id="name">
              <Translate contentKey="hrApp.person.name">Name</Translate>
            </span>
          </dt>
          <dd>{personEntity.name}</dd>
          <dt>
            <span id="email">
              <Translate contentKey="hrApp.person.email">Email</Translate>
            </span>
          </dt>
          <dd>{personEntity.email}</dd>
          <dt>
            <span id="mobileNo">
              <Translate contentKey="hrApp.person.mobileNo">Mobile No</Translate>
            </span>
          </dt>
          <dd>{personEntity.mobileNo}</dd>
          <dt>
            <span id="type">
              <Translate contentKey="hrApp.person.type">Type</Translate>
            </span>
          </dt>
          <dd>{personEntity.type}</dd>
          <dt>
            <span id="title">
              <Translate contentKey="hrApp.person.title">Title</Translate>
            </span>
          </dt>
          <dd>{personEntity.title}</dd>
          <dt>
            <span id="role">
              <Translate contentKey="hrApp.person.role">Role</Translate>
            </span>
          </dt>
          <dd>{personEntity.role}</dd>
          <dt>
            <span id="joinDate">
              <Translate contentKey="hrApp.person.joinDate">Join Date</Translate>
            </span>
          </dt>
          <dd>{personEntity.joinDate ? <TextFormat value={personEntity.joinDate} type="date" format={APP_LOCAL_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="photo">
              <Translate contentKey="hrApp.person.photo">Photo</Translate>
            </span>
          </dt>
          <dd>
            {personEntity.photo ? (
              <div>
                {personEntity.photoContentType ? (
                  <a onClick={openFile(personEntity.photoContentType, personEntity.photo)}>
                    <img src={`data:${personEntity.photoContentType};base64,${personEntity.photo}`} style={{ maxHeight: '30px' }} />
                  </a>
                ) : null}
                <span>
                  {personEntity.photoContentType}, {byteSize(personEntity.photo)}
                </span>
              </div>
            ) : null}
          </dd>
          <dt>
            <Translate contentKey="hrApp.person.company">Company</Translate>
          </dt>
          <dd>{personEntity.company ? personEntity.company.name : ''}</dd>
          <dt>
            <Translate contentKey="hrApp.person.department">Department</Translate>
          </dt>
          <dd>{personEntity.department ? personEntity.department.name : ''}</dd>
          <dt>
            <Translate contentKey="hrApp.person.team">Team</Translate>
          </dt>
          <dd>{personEntity.team ? personEntity.team.name : ''}</dd>
          <dt>
            <Translate contentKey="hrApp.person.nationality">Nationality</Translate>
          </dt>
          <dd>{personEntity.nationality ? personEntity.nationality.name : ''}</dd>
        </dl>
        <Button tag={Link} to="/person" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/person/${personEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default PersonDetail;
