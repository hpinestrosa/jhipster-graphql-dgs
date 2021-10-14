package com.openapi.jhipstergraphqldgs.service.dto;

import java.io.Serializable;
import java.util.Objects;
import javax.validation.constraints.*;

/**
 * A DTO for the {@link com.openapi.jhipstergraphqldgs.domain.TitleType} entity.
 */
public class TitleTypeDTO implements Serializable {

    private Long id;

    @NotNull
    @Size(max = 100)
    private String titleTypeName;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitleTypeName() {
        return titleTypeName;
    }

    public void setTitleTypeName(String titleTypeName) {
        this.titleTypeName = titleTypeName;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof TitleTypeDTO)) {
            return false;
        }

        TitleTypeDTO titleTypeDTO = (TitleTypeDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, titleTypeDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "TitleTypeDTO{" +
            "id=" + getId() +
            ", titleTypeName='" + getTitleTypeName() + "'" +
            "}";
    }
}
