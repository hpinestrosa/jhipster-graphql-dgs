package com.openapi.jhipstergraphqldgs.service;

import com.openapi.jhipstergraphqldgs.service.dto.TitleEpisodeDTO;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link com.openapi.jhipstergraphqldgs.domain.TitleEpisode}.
 */
public interface TitleEpisodeService {
    /**
     * Save a titleEpisode.
     *
     * @param titleEpisodeDTO the entity to save.
     * @return the persisted entity.
     */
    TitleEpisodeDTO save(TitleEpisodeDTO titleEpisodeDTO);

    /**
     * Partially updates a titleEpisode.
     *
     * @param titleEpisodeDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<TitleEpisodeDTO> partialUpdate(TitleEpisodeDTO titleEpisodeDTO);

    /**
     * Get all the titleEpisodes.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<TitleEpisodeDTO> findAll(Pageable pageable);

    /**
     * Get the "id" titleEpisode.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<TitleEpisodeDTO> findOne(Long id);

    /**
     * Delete the "id" titleEpisode.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
