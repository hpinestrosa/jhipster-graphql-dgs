package com.openapi.jhipstergraphqldgs.domain;

import java.io.Serializable;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A TitleAka.
 */
@Entity
@Table(name = "title_aka")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class TitleAka implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @NotNull
    @Size(max = 500)
    @Column(name = "aka_title", length = 500, nullable = false)
    private String akaTitle;

    @Size(max = 500)
    @Column(name = "additional_attrs", length = 500)
    private String additionalAttrs;

    @Column(name = "is_original_title")
    private Boolean isOriginalTitle;

    @OneToOne
    @JoinColumn(unique = true)
    private Region region;

    @OneToOne
    @JoinColumn(unique = true)
    private Language language;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public TitleAka id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAkaTitle() {
        return this.akaTitle;
    }

    public TitleAka akaTitle(String akaTitle) {
        this.setAkaTitle(akaTitle);
        return this;
    }

    public void setAkaTitle(String akaTitle) {
        this.akaTitle = akaTitle;
    }

    public String getAdditionalAttrs() {
        return this.additionalAttrs;
    }

    public TitleAka additionalAttrs(String additionalAttrs) {
        this.setAdditionalAttrs(additionalAttrs);
        return this;
    }

    public void setAdditionalAttrs(String additionalAttrs) {
        this.additionalAttrs = additionalAttrs;
    }

    public Boolean getIsOriginalTitle() {
        return this.isOriginalTitle;
    }

    public TitleAka isOriginalTitle(Boolean isOriginalTitle) {
        this.setIsOriginalTitle(isOriginalTitle);
        return this;
    }

    public void setIsOriginalTitle(Boolean isOriginalTitle) {
        this.isOriginalTitle = isOriginalTitle;
    }

    public Region getRegion() {
        return this.region;
    }

    public void setRegion(Region region) {
        this.region = region;
    }

    public TitleAka region(Region region) {
        this.setRegion(region);
        return this;
    }

    public Language getLanguage() {
        return this.language;
    }

    public void setLanguage(Language language) {
        this.language = language;
    }

    public TitleAka language(Language language) {
        this.setLanguage(language);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof TitleAka)) {
            return false;
        }
        return id != null && id.equals(((TitleAka) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "TitleAka{" +
            "id=" + getId() +
            ", akaTitle='" + getAkaTitle() + "'" +
            ", additionalAttrs='" + getAdditionalAttrs() + "'" +
            ", isOriginalTitle='" + getIsOriginalTitle() + "'" +
            "}";
    }
}
