package com.openapi.jhipstergraphqldgs.domain;

import java.io.Serializable;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A TitleAkaTitleType.
 */
@Entity
@Table(name = "title_aka_title_type")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class TitleAkaTitleType implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @OneToOne
    @JoinColumn(unique = true)
    private TitleType titleType;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public TitleAkaTitleType id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public TitleType getTitleType() {
        return this.titleType;
    }

    public void setTitleType(TitleType titleType) {
        this.titleType = titleType;
    }

    public TitleAkaTitleType titleType(TitleType titleType) {
        this.setTitleType(titleType);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof TitleAkaTitleType)) {
            return false;
        }
        return id != null && id.equals(((TitleAkaTitleType) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "TitleAkaTitleType{" +
            "id=" + getId() +
            "}";
    }
}
