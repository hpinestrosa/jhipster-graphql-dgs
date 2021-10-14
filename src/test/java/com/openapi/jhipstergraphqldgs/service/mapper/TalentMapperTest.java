package com.openapi.jhipstergraphqldgs.service.mapper;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class TalentMapperTest {

    private TalentMapper talentMapper;

    @BeforeEach
    public void setUp() {
        talentMapper = new TalentMapperImpl();
    }
}
