package com.openapi.jhipstergraphqldgs.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.openapi.jhipstergraphqldgs.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class TitleTypeTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TitleType.class);
        TitleType titleType1 = new TitleType();
        titleType1.setId(1L);
        TitleType titleType2 = new TitleType();
        titleType2.setId(titleType1.getId());
        assertThat(titleType1).isEqualTo(titleType2);
        titleType2.setId(2L);
        assertThat(titleType1).isNotEqualTo(titleType2);
        titleType1.setId(null);
        assertThat(titleType1).isNotEqualTo(titleType2);
    }
}
