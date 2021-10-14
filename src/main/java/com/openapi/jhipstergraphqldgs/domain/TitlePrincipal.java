package com.openapi.jhipstergraphqldgs.domain;

import java.io.Serializable;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A TitlePrincipal.
 */
@Entity
@Table(name = "title_principal")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class TitlePrincipal implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "category", nullable = false)
    private Integer category;

    @Size(max = 1000)
    @Column(name = "job", length = 1000)
    private String job;

    @Size(max = 1000)
    @Column(name = "role_names", length = 1000)
    private String roleNames;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public TitlePrincipal id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getCategory() {
        return this.category;
    }

    public TitlePrincipal category(Integer category) {
        this.setCategory(category);
        return this;
    }

    public void setCategory(Integer category) {
        this.category = category;
    }

    public String getJob() {
        return this.job;
    }

    public TitlePrincipal job(String job) {
        this.setJob(job);
        return this;
    }

    public void setJob(String job) {
        this.job = job;
    }

    public String getRoleNames() {
        return this.roleNames;
    }

    public TitlePrincipal roleNames(String roleNames) {
        this.setRoleNames(roleNames);
        return this;
    }

    public void setRoleNames(String roleNames) {
        this.roleNames = roleNames;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof TitlePrincipal)) {
            return false;
        }
        return id != null && id.equals(((TitlePrincipal) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "TitlePrincipal{" +
            "id=" + getId() +
            ", category=" + getCategory() +
            ", job='" + getJob() + "'" +
            ", roleNames='" + getRoleNames() + "'" +
            "}";
    }
}
