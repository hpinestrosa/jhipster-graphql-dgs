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
 * A Title.
 */
@Entity
@Table(name = "title")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Title implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @NotNull
    @Size(max = 500)
    @Column(name = "primary_title", length = 500, nullable = false)
    private String primaryTitle;

    @Size(max = 500)
    @Column(name = "original_title", length = 500)
    private String originalTitle;

    @Column(name = "is_adult")
    private Boolean isAdult;

    @Column(name = "start_year")
    private Integer startYear;

    @Column(name = "end_year")
    private Integer endYear;

    @Column(name = "runtime_minutes")
    private Integer runtimeMinutes;

    @OneToOne
    @JoinColumn(unique = true)
    private ContentType contentType;

    @OneToMany(mappedBy = "title")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "genre", "title" }, allowSetters = true)
    private Set<TitleGenre> titleGenres = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Title id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPrimaryTitle() {
        return this.primaryTitle;
    }

    public Title primaryTitle(String primaryTitle) {
        this.setPrimaryTitle(primaryTitle);
        return this;
    }

    public void setPrimaryTitle(String primaryTitle) {
        this.primaryTitle = primaryTitle;
    }

    public String getOriginalTitle() {
        return this.originalTitle;
    }

    public Title originalTitle(String originalTitle) {
        this.setOriginalTitle(originalTitle);
        return this;
    }

    public void setOriginalTitle(String originalTitle) {
        this.originalTitle = originalTitle;
    }

    public Boolean getIsAdult() {
        return this.isAdult;
    }

    public Title isAdult(Boolean isAdult) {
        this.setIsAdult(isAdult);
        return this;
    }

    public void setIsAdult(Boolean isAdult) {
        this.isAdult = isAdult;
    }

    public Integer getStartYear() {
        return this.startYear;
    }

    public Title startYear(Integer startYear) {
        this.setStartYear(startYear);
        return this;
    }

    public void setStartYear(Integer startYear) {
        this.startYear = startYear;
    }

    public Integer getEndYear() {
        return this.endYear;
    }

    public Title endYear(Integer endYear) {
        this.setEndYear(endYear);
        return this;
    }

    public void setEndYear(Integer endYear) {
        this.endYear = endYear;
    }

    public Integer getRuntimeMinutes() {
        return this.runtimeMinutes;
    }

    public Title runtimeMinutes(Integer runtimeMinutes) {
        this.setRuntimeMinutes(runtimeMinutes);
        return this;
    }

    public void setRuntimeMinutes(Integer runtimeMinutes) {
        this.runtimeMinutes = runtimeMinutes;
    }

    public ContentType getContentType() {
        return this.contentType;
    }

    public void setContentType(ContentType contentType) {
        this.contentType = contentType;
    }

    public Title contentType(ContentType contentType) {
        this.setContentType(contentType);
        return this;
    }

    public Set<TitleGenre> getTitleGenres() {
        return this.titleGenres;
    }

    public void setTitleGenres(Set<TitleGenre> titleGenres) {
        if (this.titleGenres != null) {
            this.titleGenres.forEach(i -> i.setTitle(null));
        }
        if (titleGenres != null) {
            titleGenres.forEach(i -> i.setTitle(this));
        }
        this.titleGenres = titleGenres;
    }

    public Title titleGenres(Set<TitleGenre> titleGenres) {
        this.setTitleGenres(titleGenres);
        return this;
    }

    public Title addTitleGenre(TitleGenre titleGenre) {
        this.titleGenres.add(titleGenre);
        titleGenre.setTitle(this);
        return this;
    }

    public Title removeTitleGenre(TitleGenre titleGenre) {
        this.titleGenres.remove(titleGenre);
        titleGenre.setTitle(null);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Title)) {
            return false;
        }
        return id != null && id.equals(((Title) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Title{" +
            "id=" + getId() +
            ", primaryTitle='" + getPrimaryTitle() + "'" +
            ", originalTitle='" + getOriginalTitle() + "'" +
            ", isAdult='" + getIsAdult() + "'" +
            ", startYear=" + getStartYear() +
            ", endYear=" + getEndYear() +
            ", runtimeMinutes=" + getRuntimeMinutes() +
            "}";
    }
}
