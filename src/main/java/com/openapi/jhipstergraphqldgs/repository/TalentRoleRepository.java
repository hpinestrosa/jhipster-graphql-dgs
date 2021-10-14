package com.openapi.jhipstergraphqldgs.repository;

import com.openapi.jhipstergraphqldgs.domain.TalentRole;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the TalentRole entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TalentRoleRepository extends JpaRepository<TalentRole, Long> {}
