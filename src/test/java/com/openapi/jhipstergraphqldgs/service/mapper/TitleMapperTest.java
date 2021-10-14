package com.openapi.jhipstergraphqldgs.service.mapper;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class TitleMapperTest {

    private TitleMapper titleMapper;

    @BeforeEach
    public void setUp() {
        titleMapper = new TitleMapperImpl();
    }
}
