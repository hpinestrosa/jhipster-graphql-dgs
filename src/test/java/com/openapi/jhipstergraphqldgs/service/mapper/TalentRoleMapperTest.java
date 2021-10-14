package com.openapi.jhipstergraphqldgs.service.mapper;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class TalentRoleMapperTest {

    private TalentRoleMapper talentRoleMapper;

    @BeforeEach
    public void setUp() {
        talentRoleMapper = new TalentRoleMapperImpl();
    }
}
