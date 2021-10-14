package com.openapi.jhipstergraphqldgs.repository;

import com.openapi.jhipstergraphqldgs.domain.Authority;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Spring Data JPA repository for the {@link Authority} entity.
 */
public interface AuthorityRepository extends JpaRepository<Authority, String> {}
