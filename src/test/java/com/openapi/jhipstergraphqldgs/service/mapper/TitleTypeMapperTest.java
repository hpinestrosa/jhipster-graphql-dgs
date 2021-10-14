package com.openapi.jhipstergraphqldgs.service.mapper;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class TitleTypeMapperTest {

    private TitleTypeMapper titleTypeMapper;

    @BeforeEach
    public void setUp() {
        titleTypeMapper = new TitleTypeMapperImpl();
    }
}
