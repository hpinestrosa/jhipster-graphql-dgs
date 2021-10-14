package com.openapi.jhipstergraphqldgs.repository;

import com.openapi.jhipstergraphqldgs.domain.Talent;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Talent entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TalentRepository extends JpaRepository<Talent, Long> {}
