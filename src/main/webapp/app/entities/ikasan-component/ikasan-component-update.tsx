import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IIkasanFlow } from 'app/shared/model/ikasan-flow.model';
import { getEntities as getIkasanFlows } from 'app/entities/ikasan-flow/ikasan-flow.reducer';
import { getEntity, updateEntity, createEntity, reset } from './ikasan-component.reducer';
import { IIkasanComponent } from 'app/shared/model/ikasan-component.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IIkasanComponentUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IIkasanComponentUpdateState {
  isNew: boolean;
  flowId: string;
}

export class IkasanComponentUpdate extends React.Component<IIkasanComponentUpdateProps, IIkasanComponentUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      flowId: '0',
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

    this.props.getIkasanFlows();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { ikasanComponentEntity } = this.props;
      const entity = {
        ...ikasanComponentEntity,
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
    this.props.history.push('/entity/ikasan-component');
  };

  render() {
    const { ikasanComponentEntity, ikasanFlows, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="dashboardApp.ikasanComponent.home.createOrEditLabel">Create or edit a IkasanComponent</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : ikasanComponentEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="ikasan-component-id">ID</Label>
                    <AvInput id="ikasan-component-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="componentNameLabel" for="ikasan-component-componentName">
                    Component Name
                  </Label>
                  <AvField
                    id="ikasan-component-componentName"
                    type="text"
                    name="componentName"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label for="ikasan-component-flow">Flow</Label>
                  <AvInput id="ikasan-component-flow" type="select" className="form-control" name="flow.id">
                    <option value="" key="0" />
                    {ikasanFlows
                      ? ikasanFlows.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/ikasan-component" replace color="info">
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
  ikasanFlows: storeState.ikasanFlow.entities,
  ikasanComponentEntity: storeState.ikasanComponent.entity,
  loading: storeState.ikasanComponent.loading,
  updating: storeState.ikasanComponent.updating,
  updateSuccess: storeState.ikasanComponent.updateSuccess
});

const mapDispatchToProps = {
  getIkasanFlows,
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
)(IkasanComponentUpdate);
