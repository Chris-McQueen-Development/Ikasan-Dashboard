import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IIkasanModule } from 'app/shared/model/ikasan-module.model';
import { getEntities as getIkasanModules } from 'app/entities/ikasan-module/ikasan-module.reducer';
import { getEntity, updateEntity, createEntity, reset } from './ikasan-flow.reducer';
import { IIkasanFlow } from 'app/shared/model/ikasan-flow.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IIkasanFlowUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IIkasanFlowUpdateState {
  isNew: boolean;
  moduleId: string;
}

export class IkasanFlowUpdate extends React.Component<IIkasanFlowUpdateProps, IIkasanFlowUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      moduleId: '0',
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getIkasanModules();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { ikasanFlowEntity } = this.props;
      const entity = {
        ...ikasanFlowEntity,
        ...values
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/ikasan-flow');
  };

  render() {
    const { ikasanFlowEntity, ikasanModules, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="dashboardApp.ikasanFlow.home.createOrEditLabel">Create or edit a IkasanFlow</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : ikasanFlowEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="ikasan-flow-id">ID</Label>
                    <AvInput id="ikasan-flow-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="flowNameLabel" for="ikasan-flow-flowName">
                    Flow Name
                  </Label>
                  <AvField
                    id="ikasan-flow-flowName"
                    type="text"
                    name="flowName"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="statusLabel" for="ikasan-flow-status">
                    Status
                  </Label>
                  <AvInput
                    id="ikasan-flow-status"
                    type="select"
                    className="form-control"
                    name="status"
                    value={(!isNew && ikasanFlowEntity.status) || 'RUNNING'}
                  >
                    <option value="RUNNING">RUNNING</option>
                    <option value="RECOVERING">RECOVERING</option>
                    <option value="STOPPED">STOPPED</option>
                    <option value="STOPPEDINERROR">STOPPEDINERROR</option>
                    <option value="PAUSED">PAUSED</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="ikasan-flow-module">Module</Label>
                  <AvInput id="ikasan-flow-module" type="select" className="form-control" name="module.id">
                    <option value="" key="0" />
                    {ikasanModules
                      ? ikasanModules.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/ikasan-flow" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />
                  &nbsp;
                  <span className="d-none d-md-inline">Back</span>
                </Button>
                &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                  <FontAwesomeIcon icon="save" />
                  &nbsp; Save
                </Button>
              </AvForm>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  ikasanModules: storeState.ikasanModule.entities,
  ikasanFlowEntity: storeState.ikasanFlow.entity,
  loading: storeState.ikasanFlow.loading,
  updating: storeState.ikasanFlow.updating,
  updateSuccess: storeState.ikasanFlow.updateSuccess
});

const mapDispatchToProps = {
  getIkasanModules,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IkasanFlowUpdate);
