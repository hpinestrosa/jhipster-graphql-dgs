package com.openapi.jhipstergraphqldgs.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import com.openapi.jhipstergraphqldgs.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class TitleDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(TitleDTO.class);
        TitleDTO titleDTO1 = new TitleDTO();
        titleDTO1.setId(1L);
        TitleDTO titleDTO2 = new TitleDTO();
        assertThat(titleDTO1).isNotEqualTo(titleDTO2);
        titleDTO2.setId(titleDTO1.getId());
        assertThat(titleDTO1).isEqualTo(titleDTO2);
        titleDTO2.setId(2L);
        assertThat(titleDTO1).isNotEqualTo(titleDTO2);
        titleDTO1.setId(null);
        assertThat(titleDTO1).isNotEqualTo(titleDTO2);
    }
}
