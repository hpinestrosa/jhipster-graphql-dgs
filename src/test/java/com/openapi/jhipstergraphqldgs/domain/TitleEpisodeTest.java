package com.openapi.jhipstergraphqldgs.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.openapi.jhipstergraphqldgs.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class TitleEpisodeTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TitleEpisode.class);
        TitleEpisode titleEpisode1 = new TitleEpisode();
        titleEpisode1.setId(1L);
        TitleEpisode titleEpisode2 = new TitleEpisode();
        titleEpisode2.setId(titleEpisode1.getId());
        assertThat(titleEpisode1).isEqualTo(titleEpisode2);
        titleEpisode2.setId(2L);
        assertThat(titleEpisode1).isNotEqualTo(titleEpisode2);
        titleEpisode1.setId(null);
        assertThat(titleEpisode1).isNotEqualTo(titleEpisode2);
    }
}
