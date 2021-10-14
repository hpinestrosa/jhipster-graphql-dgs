package com.openapi.jhipstergraphqldgs.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import com.openapi.jhipstergraphqldgs.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class TalentTitleDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(TalentTitleDTO.class);
        TalentTitleDTO talentTitleDTO1 = new TalentTitleDTO();
        talentTitleDTO1.setId(1L);
        TalentTitleDTO talentTitleDTO2 = new TalentTitleDTO();
        assertThat(talentTitleDTO1).isNotEqualTo(talentTitleDTO2);
        talentTitleDTO2.setId(talentTitleDTO1.getId());
        assertThat(talentTitleDTO1).isEqualTo(talentTitleDTO2);
        talentTitleDTO2.setId(2L);
        assertThat(talentTitleDTO1).isNotEqualTo(talentTitleDTO2);
        talentTitleDTO1.setId(null);
        assertThat(talentTitleDTO1).isNotEqualTo(talentTitleDTO2);
    }
}
