package com.openapi.jhipstergraphqldgs.repository;

import com.openapi.jhipstergraphqldgs.domain.TitlePrincipal;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the TitlePrincipal entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TitlePrincipalRepository extends JpaRepository<TitlePrincipal, Long> {}
