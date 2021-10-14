package com.openapi.jhipstergraphqldgs.repository;

import com.openapi.jhipstergraphqldgs.domain.TitleEpisode;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the TitleEpisode entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TitleEpisodeRepository extends JpaRepository<TitleEpisode, Long> {}
