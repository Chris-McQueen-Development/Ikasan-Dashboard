import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './integrated-system.reducer';
import { IIntegratedSystem } from 'app/shared/model/integrated-system.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IIntegratedSystemDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class IntegratedSystemDetail extends React.Component<IIntegratedSystemDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { integratedSystemEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            IntegratedSystem [<b>{integratedSystemEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="systemName">System Name</span>
            </dt>
            <dd>{integratedSystemEntity.systemName}</dd>
            <dt>
              <span id="systemLevel">System Level</span>
            </dt>
            <dd>{integratedSystemEntity.systemLevel}</dd>
            <dt>Module</dt>
            <dd>
              {integratedSystemEntity.modules
                ? integratedSystemEntity.modules.map((val, i) => (
                    <span key={val.id}>
                      <a>{val.id}</a>
                      {i === integratedSystemEntity.modules.length - 1 ? '' : ', '}
                    </span>
                  ))
                : null}
            </dd>
          </dl>
          <Button tag={Link} to="/entity/integrated-system" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/integrated-system/${integratedSystemEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ integratedSystem }: IRootState) => ({
  integratedSystemEntity: integratedSystem.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IntegratedSystemDetail);
