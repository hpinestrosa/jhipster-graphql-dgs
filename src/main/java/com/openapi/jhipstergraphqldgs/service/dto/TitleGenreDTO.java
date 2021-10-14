package com.openapi.jhipstergraphqldgs.service.dto;

import java.io.Serializable;
import java.util.Objects;
import javax.validation.constraints.*;

/**
 * A DTO for the {@link com.openapi.jhipstergraphqldgs.domain.TitleGenre} entity.
 */
public class TitleGenreDTO implements Serializable {

    private Long id;

    @NotNull
    private Integer ord;

    private GenreDTO genre;

    private TitleDTO title;

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

    public GenreDTO getGenre() {
        return genre;
    }

    public void setGenre(GenreDTO genre) {
        this.genre = genre;
    }

    public TitleDTO getTitle() {
        return title;
    }

    public void setTitle(TitleDTO title) {
        this.title = title;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof TitleGenreDTO)) {
            return false;
        }

        TitleGenreDTO titleGenreDTO = (TitleGenreDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, titleGenreDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "TitleGenreDTO{" +
            "id=" + getId() +
            ", ord=" + getOrd() +
            ", genre=" + getGenre() +
            ", title=" + getTitle() +
            "}";
    }
}
