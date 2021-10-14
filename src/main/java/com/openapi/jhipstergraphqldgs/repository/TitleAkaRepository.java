package com.openapi.jhipstergraphqldgs.repository;

import com.openapi.jhipstergraphqldgs.domain.TitleAka;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the TitleAka entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TitleAkaRepository extends JpaRepository<TitleAka, Long> {}
