package com.openapi.jhipstergraphqldgs.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import com.openapi.jhipstergraphqldgs.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class TalentDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(TalentDTO.class);
        TalentDTO talentDTO1 = new TalentDTO();
        talentDTO1.setId(1L);
        TalentDTO talentDTO2 = new TalentDTO();
        assertThat(talentDTO1).isNotEqualTo(talentDTO2);
        talentDTO2.setId(talentDTO1.getId());
        assertThat(talentDTO1).isEqualTo(talentDTO2);
        talentDTO2.setId(2L);
        assertThat(talentDTO1).isNotEqualTo(talentDTO2);
        talentDTO1.setId(null);
        assertThat(talentDTO1).isNotEqualTo(talentDTO2);
    }
}
