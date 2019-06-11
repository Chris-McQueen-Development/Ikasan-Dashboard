import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './ikasan-flow.reducer';
import { IIkasanFlow } from 'app/shared/model/ikasan-flow.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IIkasanFlowProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class IkasanFlow extends React.Component<IIkasanFlowProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { ikasanFlowList, match } = this.props;
    return (
      <div>
        <h2 id="ikasan-flow-heading">
          Ikasan Flows
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create new Ikasan Flow
          </Link>
        </h2>
        <div className="table-responsive">
          {ikasanFlowList && ikasanFlowList.length > 0 ? (
            <Table responsive>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Flow Name</th>
                  <th>Status</th>
                  <th>Module</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {ikasanFlowList.map((ikasanFlow, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${ikasanFlow.id}`} color="link" size="sm">
                        {ikasanFlow.id}
                      </Button>
                    </td>
                    <td>{ikasanFlow.flowName}</td>
                    <td>{ikasanFlow.status}</td>
                    <td>{ikasanFlow.module ? <Link to={`ikasan-module/${ikasanFlow.module.id}`}>{ikasanFlow.module.id}</Link> : ''}</td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${ikasanFlow.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${ikasanFlow.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${ikasanFlow.id}/delete`} color="danger" size="sm">
                          <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <div className="alert alert-warning">No Ikasan Flows found</div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ ikasanFlow }: IRootState) => ({
  ikasanFlowList: ikasanFlow.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IkasanFlow);
