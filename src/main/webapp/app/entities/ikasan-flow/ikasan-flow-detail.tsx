import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './ikasan-flow.reducer';
import { IIkasanFlow } from 'app/shared/model/ikasan-flow.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IIkasanFlowDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class IkasanFlowDetail extends React.Component<IIkasanFlowDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { ikasanFlowEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            IkasanFlow [<b>{ikasanFlowEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="flowName">Flow Name</span>
            </dt>
            <dd>{ikasanFlowEntity.flowName}</dd>
            <dt>
              <span id="status">Status</span>
            </dt>
            <dd>{ikasanFlowEntity.status}</dd>
            <dt>Module</dt>
            <dd>{ikasanFlowEntity.module ? ikasanFlowEntity.module.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/ikasan-flow" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/ikasan-flow/${ikasanFlowEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ ikasanFlow }: IRootState) => ({
  ikasanFlowEntity: ikasanFlow.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IkasanFlowDetail);
