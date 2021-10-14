package com.openapi.jhipstergraphqldgs.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import com.openapi.jhipstergraphqldgs.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class TitleAkaTitleTypeDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(TitleAkaTitleTypeDTO.class);
        TitleAkaTitleTypeDTO titleAkaTitleTypeDTO1 = new TitleAkaTitleTypeDTO();
        titleAkaTitleTypeDTO1.setId(1L);
        TitleAkaTitleTypeDTO titleAkaTitleTypeDTO2 = new TitleAkaTitleTypeDTO();
        assertThat(titleAkaTitleTypeDTO1).isNotEqualTo(titleAkaTitleTypeDTO2);
        titleAkaTitleTypeDTO2.setId(titleAkaTitleTypeDTO1.getId());
        assertThat(titleAkaTitleTypeDTO1).isEqualTo(titleAkaTitleTypeDTO2);
        titleAkaTitleTypeDTO2.setId(2L);
        assertThat(titleAkaTitleTypeDTO1).isNotEqualTo(titleAkaTitleTypeDTO2);
        titleAkaTitleTypeDTO1.setId(null);
        assertThat(titleAkaTitleTypeDTO1).isNotEqualTo(titleAkaTitleTypeDTO2);
    }
}
