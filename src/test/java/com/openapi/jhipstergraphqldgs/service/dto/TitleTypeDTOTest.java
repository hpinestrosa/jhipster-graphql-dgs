package com.openapi.jhipstergraphqldgs.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import com.openapi.jhipstergraphqldgs.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class TitleTypeDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(TitleTypeDTO.class);
        TitleTypeDTO titleTypeDTO1 = new TitleTypeDTO();
        titleTypeDTO1.setId(1L);
        TitleTypeDTO titleTypeDTO2 = new TitleTypeDTO();
        assertThat(titleTypeDTO1).isNotEqualTo(titleTypeDTO2);
        titleTypeDTO2.setId(titleTypeDTO1.getId());
        assertThat(titleTypeDTO1).isEqualTo(titleTypeDTO2);
        titleTypeDTO2.setId(2L);
        assertThat(titleTypeDTO1).isNotEqualTo(titleTypeDTO2);
        titleTypeDTO1.setId(null);
        assertThat(titleTypeDTO1).isNotEqualTo(titleTypeDTO2);
    }
}
