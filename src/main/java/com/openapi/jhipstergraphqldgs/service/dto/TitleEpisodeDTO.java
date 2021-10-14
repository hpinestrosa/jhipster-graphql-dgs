package com.openapi.jhipstergraphqldgs.service.dto;

import java.io.Serializable;
import java.util.Objects;
import javax.validation.constraints.*;

/**
 * A DTO for the {@link com.openapi.jhipstergraphqldgs.domain.TitleEpisode} entity.
 */
public class TitleEpisodeDTO implements Serializable {

    private Long id;

    @Size(max = 20)
    private String parentTitle;

    private Integer seasonNumber;

    private Integer episodeNumber;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getParentTitle() {
        return parentTitle;
    }

    public void setParentTitle(String parentTitle) {
        this.parentTitle = parentTitle;
    }

    public Integer getSeasonNumber() {
        return seasonNumber;
    }

    public void setSeasonNumber(Integer seasonNumber) {
        this.seasonNumber = seasonNumber;
    }

    public Integer getEpisodeNumber() {
        return episodeNumber;
    }

    public void setEpisodeNumber(Integer episodeNumber) {
        this.episodeNumber = episodeNumber;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof TitleEpisodeDTO)) {
            return false;
        }

        TitleEpisodeDTO titleEpisodeDTO = (TitleEpisodeDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, titleEpisodeDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "TitleEpisodeDTO{" +
            "id=" + getId() +
            ", parentTitle='" + getParentTitle() + "'" +
            ", seasonNumber=" + getSeasonNumber() +
            ", episodeNumber=" + getEpisodeNumber() +
            "}";
    }
}
