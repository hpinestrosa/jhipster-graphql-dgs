package com.openapi.jhipstergraphqldgs.repository;

import com.openapi.jhipstergraphqldgs.domain.TitleType;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the TitleType entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TitleTypeRepository extends JpaRepository<TitleType, Long> {}
