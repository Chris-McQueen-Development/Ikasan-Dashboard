import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './ikasan-component.reducer';
import { IIkasanComponent } from 'app/shared/model/ikasan-component.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IIkasanComponentDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class IkasanComponentDetail extends React.Component<IIkasanComponentDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { ikasanComponentEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            IkasanComponent [<b>{ikasanComponentEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="componentName">Component Name</span>
            </dt>
            <dd>{ikasanComponentEntity.componentName}</dd>
            <dt>Flow</dt>
            <dd>{ikasanComponentEntity.flow ? ikasanComponentEntity.flow.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/ikasan-component" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/ikasan-component/${ikasanComponentEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ ikasanComponent }: IRootState) => ({
  ikasanComponentEntity: ikasanComponent.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IkasanComponentDetail);
