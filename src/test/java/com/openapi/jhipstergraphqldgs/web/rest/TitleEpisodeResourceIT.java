package com.openapi.jhipstergraphqldgs.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.openapi.jhipstergraphqldgs.IntegrationTest;
import com.openapi.jhipstergraphqldgs.domain.TitleEpisode;
import com.openapi.jhipstergraphqldgs.repository.TitleEpisodeRepository;
import com.openapi.jhipstergraphqldgs.service.dto.TitleEpisodeDTO;
import com.openapi.jhipstergraphqldgs.service.mapper.TitleEpisodeMapper;
import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import javax.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link TitleEpisodeResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class TitleEpisodeResourceIT {

    private static final String DEFAULT_PARENT_TITLE = "AAAAAAAAAA";
    private static final String UPDATED_PARENT_TITLE = "BBBBBBBBBB";

    private static final Integer DEFAULT_SEASON_NUMBER = 1;
    private static final Integer UPDATED_SEASON_NUMBER = 2;

    private static final Integer DEFAULT_EPISODE_NUMBER = 1;
    private static final Integer UPDATED_EPISODE_NUMBER = 2;

    private static final String ENTITY_API_URL = "/api/title-episodes";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private TitleEpisodeRepository titleEpisodeRepository;

    @Autowired
    private TitleEpisodeMapper titleEpisodeMapper;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restTitleEpisodeMockMvc;

    private TitleEpisode titleEpisode;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TitleEpisode createEntity(EntityManager em) {
        TitleEpisode titleEpisode = new TitleEpisode()
            .parentTitle(DEFAULT_PARENT_TITLE)
            .seasonNumber(DEFAULT_SEASON_NUMBER)
            .episodeNumber(DEFAULT_EPISODE_NUMBER);
        return titleEpisode;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TitleEpisode createUpdatedEntity(EntityManager em) {
        TitleEpisode titleEpisode = new TitleEpisode()
            .parentTitle(UPDATED_PARENT_TITLE)
            .seasonNumber(UPDATED_SEASON_NUMBER)
            .episodeNumber(UPDATED_EPISODE_NUMBER);
        return titleEpisode;
    }

    @BeforeEach
    public void initTest() {
        titleEpisode = createEntity(em);
    }

    @Test
    @Transactional
    void createTitleEpisode() throws Exception {
        int databaseSizeBeforeCreate = titleEpisodeRepository.findAll().size();
        // Create the TitleEpisode
        TitleEpisodeDTO titleEpisodeDTO = titleEpisodeMapper.toDto(titleEpisode);
        restTitleEpisodeMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(titleEpisodeDTO))
            )
            .andExpect(status().isCreated());

        // Validate the TitleEpisode in the database
        List<TitleEpisode> titleEpisodeList = titleEpisodeRepository.findAll();
        assertThat(titleEpisodeList).hasSize(databaseSizeBeforeCreate + 1);
        TitleEpisode testTitleEpisode = titleEpisodeList.get(titleEpisodeList.size() - 1);
        assertThat(testTitleEpisode.getParentTitle()).isEqualTo(DEFAULT_PARENT_TITLE);
        assertThat(testTitleEpisode.getSeasonNumber()).isEqualTo(DEFAULT_SEASON_NUMBER);
        assertThat(testTitleEpisode.getEpisodeNumber()).isEqualTo(DEFAULT_EPISODE_NUMBER);
    }

    @Test
    @Transactional
    void createTitleEpisodeWithExistingId() throws Exception {
        // Create the TitleEpisode with an existing ID
        titleEpisode.setId(1L);
        TitleEpisodeDTO titleEpisodeDTO = titleEpisodeMapper.toDto(titleEpisode);

        int databaseSizeBeforeCreate = titleEpisodeRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restTitleEpisodeMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(titleEpisodeDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the TitleEpisode in the database
        List<TitleEpisode> titleEpisodeList = titleEpisodeRepository.findAll();
        assertThat(titleEpisodeList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllTitleEpisodes() throws Exception {
        // Initialize the database
        titleEpisodeRepository.saveAndFlush(titleEpisode);

        // Get all the titleEpisodeList
        restTitleEpisodeMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(titleEpisode.getId().intValue())))
            .andExpect(jsonPath("$.[*].parentTitle").value(hasItem(DEFAULT_PARENT_TITLE)))
            .andExpect(jsonPath("$.[*].seasonNumber").value(hasItem(DEFAULT_SEASON_NUMBER)))
            .andExpect(jsonPath("$.[*].episodeNumber").value(hasItem(DEFAULT_EPISODE_NUMBER)));
    }

    @Test
    @Transactional
    void getTitleEpisode() throws Exception {
        // Initialize the database
        titleEpisodeRepository.saveAndFlush(titleEpisode);

        // Get the titleEpisode
        restTitleEpisodeMockMvc
            .perform(get(ENTITY_API_URL_ID, titleEpisode.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(titleEpisode.getId().intValue()))
            .andExpect(jsonPath("$.parentTitle").value(DEFAULT_PARENT_TITLE))
            .andExpect(jsonPath("$.seasonNumber").value(DEFAULT_SEASON_NUMBER))
            .andExpect(jsonPath("$.episodeNumber").value(DEFAULT_EPISODE_NUMBER));
    }

    @Test
    @Transactional
    void getNonExistingTitleEpisode() throws Exception {
        // Get the titleEpisode
        restTitleEpisodeMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewTitleEpisode() throws Exception {
        // Initialize the database
        titleEpisodeRepository.saveAndFlush(titleEpisode);

        int databaseSizeBeforeUpdate = titleEpisodeRepository.findAll().size();

        // Update the titleEpisode
        TitleEpisode updatedTitleEpisode = titleEpisodeRepository.findById(titleEpisode.getId()).get();
        // Disconnect from session so that the updates on updatedTitleEpisode are not directly saved in db
        em.detach(updatedTitleEpisode);
        updatedTitleEpisode.parentTitle(UPDATED_PARENT_TITLE).seasonNumber(UPDATED_SEASON_NUMBER).episodeNumber(UPDATED_EPISODE_NUMBER);
        TitleEpisodeDTO titleEpisodeDTO = titleEpisodeMapper.toDto(updatedTitleEpisode);

        restTitleEpisodeMockMvc
            .perform(
                put(ENTITY_API_URL_ID, titleEpisodeDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(titleEpisodeDTO))
            )
            .andExpect(status().isOk());

        // Validate the TitleEpisode in the database
        List<TitleEpisode> titleEpisodeList = titleEpisodeRepository.findAll();
        assertThat(titleEpisodeList).hasSize(databaseSizeBeforeUpdate);
        TitleEpisode testTitleEpisode = titleEpisodeList.get(titleEpisodeList.size() - 1);
        assertThat(testTitleEpisode.getParentTitle()).isEqualTo(UPDATED_PARENT_TITLE);
        assertThat(testTitleEpisode.getSeasonNumber()).isEqualTo(UPDATED_SEASON_NUMBER);
        assertThat(testTitleEpisode.getEpisodeNumber()).isEqualTo(UPDATED_EPISODE_NUMBER);
    }

    @Test
    @Transactional
    void putNonExistingTitleEpisode() throws Exception {
        int databaseSizeBeforeUpdate = titleEpisodeRepository.findAll().size();
        titleEpisode.setId(count.incrementAndGet());

        // Create the TitleEpisode
        TitleEpisodeDTO titleEpisodeDTO = titleEpisodeMapper.toDto(titleEpisode);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTitleEpisodeMockMvc
            .perform(
                put(ENTITY_API_URL_ID, titleEpisodeDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(titleEpisodeDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the TitleEpisode in the database
        List<TitleEpisode> titleEpisodeList = titleEpisodeRepository.findAll();
        assertThat(titleEpisodeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchTitleEpisode() throws Exception {
        int databaseSizeBeforeUpdate = titleEpisodeRepository.findAll().size();
        titleEpisode.setId(count.incrementAndGet());

        // Create the TitleEpisode
        TitleEpisodeDTO titleEpisodeDTO = titleEpisodeMapper.toDto(titleEpisode);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTitleEpisodeMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(titleEpisodeDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the TitleEpisode in the database
        List<TitleEpisode> titleEpisodeList = titleEpisodeRepository.findAll();
        assertThat(titleEpisodeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamTitleEpisode() throws Exception {
        int databaseSizeBeforeUpdate = titleEpisodeRepository.findAll().size();
        titleEpisode.setId(count.incrementAndGet());

        // Create the TitleEpisode
        TitleEpisodeDTO titleEpisodeDTO = titleEpisodeMapper.toDto(titleEpisode);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTitleEpisodeMockMvc
            .perform(
                put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(titleEpisodeDTO))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the TitleEpisode in the database
        List<TitleEpisode> titleEpisodeList = titleEpisodeRepository.findAll();
        assertThat(titleEpisodeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateTitleEpisodeWithPatch() throws Exception {
        // Initialize the database
        titleEpisodeRepository.saveAndFlush(titleEpisode);

        int databaseSizeBeforeUpdate = titleEpisodeRepository.findAll().size();

        // Update the titleEpisode using partial update
        TitleEpisode partialUpdatedTitleEpisode = new TitleEpisode();
        partialUpdatedTitleEpisode.setId(titleEpisode.getId());

        partialUpdatedTitleEpisode.seasonNumber(UPDATED_SEASON_NUMBER).episodeNumber(UPDATED_EPISODE_NUMBER);

        restTitleEpisodeMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedTitleEpisode.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedTitleEpisode))
            )
            .andExpect(status().isOk());

        // Validate the TitleEpisode in the database
        List<TitleEpisode> titleEpisodeList = titleEpisodeRepository.findAll();
        assertThat(titleEpisodeList).hasSize(databaseSizeBeforeUpdate);
        TitleEpisode testTitleEpisode = titleEpisodeList.get(titleEpisodeList.size() - 1);
        assertThat(testTitleEpisode.getParentTitle()).isEqualTo(DEFAULT_PARENT_TITLE);
        assertThat(testTitleEpisode.getSeasonNumber()).isEqualTo(UPDATED_SEASON_NUMBER);
        assertThat(testTitleEpisode.getEpisodeNumber()).isEqualTo(UPDATED_EPISODE_NUMBER);
    }

    @Test
    @Transactional
    void fullUpdateTitleEpisodeWithPatch() throws Exception {
        // Initialize the database
        titleEpisodeRepository.saveAndFlush(titleEpisode);

        int databaseSizeBeforeUpdate = titleEpisodeRepository.findAll().size();

        // Update the titleEpisode using partial update
        TitleEpisode partialUpdatedTitleEpisode = new TitleEpisode();
        partialUpdatedTitleEpisode.setId(titleEpisode.getId());

        partialUpdatedTitleEpisode
            .parentTitle(UPDATED_PARENT_TITLE)
            .seasonNumber(UPDATED_SEASON_NUMBER)
            .episodeNumber(UPDATED_EPISODE_NUMBER);

        restTitleEpisodeMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedTitleEpisode.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedTitleEpisode))
            )
            .andExpect(status().isOk());

        // Validate the TitleEpisode in the database
        List<TitleEpisode> titleEpisodeList = titleEpisodeRepository.findAll();
        assertThat(titleEpisodeList).hasSize(databaseSizeBeforeUpdate);
        TitleEpisode testTitleEpisode = titleEpisodeList.get(titleEpisodeList.size() - 1);
        assertThat(testTitleEpisode.getParentTitle()).isEqualTo(UPDATED_PARENT_TITLE);
        assertThat(testTitleEpisode.getSeasonNumber()).isEqualTo(UPDATED_SEASON_NUMBER);
        assertThat(testTitleEpisode.getEpisodeNumber()).isEqualTo(UPDATED_EPISODE_NUMBER);
    }

    @Test
    @Transactional
    void patchNonExistingTitleEpisode() throws Exception {
        int databaseSizeBeforeUpdate = titleEpisodeRepository.findAll().size();
        titleEpisode.setId(count.incrementAndGet());

        // Create the TitleEpisode
        TitleEpisodeDTO titleEpisodeDTO = titleEpisodeMapper.toDto(titleEpisode);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTitleEpisodeMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, titleEpisodeDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(titleEpisodeDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the TitleEpisode in the database
        List<TitleEpisode> titleEpisodeList = titleEpisodeRepository.findAll();
        assertThat(titleEpisodeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchTitleEpisode() throws Exception {
        int databaseSizeBeforeUpdate = titleEpisodeRepository.findAll().size();
        titleEpisode.setId(count.incrementAndGet());

        // Create the TitleEpisode
        TitleEpisodeDTO titleEpisodeDTO = titleEpisodeMapper.toDto(titleEpisode);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTitleEpisodeMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(titleEpisodeDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the TitleEpisode in the database
        List<TitleEpisode> titleEpisodeList = titleEpisodeRepository.findAll();
        assertThat(titleEpisodeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamTitleEpisode() throws Exception {
        int databaseSizeBeforeUpdate = titleEpisodeRepository.findAll().size();
        titleEpisode.setId(count.incrementAndGet());

        // Create the TitleEpisode
        TitleEpisodeDTO titleEpisodeDTO = titleEpisodeMapper.toDto(titleEpisode);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTitleEpisodeMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(titleEpisodeDTO))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the TitleEpisode in the database
        List<TitleEpisode> titleEpisodeList = titleEpisodeRepository.findAll();
        assertThat(titleEpisodeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteTitleEpisode() throws Exception {
        // Initialize the database
        titleEpisodeRepository.saveAndFlush(titleEpisode);

        int databaseSizeBeforeDelete = titleEpisodeRepository.findAll().size();

        // Delete the titleEpisode
        restTitleEpisodeMockMvc
            .perform(delete(ENTITY_API_URL_ID, titleEpisode.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<TitleEpisode> titleEpisodeList = titleEpisodeRepository.findAll();
        assertThat(titleEpisodeList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
