package com.openapi.jhipstergraphqldgs.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A TitleGenre.
 */
@Entity
@Table(name = "title_genre")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class TitleGenre implements Serializable {

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
    @JsonIgnoreProperties(value = { "titleGenres" }, allowSetters = true)
    private Genre genre;

    @ManyToOne
    @JsonIgnoreProperties(value = { "contentType", "titleGenres" }, allowSetters = true)
    private Title title;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public TitleGenre id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getOrd() {
        return this.ord;
    }

    public TitleGenre ord(Integer ord) {
        this.setOrd(ord);
        return this;
    }

    public void setOrd(Integer ord) {
        this.ord = ord;
    }

    public Genre getGenre() {
        return this.genre;
    }

    public void setGenre(Genre genre) {
        this.genre = genre;
    }

    public TitleGenre genre(Genre genre) {
        this.setGenre(genre);
        return this;
    }

    public Title getTitle() {
        return this.title;
    }

    public void setTitle(Title title) {
        this.title = title;
    }

    public TitleGenre title(Title title) {
        this.setTitle(title);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof TitleGenre)) {
            return false;
        }
        return id != null && id.equals(((TitleGenre) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "TitleGenre{" +
            "id=" + getId() +
            ", ord=" + getOrd() +
            "}";
    }
}
