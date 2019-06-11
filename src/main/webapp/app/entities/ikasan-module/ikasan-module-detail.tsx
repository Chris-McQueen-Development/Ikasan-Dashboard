import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './ikasan-module.reducer';
import { IIkasanModule } from 'app/shared/model/ikasan-module.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IIkasanModuleDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class IkasanModuleDetail extends React.Component<IIkasanModuleDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { ikasanModuleEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            IkasanModule [<b>{ikasanModuleEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="moduleName">Module Name</span>
            </dt>
            <dd>{ikasanModuleEntity.moduleName}</dd>
            <dt>
              <span id="moduleDescription">Module Description</span>
            </dt>
            <dd>{ikasanModuleEntity.moduleDescription}</dd>
          </dl>
          <Button tag={Link} to="/entity/ikasan-module" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/ikasan-module/${ikasanModuleEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ ikasanModule }: IRootState) => ({
  ikasanModuleEntity: ikasanModule.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IkasanModuleDetail);
