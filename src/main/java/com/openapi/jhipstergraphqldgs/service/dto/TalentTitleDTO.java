package com.openapi.jhipstergraphqldgs.service.dto;

import java.io.Serializable;
import java.util.Objects;
import javax.validation.constraints.*;

/**
 * A DTO for the {@link com.openapi.jhipstergraphqldgs.domain.TalentTitle} entity.
 */
public class TalentTitleDTO implements Serializable {

    private Long id;

    @NotNull
    @Size(max = 20)
    private String title;

    private TalentDTO talent;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public TalentDTO getTalent() {
        return talent;
    }

    public void setTalent(TalentDTO talent) {
        this.talent = talent;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof TalentTitleDTO)) {
            return false;
        }

        TalentTitleDTO talentTitleDTO = (TalentTitleDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, talentTitleDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "TalentTitleDTO{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", talent=" + getTalent() +
            "}";
    }
}
