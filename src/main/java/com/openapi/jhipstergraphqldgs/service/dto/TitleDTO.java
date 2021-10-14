package com.openapi.jhipstergraphqldgs.service.dto;

import java.io.Serializable;
import java.util.Objects;
import javax.validation.constraints.*;

/**
 * A DTO for the {@link com.openapi.jhipstergraphqldgs.domain.Title} entity.
 */
public class TitleDTO implements Serializable {

    private Long id;

    @NotNull
    @Size(max = 500)
    private String primaryTitle;

    @Size(max = 500)
    private String originalTitle;

    private Boolean isAdult;

    private Integer startYear;

    private Integer endYear;

    private Integer runtimeMinutes;

    private ContentTypeDTO contentType;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPrimaryTitle() {
        return primaryTitle;
    }

    public void setPrimaryTitle(String primaryTitle) {
        this.primaryTitle = primaryTitle;
    }

    public String getOriginalTitle() {
        return originalTitle;
    }

    public void setOriginalTitle(String originalTitle) {
        this.originalTitle = originalTitle;
    }

    public Boolean getIsAdult() {
        return isAdult;
    }

    public void setIsAdult(Boolean isAdult) {
        this.isAdult = isAdult;
    }

    public Integer getStartYear() {
        return startYear;
    }

    public void setStartYear(Integer startYear) {
        this.startYear = startYear;
    }

    public Integer getEndYear() {
        return endYear;
    }

    public void setEndYear(Integer endYear) {
        this.endYear = endYear;
    }

    public Integer getRuntimeMinutes() {
        return runtimeMinutes;
    }

    public void setRuntimeMinutes(Integer runtimeMinutes) {
        this.runtimeMinutes = runtimeMinutes;
    }

    public ContentTypeDTO getContentType() {
        return contentType;
    }

    public void setContentType(ContentTypeDTO contentType) {
        this.contentType = contentType;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof TitleDTO)) {
            return false;
        }

        TitleDTO titleDTO = (TitleDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, titleDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "TitleDTO{" +
            "id=" + getId() +
            ", primaryTitle='" + getPrimaryTitle() + "'" +
            ", originalTitle='" + getOriginalTitle() + "'" +
            ", isAdult='" + getIsAdult() + "'" +
            ", startYear=" + getStartYear() +
            ", endYear=" + getEndYear() +
            ", runtimeMinutes=" + getRuntimeMinutes() +
            ", contentType=" + getContentType() +
            "}";
    }
}
