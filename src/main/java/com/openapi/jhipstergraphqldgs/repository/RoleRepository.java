package com.openapi.jhipstergraphqldgs.repository;

import com.openapi.jhipstergraphqldgs.domain.Role;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Role entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {}
