package com.openapi.jhipstergraphqldgs.domain;

import java.io.Serializable;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A TitleEpisode.
 */
@Entity
@Table(name = "title_episode")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class TitleEpisode implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Size(max = 20)
    @Column(name = "parent_title", length = 20)
    private String parentTitle;

    @Column(name = "season_number")
    private Integer seasonNumber;

    @Column(name = "episode_number")
    private Integer episodeNumber;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public TitleEpisode id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getParentTitle() {
        return this.parentTitle;
    }

    public TitleEpisode parentTitle(String parentTitle) {
        this.setParentTitle(parentTitle);
        return this;
    }

    public void setParentTitle(String parentTitle) {
        this.parentTitle = parentTitle;
    }

    public Integer getSeasonNumber() {
        return this.seasonNumber;
    }

    public TitleEpisode seasonNumber(Integer seasonNumber) {
        this.setSeasonNumber(seasonNumber);
        return this;
    }

    public void setSeasonNumber(Integer seasonNumber) {
        this.seasonNumber = seasonNumber;
    }

    public Integer getEpisodeNumber() {
        return this.episodeNumber;
    }

    public TitleEpisode episodeNumber(Integer episodeNumber) {
        this.setEpisodeNumber(episodeNumber);
        return this;
    }

    public void setEpisodeNumber(Integer episodeNumber) {
        this.episodeNumber = episodeNumber;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof TitleEpisode)) {
            return false;
        }
        return id != null && id.equals(((TitleEpisode) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "TitleEpisode{" +
            "id=" + getId() +
            ", parentTitle='" + getParentTitle() + "'" +
            ", seasonNumber=" + getSeasonNumber() +
            ", episodeNumber=" + getEpisodeNumber() +
            "}";
    }
}
