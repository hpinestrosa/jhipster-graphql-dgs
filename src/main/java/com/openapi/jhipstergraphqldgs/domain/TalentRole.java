package com.openapi.jhipstergraphqldgs.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A TalentRole.
 */
@Entity
@Table(name = "talent_role")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class TalentRole implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "ord", nullable = false)
    private Integer ord;

    @ManyToOne
    @JsonIgnoreProperties(value = { "talentRoles" }, allowSetters = true)
    private Role role;

    @ManyToOne
    @JsonIgnoreProperties(value = { "talentRoles" }, allowSetters = true)
    private Talent talent;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public TalentRole id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getOrd() {
        return this.ord;
    }

    public TalentRole ord(Integer ord) {
        this.setOrd(ord);
        return this;
    }

    public void setOrd(Integer ord) {
        this.ord = ord;
    }

    public Role getRole() {
        return this.role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public TalentRole role(Role role) {
        this.setRole(role);
        return this;
    }

    public Talent getTalent() {
        return this.talent;
    }

    public void setTalent(Talent talent) {
        this.talent = talent;
    }

    public TalentRole talent(Talent talent) {
        this.setTalent(talent);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof TalentRole)) {
            return false;
        }
        return id != null && id.equals(((TalentRole) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "TalentRole{" +
            "id=" + getId() +
            ", ord=" + getOrd() +
            "}";
    }
}
