package com.openapi.jhipstergraphqldgs.repository;

import com.openapi.jhipstergraphqldgs.domain.TitleGenre;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the TitleGenre entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TitleGenreRepository extends JpaRepository<TitleGenre, Long> {}
