package com.openapi.jhipstergraphqldgs.service.dto;

import java.io.Serializable;
import java.util.Objects;
import javax.validation.constraints.*;

/**
 * A DTO for the {@link com.openapi.jhipstergraphqldgs.domain.TalentRole} entity.
 */
public class TalentRoleDTO implements Serializable {

    private Long id;

    @NotNull
    private Integer ord;

    private RoleDTO role;

    private TalentDTO talent;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getOrd() {
        return ord;
    }

    public void setOrd(Integer ord) {
        this.ord = ord;
    }

    public RoleDTO getRole() {
        return role;
    }

    public void setRole(RoleDTO role) {
        this.role = role;
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
        if (!(o instanceof TalentRoleDTO)) {
            return false;
        }

        TalentRoleDTO talentRoleDTO = (TalentRoleDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, talentRoleDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "TalentRoleDTO{" +
            "id=" + getId() +
            ", ord=" + getOrd() +
            ", role=" + getRole() +
            ", talent=" + getTalent() +
            "}";
    }
}
