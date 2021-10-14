package com.openapi.jhipstergraphqldgs.service;

import com.openapi.jhipstergraphqldgs.service.dto.TalentDTO;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link com.openapi.jhipstergraphqldgs.domain.Talent}.
 */
public interface TalentService {
    /**
     * Save a talent.
     *
     * @param talentDTO the entity to save.
     * @return the persisted entity.
     */
    TalentDTO save(TalentDTO talentDTO);

    /**
     * Partially updates a talent.
     *
     * @param talentDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<TalentDTO> partialUpdate(TalentDTO talentDTO);

    /**
     * Get all the talents.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<TalentDTO> findAll(Pageable pageable);

    /**
     * Get the "id" talent.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<TalentDTO> findOne(Long id);

    /**
     * Delete the "id" talent.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
