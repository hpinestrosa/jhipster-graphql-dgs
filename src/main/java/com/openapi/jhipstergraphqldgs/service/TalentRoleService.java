package com.openapi.jhipstergraphqldgs.service;

import com.openapi.jhipstergraphqldgs.service.dto.TalentRoleDTO;
import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link com.openapi.jhipstergraphqldgs.domain.TalentRole}.
 */
public interface TalentRoleService {
    /**
     * Save a talentRole.
     *
     * @param talentRoleDTO the entity to save.
     * @return the persisted entity.
     */
    TalentRoleDTO save(TalentRoleDTO talentRoleDTO);

    /**
     * Partially updates a talentRole.
     *
     * @param talentRoleDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<TalentRoleDTO> partialUpdate(TalentRoleDTO talentRoleDTO);

    /**
     * Get all the talentRoles.
     *
     * @return the list of entities.
     */
    List<TalentRoleDTO> findAll();

    /**
     * Get the "id" talentRole.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<TalentRoleDTO> findOne(Long id);

    /**
     * Delete the "id" talentRole.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
