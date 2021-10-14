package com.openapi.jhipstergraphqldgs.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.openapi.jhipstergraphqldgs.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class TitleAkaTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TitleAka.class);
        TitleAka titleAka1 = new TitleAka();
        titleAka1.setId(1L);
        TitleAka titleAka2 = new TitleAka();
        titleAka2.setId(titleAka1.getId());
        assertThat(titleAka1).isEqualTo(titleAka2);
        titleAka2.setId(2L);
        assertThat(titleAka1).isNotEqualTo(titleAka2);
        titleAka1.setId(null);
        assertThat(titleAka1).isNotEqualTo(titleAka2);
    }
}
