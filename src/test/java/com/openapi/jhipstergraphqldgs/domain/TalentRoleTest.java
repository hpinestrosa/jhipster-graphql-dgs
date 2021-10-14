package com.openapi.jhipstergraphqldgs.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.openapi.jhipstergraphqldgs.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class TalentRoleTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TalentRole.class);
        TalentRole talentRole1 = new TalentRole();
        talentRole1.setId(1L);
        TalentRole talentRole2 = new TalentRole();
        talentRole2.setId(talentRole1.getId());
        assertThat(talentRole1).isEqualTo(talentRole2);
        talentRole2.setId(2L);
        assertThat(talentRole1).isNotEqualTo(talentRole2);
        talentRole1.setId(null);
        assertThat(talentRole1).isNotEqualTo(talentRole2);
    }
}
