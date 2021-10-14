package com.openapi.jhipstergraphqldgs.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.openapi.jhipstergraphqldgs.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class TalentTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Talent.class);
        Talent talent1 = new Talent();
        talent1.setId(1L);
        Talent talent2 = new Talent();
        talent2.setId(talent1.getId());
        assertThat(talent1).isEqualTo(talent2);
        talent2.setId(2L);
        assertThat(talent1).isNotEqualTo(talent2);
        talent1.setId(null);
        assertThat(talent1).isNotEqualTo(talent2);
    }
}
