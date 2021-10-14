package com.openapi.jhipstergraphqldgs.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import com.openapi.jhipstergraphqldgs.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class TalentRoleDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(TalentRoleDTO.class);
        TalentRoleDTO talentRoleDTO1 = new TalentRoleDTO();
        talentRoleDTO1.setId(1L);
        TalentRoleDTO talentRoleDTO2 = new TalentRoleDTO();
        assertThat(talentRoleDTO1).isNotEqualTo(talentRoleDTO2);
        talentRoleDTO2.setId(talentRoleDTO1.getId());
        assertThat(talentRoleDTO1).isEqualTo(talentRoleDTO2);
        talentRoleDTO2.setId(2L);
        assertThat(talentRoleDTO1).isNotEqualTo(talentRoleDTO2);
        talentRoleDTO1.setId(null);
        assertThat(talentRoleDTO1).isNotEqualTo(talentRoleDTO2);
    }
}
