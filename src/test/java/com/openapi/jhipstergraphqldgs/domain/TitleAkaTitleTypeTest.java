package com.openapi.jhipstergraphqldgs.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.openapi.jhipstergraphqldgs.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class TitleAkaTitleTypeTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TitleAkaTitleType.class);
        TitleAkaTitleType titleAkaTitleType1 = new TitleAkaTitleType();
        titleAkaTitleType1.setId(1L);
        TitleAkaTitleType titleAkaTitleType2 = new TitleAkaTitleType();
        titleAkaTitleType2.setId(titleAkaTitleType1.getId());
        assertThat(titleAkaTitleType1).isEqualTo(titleAkaTitleType2);
        titleAkaTitleType2.setId(2L);
        assertThat(titleAkaTitleType1).isNotEqualTo(titleAkaTitleType2);
        titleAkaTitleType1.setId(null);
        assertThat(titleAkaTitleType1).isNotEqualTo(titleAkaTitleType2);
    }
}
