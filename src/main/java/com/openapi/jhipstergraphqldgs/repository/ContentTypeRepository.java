package com.openapi.jhipstergraphqldgs.repository;

import com.openapi.jhipstergraphqldgs.domain.ContentType;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the ContentType entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ContentTypeRepository extends JpaRepository<ContentType, Long> {}
