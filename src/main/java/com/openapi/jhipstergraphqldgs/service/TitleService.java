package com.openapi.jhipstergraphqldgs.service;

import com.openapi.jhipstergraphqldgs.service.dto.TitleDTO;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link com.openapi.jhipstergraphqldgs.domain.Title}.
 */
public interface TitleService {
    /**
     * Save a title.
     *
     * @param titleDTO the entity to save.
     * @return the persisted entity.
     */
    TitleDTO save(TitleDTO titleDTO);

    /**
     * Partially updates a title.
     *
     * @param titleDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<TitleDTO> partialUpdate(TitleDTO titleDTO);

    /**
     * Get all the titles.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<TitleDTO> findAll(Pageable pageable);

    /**
     * Get the "id" title.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<TitleDTO> findOne(Long id);

    /**
     * Delete the "id" title.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
