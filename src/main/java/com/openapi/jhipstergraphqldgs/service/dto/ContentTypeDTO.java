package com.openapi.jhipstergraphqldgs.service.dto;

import java.io.Serializable;
import java.util.Objects;
import javax.validation.constraints.*;

/**
 * A DTO for the {@link com.openapi.jhipstergraphqldgs.domain.ContentType} entity.
 */
public class ContentTypeDTO implements Serializable {

    private Long id;

    @NotNull
    @Size(max = 100)
    private String contentTypeName;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getContentTypeName() {
        return contentTypeName;
    }

    public void setContentTypeName(String contentTypeName) {
        this.contentTypeName = contentTypeName;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ContentTypeDTO)) {
            return false;
        }

        ContentTypeDTO contentTypeDTO = (ContentTypeDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, contentTypeDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ContentTypeDTO{" +
            "id=" + getId() +
            ", contentTypeName='" + getContentTypeName() + "'" +
            "}";
    }
}
