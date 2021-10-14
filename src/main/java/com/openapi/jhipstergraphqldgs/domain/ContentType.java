package com.openapi.jhipstergraphqldgs.domain;

import java.io.Serializable;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A ContentType.
 */
@Entity
@Table(name = "content_type")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class ContentType implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @NotNull
    @Size(max = 100)
    @Column(name = "content_type_name", length = 100, nullable = false)
    private String contentTypeName;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public ContentType id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getContentTypeName() {
        return this.contentTypeName;
    }

    public ContentType contentTypeName(String contentTypeName) {
        this.setContentTypeName(contentTypeName);
        return this;
    }

    public void setContentTypeName(String contentTypeName) {
        this.contentTypeName = contentTypeName;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ContentType)) {
            return false;
        }
        return id != null && id.equals(((ContentType) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ContentType{" +
            "id=" + getId() +
            ", contentTypeName='" + getContentTypeName() + "'" +
            "}";
    }
}
