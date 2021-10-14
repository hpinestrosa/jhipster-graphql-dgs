package com.openapi.jhipstergraphqldgs.repository;

import com.openapi.jhipstergraphqldgs.domain.TalentTitle;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the TalentTitle entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TalentTitleRepository extends JpaRepository<TalentTitle, Long> {}
