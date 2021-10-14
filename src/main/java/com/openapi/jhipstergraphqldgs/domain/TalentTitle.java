package com.openapi.jhipstergraphqldgs.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A TalentTitle.
 */
@Entity
@Table(name = "talent_title")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class TalentTitle implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @NotNull
    @Size(max = 20)
    @Column(name = "title", length = 20, nullable = false)
    private String title;

    @JsonIgnoreProperties(value = { "talentRoles" }, allowSetters = true)
    @OneToOne
    @JoinColumn(unique = true)
    private Talent talent;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public TalentTitle id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return this.title;
    }

    public TalentTitle title(String title) {
        this.setTitle(title);
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Talent getTalent() {
        return this.talent;
    }

    public void setTalent(Talent talent) {
        this.talent = talent;
    }

    public TalentTitle talent(Talent talent) {
        this.setTalent(talent);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof TalentTitle)) {
            return false;
        }
        return id != null && id.equals(((TalentTitle) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "TalentTitle{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            "}";
    }
}
