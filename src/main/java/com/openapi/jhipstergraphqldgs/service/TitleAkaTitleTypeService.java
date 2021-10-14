package com.openapi.jhipstergraphqldgs.service;

import com.openapi.jhipstergraphqldgs.service.dto.TitleAkaTitleTypeDTO;
import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link com.openapi.jhipstergraphqldgs.domain.TitleAkaTitleType}.
 */
public interface TitleAkaTitleTypeService {
    /**
     * Save a titleAkaTitleType.
     *
     * @param titleAkaTitleTypeDTO the entity to save.
     * @return the persisted entity.
     */
    TitleAkaTitleTypeDTO save(TitleAkaTitleTypeDTO titleAkaTitleTypeDTO);

    /**
     * Partially updates a titleAkaTitleType.
     *
     * @param titleAkaTitleTypeDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<TitleAkaTitleTypeDTO> partialUpdate(TitleAkaTitleTypeDTO titleAkaTitleTypeDTO);

    /**
     * Get all the titleAkaTitleTypes.
     *
     * @return the list of entities.
     */
    List<TitleAkaTitleTypeDTO> findAll();

    /**
     * Get the "id" titleAkaTitleType.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<TitleAkaTitleTypeDTO> findOne(Long id);

    /**
     * Delete the "id" titleAkaTitleType.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
