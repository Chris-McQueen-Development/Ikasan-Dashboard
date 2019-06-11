package org.ikasan.dashboard.domain;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A IkasanModule.
 */
@Entity
@Table(name = "ikasan_module")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class IkasanModule implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "module_name", nullable = false)
    private String moduleName;

    @Column(name = "module_description")
    private String moduleDescription;

    @ManyToMany(mappedBy = "modules")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JsonIgnore
    private Set<IntegratedSystem> systems = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getModuleName() {
        return moduleName;
    }

    public IkasanModule moduleName(String moduleName) {
        this.moduleName = moduleName;
        return this;
    }

    public void setModuleName(String moduleName) {
        this.moduleName = moduleName;
    }

    public String getModuleDescription() {
        return moduleDescription;
    }

    public IkasanModule moduleDescription(String moduleDescription) {
        this.moduleDescription = moduleDescription;
        return this;
    }

    public void setModuleDescription(String moduleDescription) {
        this.moduleDescription = moduleDescription;
    }

    public Set<IntegratedSystem> getSystems() {
        return systems;
    }

    public IkasanModule systems(Set<IntegratedSystem> integratedSystems) {
        this.systems = integratedSystems;
        return this;
    }

    public IkasanModule addSystem(IntegratedSystem integratedSystem) {
        this.systems.add(integratedSystem);
        integratedSystem.getModules().add(this);
        return this;
    }

    public IkasanModule removeSystem(IntegratedSystem integratedSystem) {
        this.systems.remove(integratedSystem);
        integratedSystem.getModules().remove(this);
        return this;
    }

    public void setSystems(Set<IntegratedSystem> integratedSystems) {
        this.systems = integratedSystems;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof IkasanModule)) {
            return false;
        }
        return id != null && id.equals(((IkasanModule) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "IkasanModule{" +
            "id=" + getId() +
            ", moduleName='" + getModuleName() + "'" +
            ", moduleDescription='" + getModuleDescription() + "'" +
            "}";
    }
}
