package com.openapi.jhipstergraphqldgs.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import com.openapi.jhipstergraphqldgs.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class TitleGenreDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(TitleGenreDTO.class);
        TitleGenreDTO titleGenreDTO1 = new TitleGenreDTO();
        titleGenreDTO1.setId(1L);
        TitleGenreDTO titleGenreDTO2 = new TitleGenreDTO();
        assertThat(titleGenreDTO1).isNotEqualTo(titleGenreDTO2);
        titleGenreDTO2.setId(titleGenreDTO1.getId());
        assertThat(titleGenreDTO1).isEqualTo(titleGenreDTO2);
        titleGenreDTO2.setId(2L);
        assertThat(titleGenreDTO1).isNotEqualTo(titleGenreDTO2);
        titleGenreDTO1.setId(null);
        assertThat(titleGenreDTO1).isNotEqualTo(titleGenreDTO2);
    }
}
