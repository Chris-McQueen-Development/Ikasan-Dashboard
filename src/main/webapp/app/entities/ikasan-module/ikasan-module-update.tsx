import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IIntegratedSystem } from 'app/shared/model/integrated-system.model';
import { getEntities as getIntegratedSystems } from 'app/entities/integrated-system/integrated-system.reducer';
import { getEntity, updateEntity, createEntity, reset } from './ikasan-module.reducer';
import { IIkasanModule } from 'app/shared/model/ikasan-module.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IIkasanModuleUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IIkasanModuleUpdateState {
  isNew: boolean;
  systemId: string;
}

export class IkasanModuleUpdate extends React.Component<IIkasanModuleUpdateProps, IIkasanModuleUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      systemId: '0',
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

    this.props.getIntegratedSystems();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { ikasanModuleEntity } = this.props;
      const entity = {
        ...ikasanModuleEntity,
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
    this.props.history.push('/entity/ikasan-module');
  };

  render() {
    const { ikasanModuleEntity, integratedSystems, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="dashboardApp.ikasanModule.home.createOrEditLabel">Create or edit a IkasanModule</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : ikasanModuleEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="ikasan-module-id">ID</Label>
                    <AvInput id="ikasan-module-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="moduleNameLabel" for="ikasan-module-moduleName">
                    Module Name
                  </Label>
                  <AvField
                    id="ikasan-module-moduleName"
                    type="text"
                    name="moduleName"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="moduleDescriptionLabel" for="ikasan-module-moduleDescription">
                    Module Description
                  </Label>
                  <AvField id="ikasan-module-moduleDescription" type="text" name="moduleDescription" />
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/ikasan-module" replace color="info">
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
  integratedSystems: storeState.integratedSystem.entities,
  ikasanModuleEntity: storeState.ikasanModule.entity,
  loading: storeState.ikasanModule.loading,
  updating: storeState.ikasanModule.updating,
  updateSuccess: storeState.ikasanModule.updateSuccess
});

const mapDispatchToProps = {
  getIntegratedSystems,
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
)(IkasanModuleUpdate);
