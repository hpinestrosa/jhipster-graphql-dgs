package com.openapi.jhipstergraphqldgs.service.mapper;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class TitleGenreMapperTest {

    private TitleGenreMapper titleGenreMapper;

    @BeforeEach
    public void setUp() {
        titleGenreMapper = new TitleGenreMapperImpl();
    }
}
