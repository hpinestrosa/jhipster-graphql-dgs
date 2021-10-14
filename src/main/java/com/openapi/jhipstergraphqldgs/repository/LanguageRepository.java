package com.openapi.jhipstergraphqldgs.repository;

import com.openapi.jhipstergraphqldgs.domain.Language;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Language entity.
 */
@SuppressWarnings("unused")
@Repository
public interface LanguageRepository extends JpaRepository<Language, Long> {}
