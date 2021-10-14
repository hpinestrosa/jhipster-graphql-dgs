package com.openapi.jhipstergraphqldgs.service.dto;

import java.io.Serializable;
import java.util.Objects;
import javax.validation.constraints.*;

/**
 * A DTO for the {@link com.openapi.jhipstergraphqldgs.domain.Talent} entity.
 */
public class TalentDTO implements Serializable {

    private Long id;

    @NotNull
    @Size(max = 500)
    private String talentName;

    private Integer birthYear;

    private Integer deathYear;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTalentName() {
        return talentName;
    }

    public void setTalentName(String talentName) {
        this.talentName = talentName;
    }

    public Integer getBirthYear() {
        return birthYear;
    }

    public void setBirthYear(Integer birthYear) {
        this.birthYear = birthYear;
    }

    public Integer getDeathYear() {
        return deathYear;
    }

    public void setDeathYear(Integer deathYear) {
        this.deathYear = deathYear;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof TalentDTO)) {
            return false;
        }

        TalentDTO talentDTO = (TalentDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, talentDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "TalentDTO{" +
            "id=" + getId() +
            ", talentName='" + getTalentName() + "'" +
            ", birthYear=" + getBirthYear() +
            ", deathYear=" + getDeathYear() +
            "}";
    }
}
