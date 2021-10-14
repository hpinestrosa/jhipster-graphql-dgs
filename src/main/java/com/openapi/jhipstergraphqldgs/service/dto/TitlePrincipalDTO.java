package com.openapi.jhipstergraphqldgs.service.dto;

import java.io.Serializable;
import java.util.Objects;
import javax.validation.constraints.*;

/**
 * A DTO for the {@link com.openapi.jhipstergraphqldgs.domain.TitlePrincipal} entity.
 */
public class TitlePrincipalDTO implements Serializable {

    private Long id;

    @NotNull
    private Integer category;

    @Size(max = 1000)
    private String job;

    @Size(max = 1000)
    private String roleNames;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getCategory() {
        return category;
    }

    public void setCategory(Integer category) {
        this.category = category;
    }

    public String getJob() {
        return job;
    }

    public void setJob(String job) {
        this.job = job;
    }

    public String getRoleNames() {
        return roleNames;
    }

    public void setRoleNames(String roleNames) {
        this.roleNames = roleNames;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof TitlePrincipalDTO)) {
            return false;
        }

        TitlePrincipalDTO titlePrincipalDTO = (TitlePrincipalDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, titlePrincipalDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "TitlePrincipalDTO{" +
            "id=" + getId() +
            ", category=" + getCategory() +
            ", job='" + getJob() + "'" +
            ", roleNames='" + getRoleNames() + "'" +
            "}";
    }
}
