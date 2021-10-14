package com.openapi.jhipstergraphqldgs.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.openapi.jhipstergraphqldgs.IntegrationTest;
import com.openapi.jhipstergraphqldgs.domain.TalentTitle;
import com.openapi.jhipstergraphqldgs.repository.TalentTitleRepository;
import com.openapi.jhipstergraphqldgs.service.dto.TalentTitleDTO;
import com.openapi.jhipstergraphqldgs.service.mapper.TalentTitleMapper;
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
 * Integration tests for the {@link TalentTitleResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class TalentTitleResourceIT {

    private static final String DEFAULT_TITLE = "AAAAAAAAAA";
    private static final String UPDATED_TITLE = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/talent-titles";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private TalentTitleRepository talentTitleRepository;

    @Autowired
    private TalentTitleMapper talentTitleMapper;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restTalentTitleMockMvc;

    private TalentTitle talentTitle;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TalentTitle createEntity(EntityManager em) {
        TalentTitle talentTitle = new TalentTitle().title(DEFAULT_TITLE);
        return talentTitle;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TalentTitle createUpdatedEntity(EntityManager em) {
        TalentTitle talentTitle = new TalentTitle().title(UPDATED_TITLE);
        return talentTitle;
    }

    @BeforeEach
    public void initTest() {
        talentTitle = createEntity(em);
    }

    @Test
    @Transactional
    void createTalentTitle() throws Exception {
        int databaseSizeBeforeCreate = talentTitleRepository.findAll().size();
        // Create the TalentTitle
        TalentTitleDTO talentTitleDTO = talentTitleMapper.toDto(talentTitle);
        restTalentTitleMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(talentTitleDTO))
            )
            .andExpect(status().isCreated());

        // Validate the TalentTitle in the database
        List<TalentTitle> talentTitleList = talentTitleRepository.findAll();
        assertThat(talentTitleList).hasSize(databaseSizeBeforeCreate + 1);
        TalentTitle testTalentTitle = talentTitleList.get(talentTitleList.size() - 1);
        assertThat(testTalentTitle.getTitle()).isEqualTo(DEFAULT_TITLE);
    }

    @Test
    @Transactional
    void createTalentTitleWithExistingId() throws Exception {
        // Create the TalentTitle with an existing ID
        talentTitle.setId(1L);
        TalentTitleDTO talentTitleDTO = talentTitleMapper.toDto(talentTitle);

        int databaseSizeBeforeCreate = talentTitleRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restTalentTitleMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(talentTitleDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the TalentTitle in the database
        List<TalentTitle> talentTitleList = talentTitleRepository.findAll();
        assertThat(talentTitleList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkTitleIsRequired() throws Exception {
        int databaseSizeBeforeTest = talentTitleRepository.findAll().size();
        // set the field null
        talentTitle.setTitle(null);

        // Create the TalentTitle, which fails.
        TalentTitleDTO talentTitleDTO = talentTitleMapper.toDto(talentTitle);

        restTalentTitleMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(talentTitleDTO))
            )
            .andExpect(status().isBadRequest());

        List<TalentTitle> talentTitleList = talentTitleRepository.findAll();
        assertThat(talentTitleList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllTalentTitles() throws Exception {
        // Initialize the database
        talentTitleRepository.saveAndFlush(talentTitle);

        // Get all the talentTitleList
        restTalentTitleMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(talentTitle.getId().intValue())))
            .andExpect(jsonPath("$.[*].title").value(hasItem(DEFAULT_TITLE)));
    }

    @Test
    @Transactional
    void getTalentTitle() throws Exception {
        // Initialize the database
        talentTitleRepository.saveAndFlush(talentTitle);

        // Get the talentTitle
        restTalentTitleMockMvc
            .perform(get(ENTITY_API_URL_ID, talentTitle.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(talentTitle.getId().intValue()))
            .andExpect(jsonPath("$.title").value(DEFAULT_TITLE));
    }

    @Test
    @Transactional
    void getNonExistingTalentTitle() throws Exception {
        // Get the talentTitle
        restTalentTitleMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewTalentTitle() throws Exception {
        // Initialize the database
        talentTitleRepository.saveAndFlush(talentTitle);

        int databaseSizeBeforeUpdate = talentTitleRepository.findAll().size();

        // Update the talentTitle
        TalentTitle updatedTalentTitle = talentTitleRepository.findById(talentTitle.getId()).get();
        // Disconnect from session so that the updates on updatedTalentTitle are not directly saved in db
        em.detach(updatedTalentTitle);
        updatedTalentTitle.title(UPDATED_TITLE);
        TalentTitleDTO talentTitleDTO = talentTitleMapper.toDto(updatedTalentTitle);

        restTalentTitleMockMvc
            .perform(
                put(ENTITY_API_URL_ID, talentTitleDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(talentTitleDTO))
            )
            .andExpect(status().isOk());

        // Validate the TalentTitle in the database
        List<TalentTitle> talentTitleList = talentTitleRepository.findAll();
        assertThat(talentTitleList).hasSize(databaseSizeBeforeUpdate);
        TalentTitle testTalentTitle = talentTitleList.get(talentTitleList.size() - 1);
        assertThat(testTalentTitle.getTitle()).isEqualTo(UPDATED_TITLE);
    }

    @Test
    @Transactional
    void putNonExistingTalentTitle() throws Exception {
        int databaseSizeBeforeUpdate = talentTitleRepository.findAll().size();
        talentTitle.setId(count.incrementAndGet());

        // Create the TalentTitle
        TalentTitleDTO talentTitleDTO = talentTitleMapper.toDto(talentTitle);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTalentTitleMockMvc
            .perform(
                put(ENTITY_API_URL_ID, talentTitleDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(talentTitleDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the TalentTitle in the database
        List<TalentTitle> talentTitleList = talentTitleRepository.findAll();
        assertThat(talentTitleList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchTalentTitle() throws Exception {
        int databaseSizeBeforeUpdate = talentTitleRepository.findAll().size();
        talentTitle.setId(count.incrementAndGet());

        // Create the TalentTitle
        TalentTitleDTO talentTitleDTO = talentTitleMapper.toDto(talentTitle);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTalentTitleMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(talentTitleDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the TalentTitle in the database
        List<TalentTitle> talentTitleList = talentTitleRepository.findAll();
        assertThat(talentTitleList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamTalentTitle() throws Exception {
        int databaseSizeBeforeUpdate = talentTitleRepository.findAll().size();
        talentTitle.setId(count.incrementAndGet());

        // Create the TalentTitle
        TalentTitleDTO talentTitleDTO = talentTitleMapper.toDto(talentTitle);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTalentTitleMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(talentTitleDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the TalentTitle in the database
        List<TalentTitle> talentTitleList = talentTitleRepository.findAll();
        assertThat(talentTitleList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateTalentTitleWithPatch() throws Exception {
        // Initialize the database
        talentTitleRepository.saveAndFlush(talentTitle);

        int databaseSizeBeforeUpdate = talentTitleRepository.findAll().size();

        // Update the talentTitle using partial update
        TalentTitle partialUpdatedTalentTitle = new TalentTitle();
        partialUpdatedTalentTitle.setId(talentTitle.getId());

        restTalentTitleMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedTalentTitle.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedTalentTitle))
            )
            .andExpect(status().isOk());

        // Validate the TalentTitle in the database
        List<TalentTitle> talentTitleList = talentTitleRepository.findAll();
        assertThat(talentTitleList).hasSize(databaseSizeBeforeUpdate);
        TalentTitle testTalentTitle = talentTitleList.get(talentTitleList.size() - 1);
        assertThat(testTalentTitle.getTitle()).isEqualTo(DEFAULT_TITLE);
    }

    @Test
    @Transactional
    void fullUpdateTalentTitleWithPatch() throws Exception {
        // Initialize the database
        talentTitleRepository.saveAndFlush(talentTitle);

        int databaseSizeBeforeUpdate = talentTitleRepository.findAll().size();

        // Update the talentTitle using partial update
        TalentTitle partialUpdatedTalentTitle = new TalentTitle();
        partialUpdatedTalentTitle.setId(talentTitle.getId());

        partialUpdatedTalentTitle.title(UPDATED_TITLE);

        restTalentTitleMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedTalentTitle.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedTalentTitle))
            )
            .andExpect(status().isOk());

        // Validate the TalentTitle in the database
        List<TalentTitle> talentTitleList = talentTitleRepository.findAll();
        assertThat(talentTitleList).hasSize(databaseSizeBeforeUpdate);
        TalentTitle testTalentTitle = talentTitleList.get(talentTitleList.size() - 1);
        assertThat(testTalentTitle.getTitle()).isEqualTo(UPDATED_TITLE);
    }

    @Test
    @Transactional
    void patchNonExistingTalentTitle() throws Exception {
        int databaseSizeBeforeUpdate = talentTitleRepository.findAll().size();
        talentTitle.setId(count.incrementAndGet());

        // Create the TalentTitle
        TalentTitleDTO talentTitleDTO = talentTitleMapper.toDto(talentTitle);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTalentTitleMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, talentTitleDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(talentTitleDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the TalentTitle in the database
        List<TalentTitle> talentTitleList = talentTitleRepository.findAll();
        assertThat(talentTitleList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchTalentTitle() throws Exception {
        int databaseSizeBeforeUpdate = talentTitleRepository.findAll().size();
        talentTitle.setId(count.incrementAndGet());

        // Create the TalentTitle
        TalentTitleDTO talentTitleDTO = talentTitleMapper.toDto(talentTitle);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTalentTitleMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(talentTitleDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the TalentTitle in the database
        List<TalentTitle> talentTitleList = talentTitleRepository.findAll();
        assertThat(talentTitleList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamTalentTitle() throws Exception {
        int databaseSizeBeforeUpdate = talentTitleRepository.findAll().size();
        talentTitle.setId(count.incrementAndGet());

        // Create the TalentTitle
        TalentTitleDTO talentTitleDTO = talentTitleMapper.toDto(talentTitle);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTalentTitleMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(talentTitleDTO))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the TalentTitle in the database
        List<TalentTitle> talentTitleList = talentTitleRepository.findAll();
        assertThat(talentTitleList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteTalentTitle() throws Exception {
        // Initialize the database
        talentTitleRepository.saveAndFlush(talentTitle);

        int databaseSizeBeforeDelete = talentTitleRepository.findAll().size();

        // Delete the talentTitle
        restTalentTitleMockMvc
            .perform(delete(ENTITY_API_URL_ID, talentTitle.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<TalentTitle> talentTitleList = talentTitleRepository.findAll();
        assertThat(talentTitleList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
