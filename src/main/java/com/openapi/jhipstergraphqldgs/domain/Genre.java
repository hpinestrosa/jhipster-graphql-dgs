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
 * A Genre.
 */
@Entity
@Table(name = "genre")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Genre implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @NotNull
    @Size(max = 100)
    @Column(name = "genre_name", length = 100, nullable = false)
    private String genreName;

    @OneToMany(mappedBy = "genre")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "genre", "title" }, allowSetters = true)
    private Set<TitleGenre> titleGenres = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Genre id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getGenreName() {
        return this.genreName;
    }

    public Genre genreName(String genreName) {
        this.setGenreName(genreName);
        return this;
    }

    public void setGenreName(String genreName) {
        this.genreName = genreName;
    }

    public Set<TitleGenre> getTitleGenres() {
        return this.titleGenres;
    }

    public void setTitleGenres(Set<TitleGenre> titleGenres) {
        if (this.titleGenres != null) {
            this.titleGenres.forEach(i -> i.setGenre(null));
        }
        if (titleGenres != null) {
            titleGenres.forEach(i -> i.setGenre(this));
        }
        this.titleGenres = titleGenres;
    }

    public Genre titleGenres(Set<TitleGenre> titleGenres) {
        this.setTitleGenres(titleGenres);
        return this;
    }

    public Genre addTitleGenre(TitleGenre titleGenre) {
        this.titleGenres.add(titleGenre);
        titleGenre.setGenre(this);
        return this;
    }

    public Genre removeTitleGenre(TitleGenre titleGenre) {
        this.titleGenres.remove(titleGenre);
        titleGenre.setGenre(null);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Genre)) {
            return false;
        }
        return id != null && id.equals(((Genre) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Genre{" +
            "id=" + getId() +
            ", genreName='" + getGenreName() + "'" +
            "}";
    }
}
