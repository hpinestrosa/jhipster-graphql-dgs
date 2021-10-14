package com.openapi.jhipstergraphqldgs.repository;

import com.openapi.jhipstergraphqldgs.domain.Title;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Title entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TitleRepository extends JpaRepository<Title, Long> {}
