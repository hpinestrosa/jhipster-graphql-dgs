package com.openapi.jhipstergraphqldgs.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import com.openapi.jhipstergraphqldgs.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class TitleAkaDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(TitleAkaDTO.class);
        TitleAkaDTO titleAkaDTO1 = new TitleAkaDTO();
        titleAkaDTO1.setId(1L);
        TitleAkaDTO titleAkaDTO2 = new TitleAkaDTO();
        assertThat(titleAkaDTO1).isNotEqualTo(titleAkaDTO2);
        titleAkaDTO2.setId(titleAkaDTO1.getId());
        assertThat(titleAkaDTO1).isEqualTo(titleAkaDTO2);
        titleAkaDTO2.setId(2L);
        assertThat(titleAkaDTO1).isNotEqualTo(titleAkaDTO2);
        titleAkaDTO1.setId(null);
        assertThat(titleAkaDTO1).isNotEqualTo(titleAkaDTO2);
    }
}
