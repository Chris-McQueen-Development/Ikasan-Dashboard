package org.ikasan.dashboard.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;

import org.ikasan.dashboard.domain.enumeration.State;

/**
 * A IkasanFlow.
 */
@Entity
@Table(name = "ikasan_flow")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class IkasanFlow implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "flow_name", nullable = false)
    private String flowName;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private State status;

    @ManyToOne
    @JsonIgnoreProperties("ikasanFlows")
    private IkasanModule module;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFlowName() {
        return flowName;
    }

    public IkasanFlow flowName(String flowName) {
        this.flowName = flowName;
        return this;
    }

    public void setFlowName(String flowName) {
        this.flowName = flowName;
    }

    public State getStatus() {
        return status;
    }

    public IkasanFlow status(State status) {
        this.status = status;
        return this;
    }

    public void setStatus(State status) {
        this.status = status;
    }

    public IkasanModule getModule() {
        return module;
    }

    public IkasanFlow module(IkasanModule ikasanModule) {
        this.module = ikasanModule;
        return this;
    }

    public void setModule(IkasanModule ikasanModule) {
        this.module = ikasanModule;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof IkasanFlow)) {
            return false;
        }
        return id != null && id.equals(((IkasanFlow) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "IkasanFlow{" +
            "id=" + getId() +
            ", flowName='" + getFlowName() + "'" +
            ", status='" + getStatus() + "'" +
            "}";
    }
}
