import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './integrated-system.reducer';
import { IIntegratedSystem } from 'app/shared/model/integrated-system.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IIntegratedSystemProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class IntegratedSystem extends React.Component<IIntegratedSystemProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { integratedSystemList, match } = this.props;
    return (
      <div>
        <h2 id="integrated-system-heading">
          Integrated Systems
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create new Integrated System
          </Link>
        </h2>
        <div className="table-responsive">
          {integratedSystemList && integratedSystemList.length > 0 ? (
            <Table responsive>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>System Name</th>
                  <th>System Level</th>
                  <th>Module</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {integratedSystemList.map((integratedSystem, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${integratedSystem.id}`} color="link" size="sm">
                        {integratedSystem.id}
                      </Button>
                    </td>
                    <td>{integratedSystem.systemName}</td>
                    <td>{integratedSystem.systemLevel}</td>
                    <td>
                      {integratedSystem.modules
                        ? integratedSystem.modules.map((val, j) => (
                            <span key={j}>
                              <Link to={`ikasan-module/${val.id}`}>{val.id}</Link>
                              {j === integratedSystem.modules.length - 1 ? '' : ', '}
                            </span>
                          ))
                        : null}
                    </td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${integratedSystem.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${integratedSystem.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${integratedSystem.id}/delete`} color="danger" size="sm">
                          <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <div className="alert alert-warning">No Integrated Systems found</div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ integratedSystem }: IRootState) => ({
  integratedSystemList: integratedSystem.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IntegratedSystem);
