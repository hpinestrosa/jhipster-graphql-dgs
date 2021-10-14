package com.openapi.jhipstergraphqldgs.service;

import com.openapi.jhipstergraphqldgs.service.dto.TalentTitleDTO;
import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link com.openapi.jhipstergraphqldgs.domain.TalentTitle}.
 */
public interface TalentTitleService {
    /**
     * Save a talentTitle.
     *
     * @param talentTitleDTO the entity to save.
     * @return the persisted entity.
     */
    TalentTitleDTO save(TalentTitleDTO talentTitleDTO);

    /**
     * Partially updates a talentTitle.
     *
     * @param talentTitleDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<TalentTitleDTO> partialUpdate(TalentTitleDTO talentTitleDTO);

    /**
     * Get all the talentTitles.
     *
     * @return the list of entities.
     */
    List<TalentTitleDTO> findAll();

    /**
     * Get the "id" talentTitle.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<TalentTitleDTO> findOne(Long id);

    /**
     * Delete the "id" talentTitle.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
