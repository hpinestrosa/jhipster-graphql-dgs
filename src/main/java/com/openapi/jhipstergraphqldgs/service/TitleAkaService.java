package com.openapi.jhipstergraphqldgs.service;

import com.openapi.jhipstergraphqldgs.service.dto.TitleAkaDTO;
import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link com.openapi.jhipstergraphqldgs.domain.TitleAka}.
 */
public interface TitleAkaService {
    /**
     * Save a titleAka.
     *
     * @param titleAkaDTO the entity to save.
     * @return the persisted entity.
     */
    TitleAkaDTO save(TitleAkaDTO titleAkaDTO);

    /**
     * Partially updates a titleAka.
     *
     * @param titleAkaDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<TitleAkaDTO> partialUpdate(TitleAkaDTO titleAkaDTO);

    /**
     * Get all the titleAkas.
     *
     * @return the list of entities.
     */
    List<TitleAkaDTO> findAll();

    /**
     * Get the "id" titleAka.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<TitleAkaDTO> findOne(Long id);

    /**
     * Delete the "id" titleAka.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
