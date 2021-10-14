package com.openapi.jhipstergraphqldgs.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.openapi.jhipstergraphqldgs.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class TitlePrincipalTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TitlePrincipal.class);
        TitlePrincipal titlePrincipal1 = new TitlePrincipal();
        titlePrincipal1.setId(1L);
        TitlePrincipal titlePrincipal2 = new TitlePrincipal();
        titlePrincipal2.setId(titlePrincipal1.getId());
        assertThat(titlePrincipal1).isEqualTo(titlePrincipal2);
        titlePrincipal2.setId(2L);
        assertThat(titlePrincipal1).isNotEqualTo(titlePrincipal2);
        titlePrincipal1.setId(null);
        assertThat(titlePrincipal1).isNotEqualTo(titlePrincipal2);
    }
}
