package com.openapi.jhipstergraphqldgs.service.dto;

import java.io.Serializable;
import java.util.Objects;
import javax.validation.constraints.*;

/**
 * A DTO for the {@link com.openapi.jhipstergraphqldgs.domain.TitleAka} entity.
 */
public class TitleAkaDTO implements Serializable {

    private Long id;

    @NotNull
    @Size(max = 500)
    private String akaTitle;

    @Size(max = 500)
    private String additionalAttrs;

    private Boolean isOriginalTitle;

    private RegionDTO region;

    private LanguageDTO language;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAkaTitle() {
        return akaTitle;
    }

    public void setAkaTitle(String akaTitle) {
        this.akaTitle = akaTitle;
    }

    public String getAdditionalAttrs() {
        return additionalAttrs;
    }

    public void setAdditionalAttrs(String additionalAttrs) {
        this.additionalAttrs = additionalAttrs;
    }

    public Boolean getIsOriginalTitle() {
        return isOriginalTitle;
    }

    public void setIsOriginalTitle(Boolean isOriginalTitle) {
        this.isOriginalTitle = isOriginalTitle;
    }

    public RegionDTO getRegion() {
        return region;
    }

    public void setRegion(RegionDTO region) {
        this.region = region;
    }

    public LanguageDTO getLanguage() {
        return language;
    }

    public void setLanguage(LanguageDTO language) {
        this.language = language;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof TitleAkaDTO)) {
            return false;
        }

        TitleAkaDTO titleAkaDTO = (TitleAkaDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, titleAkaDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "TitleAkaDTO{" +
            "id=" + getId() +
            ", akaTitle='" + getAkaTitle() + "'" +
            ", additionalAttrs='" + getAdditionalAttrs() + "'" +
            ", isOriginalTitle='" + getIsOriginalTitle() + "'" +
            ", region=" + getRegion() +
            ", language=" + getLanguage() +
            "}";
    }
}
