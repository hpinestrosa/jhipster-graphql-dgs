package com.openapi.jhipstergraphqldgs.service.mapper;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class TitlePrincipalMapperTest {

    private TitlePrincipalMapper titlePrincipalMapper;

    @BeforeEach
    public void setUp() {
        titlePrincipalMapper = new TitlePrincipalMapperImpl();
    }
}
