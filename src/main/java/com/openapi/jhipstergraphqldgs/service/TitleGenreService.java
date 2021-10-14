package com.openapi.jhipstergraphqldgs.service;

import com.openapi.jhipstergraphqldgs.service.dto.TitleGenreDTO;
import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link com.openapi.jhipstergraphqldgs.domain.TitleGenre}.
 */
public interface TitleGenreService {
    /**
     * Save a titleGenre.
     *
     * @param titleGenreDTO the entity to save.
     * @return the persisted entity.
     */
    TitleGenreDTO save(TitleGenreDTO titleGenreDTO);

    /**
     * Partially updates a titleGenre.
     *
     * @param titleGenreDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<TitleGenreDTO> partialUpdate(TitleGenreDTO titleGenreDTO);

    /**
     * Get all the titleGenres.
     *
     * @return the list of entities.
     */
    List<TitleGenreDTO> findAll();

    /**
     * Get the "id" titleGenre.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<TitleGenreDTO> findOne(Long id);

    /**
     * Delete the "id" titleGenre.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
