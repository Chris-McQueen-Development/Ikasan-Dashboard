import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './ikasan-component.reducer';
import { IIkasanComponent } from 'app/shared/model/ikasan-component.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IIkasanComponentProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class IkasanComponent extends React.Component<IIkasanComponentProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { ikasanComponentList, match } = this.props;
    return (
      <div>
        <h2 id="ikasan-component-heading">
          Ikasan Components
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create new Ikasan Component
          </Link>
        </h2>
        <div className="table-responsive">
          {ikasanComponentList && ikasanComponentList.length > 0 ? (
            <Table responsive>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Component Name</th>
                  <th>Flow</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {ikasanComponentList.map((ikasanComponent, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${ikasanComponent.id}`} color="link" size="sm">
                        {ikasanComponent.id}
                      </Button>
                    </td>
                    <td>{ikasanComponent.componentName}</td>
                    <td>
                      {ikasanComponent.flow ? <Link to={`ikasan-flow/${ikasanComponent.flow.id}`}>{ikasanComponent.flow.id}</Link> : ''}
                    </td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${ikasanComponent.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${ikasanComponent.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${ikasanComponent.id}/delete`} color="danger" size="sm">
                          <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <div className="alert alert-warning">No Ikasan Components found</div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ ikasanComponent }: IRootState) => ({
  ikasanComponentList: ikasanComponent.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IkasanComponent);
