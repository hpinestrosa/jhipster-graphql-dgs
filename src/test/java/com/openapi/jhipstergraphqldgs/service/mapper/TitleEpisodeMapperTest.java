package com.openapi.jhipstergraphqldgs.service.mapper;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class TitleEpisodeMapperTest {

    private TitleEpisodeMapper titleEpisodeMapper;

    @BeforeEach
    public void setUp() {
        titleEpisodeMapper = new TitleEpisodeMapperImpl();
    }
}
