package com.openapi.jhipstergraphqldgs.repository;

import com.openapi.jhipstergraphqldgs.domain.TitleAkaTitleType;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the TitleAkaTitleType entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TitleAkaTitleTypeRepository extends JpaRepository<TitleAkaTitleType, Long> {}
