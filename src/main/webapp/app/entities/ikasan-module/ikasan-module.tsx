import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './ikasan-module.reducer';
import { IIkasanModule } from 'app/shared/model/ikasan-module.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IIkasanModuleProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class IkasanModule extends React.Component<IIkasanModuleProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { ikasanModuleList, match } = this.props;
    return (
      <div>
        <h2 id="ikasan-module-heading">
          Ikasan Modules
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create new Ikasan Module
          </Link>
        </h2>
        <div className="table-responsive">
          {ikasanModuleList && ikasanModuleList.length > 0 ? (
            <Table responsive>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Module Name</th>
                  <th>Module Description</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {ikasanModuleList.map((ikasanModule, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${ikasanModule.id}`} color="link" size="sm">
                        {ikasanModule.id}
                      </Button>
                    </td>
                    <td>{ikasanModule.moduleName}</td>
                    <td>{ikasanModule.moduleDescription}</td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${ikasanModule.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${ikasanModule.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${ikasanModule.id}/delete`} color="danger" size="sm">
                          <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <div className="alert alert-warning">No Ikasan Modules found</div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ ikasanModule }: IRootState) => ({
  ikasanModuleList: ikasanModule.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IkasanModule);
