package com.openapi.jhipstergraphqldgs.service;

import com.openapi.jhipstergraphqldgs.service.dto.TitlePrincipalDTO;
import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link com.openapi.jhipstergraphqldgs.domain.TitlePrincipal}.
 */
public interface TitlePrincipalService {
    /**
     * Save a titlePrincipal.
     *
     * @param titlePrincipalDTO the entity to save.
     * @return the persisted entity.
     */
    TitlePrincipalDTO save(TitlePrincipalDTO titlePrincipalDTO);

    /**
     * Partially updates a titlePrincipal.
     *
     * @param titlePrincipalDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<TitlePrincipalDTO> partialUpdate(TitlePrincipalDTO titlePrincipalDTO);

    /**
     * Get all the titlePrincipals.
     *
     * @return the list of entities.
     */
    List<TitlePrincipalDTO> findAll();

    /**
     * Get the "id" titlePrincipal.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<TitlePrincipalDTO> findOne(Long id);

    /**
     * Delete the "id" titlePrincipal.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
