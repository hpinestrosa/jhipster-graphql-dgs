package com.openapi.jhipstergraphqldgs.service.dto;

import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link com.openapi.jhipstergraphqldgs.domain.TitleAkaTitleType} entity.
 */
public class TitleAkaTitleTypeDTO implements Serializable {

    private Long id;

    private TitleTypeDTO titleType;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public TitleTypeDTO getTitleType() {
        return titleType;
    }

    public void setTitleType(TitleTypeDTO titleType) {
        this.titleType = titleType;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof TitleAkaTitleTypeDTO)) {
            return false;
        }

        TitleAkaTitleTypeDTO titleAkaTitleTypeDTO = (TitleAkaTitleTypeDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, titleAkaTitleTypeDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "TitleAkaTitleTypeDTO{" +
            "id=" + getId() +
            ", titleType=" + getTitleType() +
            "}";
    }
}
