package com.openapi.jhipstergraphqldgs.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Talent.
 */
@Entity
@Table(name = "talent")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Talent implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @NotNull
    @Size(max = 500)
    @Column(name = "talent_name", length = 500, nullable = false)
    private String talentName;

    @Column(name = "birth_year")
    private Integer birthYear;

    @Column(name = "death_year")
    private Integer deathYear;

    @OneToMany(mappedBy = "talent")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "role", "talent" }, allowSetters = true)
    private Set<TalentRole> talentRoles = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Talent id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTalentName() {
        return this.talentName;
    }

    public Talent talentName(String talentName) {
        this.setTalentName(talentName);
        return this;
    }

    public void setTalentName(String talentName) {
        this.talentName = talentName;
    }

    public Integer getBirthYear() {
        return this.birthYear;
    }

    public Talent birthYear(Integer birthYear) {
        this.setBirthYear(birthYear);
        return this;
    }

    public void setBirthYear(Integer birthYear) {
        this.birthYear = birthYear;
    }

    public Integer getDeathYear() {
        return this.deathYear;
    }

    public Talent deathYear(Integer deathYear) {
        this.setDeathYear(deathYear);
        return this;
    }

    public void setDeathYear(Integer deathYear) {
        this.deathYear = deathYear;
    }

    public Set<TalentRole> getTalentRoles() {
        return this.talentRoles;
    }

    public void setTalentRoles(Set<TalentRole> talentRoles) {
        if (this.talentRoles != null) {
            this.talentRoles.forEach(i -> i.setTalent(null));
        }
        if (talentRoles != null) {
            talentRoles.forEach(i -> i.setTalent(this));
        }
        this.talentRoles = talentRoles;
    }

    public Talent talentRoles(Set<TalentRole> talentRoles) {
        this.setTalentRoles(talentRoles);
        return this;
    }

    public Talent addTalentRole(TalentRole talentRole) {
        this.talentRoles.add(talentRole);
        talentRole.setTalent(this);
        return this;
    }

    public Talent removeTalentRole(TalentRole talentRole) {
        this.talentRoles.remove(talentRole);
        talentRole.setTalent(null);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Talent)) {
            return false;
        }
        return id != null && id.equals(((Talent) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Talent{" +
            "id=" + getId() +
            ", talentName='" + getTalentName() + "'" +
            ", birthYear=" + getBirthYear() +
            ", deathYear=" + getDeathYear() +
            "}";
    }
}
