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
import { getEntity, updateEntity, createEntity, reset } from './integrated-system.reducer';
import { IIntegratedSystem } from 'app/shared/model/integrated-system.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IIntegratedSystemUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IIntegratedSystemUpdateState {
  isNew: boolean;
  idsmodule: any[];
}

export class IntegratedSystemUpdate extends React.Component<IIntegratedSystemUpdateProps, IIntegratedSystemUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      idsmodule: [],
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
      const { integratedSystemEntity } = this.props;
      const entity = {
        ...integratedSystemEntity,
        ...values,
        modules: mapIdList(values.modules)
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/integrated-system');
  };

  render() {
    const { integratedSystemEntity, ikasanModules, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="dashboardApp.integratedSystem.home.createOrEditLabel">Create or edit a IntegratedSystem</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : integratedSystemEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="integrated-system-id">ID</Label>
                    <AvInput id="integrated-system-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="systemNameLabel" for="integrated-system-systemName">
                    System Name
                  </Label>
                  <AvField
                    id="integrated-system-systemName"
                    type="text"
                    name="systemName"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="systemLevelLabel" for="integrated-system-systemLevel">
                    System Level
                  </Label>
                  <AvField id="integrated-system-systemLevel" type="string" className="form-control" name="systemLevel" />
                </AvGroup>
                <AvGroup>
                  <Label for="integrated-system-module">Module</Label>
                  <AvInput
                    id="integrated-system-module"
                    type="select"
                    multiple
                    className="form-control"
                    name="modules"
                    value={integratedSystemEntity.modules && integratedSystemEntity.modules.map(e => e.id)}
                  >
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
                <Button tag={Link} id="cancel-save" to="/entity/integrated-system" replace color="info">
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
  integratedSystemEntity: storeState.integratedSystem.entity,
  loading: storeState.integratedSystem.loading,
  updating: storeState.integratedSystem.updating,
  updateSuccess: storeState.integratedSystem.updateSuccess
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
)(IntegratedSystemUpdate);
