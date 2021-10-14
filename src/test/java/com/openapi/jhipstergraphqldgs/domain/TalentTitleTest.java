package com.openapi.jhipstergraphqldgs.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.openapi.jhipstergraphqldgs.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class TalentTitleTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TalentTitle.class);
        TalentTitle talentTitle1 = new TalentTitle();
        talentTitle1.setId(1L);
        TalentTitle talentTitle2 = new TalentTitle();
        talentTitle2.setId(talentTitle1.getId());
        assertThat(talentTitle1).isEqualTo(talentTitle2);
        talentTitle2.setId(2L);
        assertThat(talentTitle1).isNotEqualTo(talentTitle2);
        talentTitle1.setId(null);
        assertThat(talentTitle1).isNotEqualTo(talentTitle2);
    }
}
