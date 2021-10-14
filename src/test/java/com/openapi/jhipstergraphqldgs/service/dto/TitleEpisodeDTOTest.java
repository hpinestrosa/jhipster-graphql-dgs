package com.openapi.jhipstergraphqldgs.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import com.openapi.jhipstergraphqldgs.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class TitleEpisodeDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(TitleEpisodeDTO.class);
        TitleEpisodeDTO titleEpisodeDTO1 = new TitleEpisodeDTO();
        titleEpisodeDTO1.setId(1L);
        TitleEpisodeDTO titleEpisodeDTO2 = new TitleEpisodeDTO();
        assertThat(titleEpisodeDTO1).isNotEqualTo(titleEpisodeDTO2);
        titleEpisodeDTO2.setId(titleEpisodeDTO1.getId());
        assertThat(titleEpisodeDTO1).isEqualTo(titleEpisodeDTO2);
        titleEpisodeDTO2.setId(2L);
        assertThat(titleEpisodeDTO1).isNotEqualTo(titleEpisodeDTO2);
        titleEpisodeDTO1.setId(null);
        assertThat(titleEpisodeDTO1).isNotEqualTo(titleEpisodeDTO2);
    }
}
