package com.openapi.jhipstergraphqldgs.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.openapi.jhipstergraphqldgs.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class TitleGenreTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TitleGenre.class);
        TitleGenre titleGenre1 = new TitleGenre();
        titleGenre1.setId(1L);
        TitleGenre titleGenre2 = new TitleGenre();
        titleGenre2.setId(titleGenre1.getId());
        assertThat(titleGenre1).isEqualTo(titleGenre2);
        titleGenre2.setId(2L);
        assertThat(titleGenre1).isNotEqualTo(titleGenre2);
        titleGenre1.setId(null);
        assertThat(titleGenre1).isNotEqualTo(titleGenre2);
    }
}
