package com.openapi.jhipstergraphqldgs.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import com.openapi.jhipstergraphqldgs.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class TitlePrincipalDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(TitlePrincipalDTO.class);
        TitlePrincipalDTO titlePrincipalDTO1 = new TitlePrincipalDTO();
        titlePrincipalDTO1.setId(1L);
        TitlePrincipalDTO titlePrincipalDTO2 = new TitlePrincipalDTO();
        assertThat(titlePrincipalDTO1).isNotEqualTo(titlePrincipalDTO2);
        titlePrincipalDTO2.setId(titlePrincipalDTO1.getId());
        assertThat(titlePrincipalDTO1).isEqualTo(titlePrincipalDTO2);
        titlePrincipalDTO2.setId(2L);
        assertThat(titlePrincipalDTO1).isNotEqualTo(titlePrincipalDTO2);
        titlePrincipalDTO1.setId(null);
        assertThat(titlePrincipalDTO1).isNotEqualTo(titlePrincipalDTO2);
    }
}
