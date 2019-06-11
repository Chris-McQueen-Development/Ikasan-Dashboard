package org.ikasan.dashboard.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;

/**
 * A IkasanComponent.
 */
@Entity
@Table(name = "ikasan_component")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class IkasanComponent implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "component_name", nullable = false)
    private String componentName;

    @ManyToOne
    @JsonIgnoreProperties("ikasanComponents")
    private IkasanFlow flow;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getComponentName() {
        return componentName;
    }

    public IkasanComponent componentName(String componentName) {
        this.componentName = componentName;
        return this;
    }

    public void setComponentName(String componentName) {
        this.componentName = componentName;
    }

    public IkasanFlow getFlow() {
        return flow;
    }

    public IkasanComponent flow(IkasanFlow ikasanFlow) {
        this.flow = ikasanFlow;
        return this;
    }

    public void setFlow(IkasanFlow ikasanFlow) {
        this.flow = ikasanFlow;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof IkasanComponent)) {
            return false;
        }
        return id != null && id.equals(((IkasanComponent) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "IkasanComponent{" +
            "id=" + getId() +
            ", componentName='" + getComponentName() + "'" +
            "}";
    }
}
