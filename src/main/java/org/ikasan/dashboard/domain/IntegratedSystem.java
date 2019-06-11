package org.ikasan.dashboard.domain;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A IntegratedSystem.
 */
@Entity
@Table(name = "integrated_system")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class IntegratedSystem implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "system_name", nullable = false)
    private String systemName;

    @Column(name = "system_level")
    private Integer systemLevel;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "integrated_system_module",
               joinColumns = @JoinColumn(name = "integrated_system_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "module_id", referencedColumnName = "id"))
    private Set<IkasanModule> modules = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSystemName() {
        return systemName;
    }

    public IntegratedSystem systemName(String systemName) {
        this.systemName = systemName;
        return this;
    }

    public void setSystemName(String systemName) {
        this.systemName = systemName;
    }

    public Integer getSystemLevel() {
        return systemLevel;
    }

    public IntegratedSystem systemLevel(Integer systemLevel) {
        this.systemLevel = systemLevel;
        return this;
    }

    public void setSystemLevel(Integer systemLevel) {
        this.systemLevel = systemLevel;
    }

    public Set<IkasanModule> getModules() {
        return modules;
    }

    public IntegratedSystem modules(Set<IkasanModule> ikasanModules) {
        this.modules = ikasanModules;
        return this;
    }

    public IntegratedSystem addModule(IkasanModule ikasanModule) {
        this.modules.add(ikasanModule);
        ikasanModule.getSystems().add(this);
        return this;
    }

    public IntegratedSystem removeModule(IkasanModule ikasanModule) {
        this.modules.remove(ikasanModule);
        ikasanModule.getSystems().remove(this);
        return this;
    }

    public void setModules(Set<IkasanModule> ikasanModules) {
        this.modules = ikasanModules;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof IntegratedSystem)) {
            return false;
        }
        return id != null && id.equals(((IntegratedSystem) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "IntegratedSystem{" +
            "id=" + getId() +
            ", systemName='" + getSystemName() + "'" +
            ", systemLevel=" + getSystemLevel() +
            "}";
    }
}
