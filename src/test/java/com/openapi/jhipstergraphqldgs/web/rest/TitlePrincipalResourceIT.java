package com.openapi.jhipstergraphqldgs.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.openapi.jhipstergraphqldgs.IntegrationTest;
import com.openapi.jhipstergraphqldgs.domain.TitlePrincipal;
import com.openapi.jhipstergraphqldgs.repository.TitlePrincipalRepository;
import com.openapi.jhipstergraphqldgs.service.dto.TitlePrincipalDTO;
import com.openapi.jhipstergraphqldgs.service.mapper.TitlePrincipalMapper;
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
 * Integration tests for the {@link TitlePrincipalResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class TitlePrincipalResourceIT {

    private static final Integer DEFAULT_CATEGORY = 1;
    private static final Integer UPDATED_CATEGORY = 2;

    private static final String DEFAULT_JOB = "AAAAAAAAAA";
    private static final String UPDATED_JOB = "BBBBBBBBBB";

    private static final String DEFAULT_ROLE_NAMES = "AAAAAAAAAA";
    private static final String UPDATED_ROLE_NAMES = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/title-principals";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private TitlePrincipalRepository titlePrincipalRepository;

    @Autowired
    private TitlePrincipalMapper titlePrincipalMapper;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restTitlePrincipalMockMvc;

    private TitlePrincipal titlePrincipal;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TitlePrincipal createEntity(EntityManager em) {
        TitlePrincipal titlePrincipal = new TitlePrincipal().category(DEFAULT_CATEGORY).job(DEFAULT_JOB).roleNames(DEFAULT_ROLE_NAMES);
        return titlePrincipal;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TitlePrincipal createUpdatedEntity(EntityManager em) {
        TitlePrincipal titlePrincipal = new TitlePrincipal().category(UPDATED_CATEGORY).job(UPDATED_JOB).roleNames(UPDATED_ROLE_NAMES);
        return titlePrincipal;
    }

    @BeforeEach
    public void initTest() {
        titlePrincipal = createEntity(em);
    }

    @Test
    @Transactional
    void createTitlePrincipal() throws Exception {
        int databaseSizeBeforeCreate = titlePrincipalRepository.findAll().size();
        // Create the TitlePrincipal
        TitlePrincipalDTO titlePrincipalDTO = titlePrincipalMapper.toDto(titlePrincipal);
        restTitlePrincipalMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(titlePrincipalDTO))
            )
            .andExpect(status().isCreated());

        // Validate the TitlePrincipal in the database
        List<TitlePrincipal> titlePrincipalList = titlePrincipalRepository.findAll();
        assertThat(titlePrincipalList).hasSize(databaseSizeBeforeCreate + 1);
        TitlePrincipal testTitlePrincipal = titlePrincipalList.get(titlePrincipalList.size() - 1);
        assertThat(testTitlePrincipal.getCategory()).isEqualTo(DEFAULT_CATEGORY);
        assertThat(testTitlePrincipal.getJob()).isEqualTo(DEFAULT_JOB);
        assertThat(testTitlePrincipal.getRoleNames()).isEqualTo(DEFAULT_ROLE_NAMES);
    }

    @Test
    @Transactional
    void createTitlePrincipalWithExistingId() throws Exception {
        // Create the TitlePrincipal with an existing ID
        titlePrincipal.setId(1L);
        TitlePrincipalDTO titlePrincipalDTO = titlePrincipalMapper.toDto(titlePrincipal);

        int databaseSizeBeforeCreate = titlePrincipalRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restTitlePrincipalMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(titlePrincipalDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the TitlePrincipal in the database
        List<TitlePrincipal> titlePrincipalList = titlePrincipalRepository.findAll();
        assertThat(titlePrincipalList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkCategoryIsRequired() throws Exception {
        int databaseSizeBeforeTest = titlePrincipalRepository.findAll().size();
        // set the field null
        titlePrincipal.setCategory(null);

        // Create the TitlePrincipal, which fails.
        TitlePrincipalDTO titlePrincipalDTO = titlePrincipalMapper.toDto(titlePrincipal);

        restTitlePrincipalMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(titlePrincipalDTO))
            )
            .andExpect(status().isBadRequest());

        List<TitlePrincipal> titlePrincipalList = titlePrincipalRepository.findAll();
        assertThat(titlePrincipalList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllTitlePrincipals() throws Exception {
        // Initialize the database
        titlePrincipalRepository.saveAndFlush(titlePrincipal);

        // Get all the titlePrincipalList
        restTitlePrincipalMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(titlePrincipal.getId().intValue())))
            .andExpect(jsonPath("$.[*].category").value(hasItem(DEFAULT_CATEGORY)))
            .andExpect(jsonPath("$.[*].job").value(hasItem(DEFAULT_JOB)))
            .andExpect(jsonPath("$.[*].roleNames").value(hasItem(DEFAULT_ROLE_NAMES)));
    }

    @Test
    @Transactional
    void getTitlePrincipal() throws Exception {
        // Initialize the database
        titlePrincipalRepository.saveAndFlush(titlePrincipal);

        // Get the titlePrincipal
        restTitlePrincipalMockMvc
            .perform(get(ENTITY_API_URL_ID, titlePrincipal.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(titlePrincipal.getId().intValue()))
            .andExpect(jsonPath("$.category").value(DEFAULT_CATEGORY))
            .andExpect(jsonPath("$.job").value(DEFAULT_JOB))
            .andExpect(jsonPath("$.roleNames").value(DEFAULT_ROLE_NAMES));
    }

    @Test
    @Transactional
    void getNonExistingTitlePrincipal() throws Exception {
        // Get the titlePrincipal
        restTitlePrincipalMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewTitlePrincipal() throws Exception {
        // Initialize the database
        titlePrincipalRepository.saveAndFlush(titlePrincipal);

        int databaseSizeBeforeUpdate = titlePrincipalRepository.findAll().size();

        // Update the titlePrincipal
        TitlePrincipal updatedTitlePrincipal = titlePrincipalRepository.findById(titlePrincipal.getId()).get();
        // Disconnect from session so that the updates on updatedTitlePrincipal are not directly saved in db
        em.detach(updatedTitlePrincipal);
        updatedTitlePrincipal.category(UPDATED_CATEGORY).job(UPDATED_JOB).roleNames(UPDATED_ROLE_NAMES);
        TitlePrincipalDTO titlePrincipalDTO = titlePrincipalMapper.toDto(updatedTitlePrincipal);

        restTitlePrincipalMockMvc
            .perform(
                put(ENTITY_API_URL_ID, titlePrincipalDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(titlePrincipalDTO))
            )
            .andExpect(status().isOk());

        // Validate the TitlePrincipal in the database
        List<TitlePrincipal> titlePrincipalList = titlePrincipalRepository.findAll();
        assertThat(titlePrincipalList).hasSize(databaseSizeBeforeUpdate);
        TitlePrincipal testTitlePrincipal = titlePrincipalList.get(titlePrincipalList.size() - 1);
        assertThat(testTitlePrincipal.getCategory()).isEqualTo(UPDATED_CATEGORY);
        assertThat(testTitlePrincipal.getJob()).isEqualTo(UPDATED_JOB);
        assertThat(testTitlePrincipal.getRoleNames()).isEqualTo(UPDATED_ROLE_NAMES);
    }

    @Test
    @Transactional
    void putNonExistingTitlePrincipal() throws Exception {
        int databaseSizeBeforeUpdate = titlePrincipalRepository.findAll().size();
        titlePrincipal.setId(count.incrementAndGet());

        // Create the TitlePrincipal
        TitlePrincipalDTO titlePrincipalDTO = titlePrincipalMapper.toDto(titlePrincipal);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTitlePrincipalMockMvc
            .perform(
                put(ENTITY_API_URL_ID, titlePrincipalDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(titlePrincipalDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the TitlePrincipal in the database
        List<TitlePrincipal> titlePrincipalList = titlePrincipalRepository.findAll();
        assertThat(titlePrincipalList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchTitlePrincipal() throws Exception {
        int databaseSizeBeforeUpdate = titlePrincipalRepository.findAll().size();
        titlePrincipal.setId(count.incrementAndGet());

        // Create the TitlePrincipal
        TitlePrincipalDTO titlePrincipalDTO = titlePrincipalMapper.toDto(titlePrincipal);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTitlePrincipalMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(titlePrincipalDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the TitlePrincipal in the database
        List<TitlePrincipal> titlePrincipalList = titlePrincipalRepository.findAll();
        assertThat(titlePrincipalList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamTitlePrincipal() throws Exception {
        int databaseSizeBeforeUpdate = titlePrincipalRepository.findAll().size();
        titlePrincipal.setId(count.incrementAndGet());

        // Create the TitlePrincipal
        TitlePrincipalDTO titlePrincipalDTO = titlePrincipalMapper.toDto(titlePrincipal);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTitlePrincipalMockMvc
            .perform(
                put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(titlePrincipalDTO))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the TitlePrincipal in the database
        List<TitlePrincipal> titlePrincipalList = titlePrincipalRepository.findAll();
        assertThat(titlePrincipalList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateTitlePrincipalWithPatch() throws Exception {
        // Initialize the database
        titlePrincipalRepository.saveAndFlush(titlePrincipal);

        int databaseSizeBeforeUpdate = titlePrincipalRepository.findAll().size();

        // Update the titlePrincipal using partial update
        TitlePrincipal partialUpdatedTitlePrincipal = new TitlePrincipal();
        partialUpdatedTitlePrincipal.setId(titlePrincipal.getId());

        partialUpdatedTitlePrincipal.job(UPDATED_JOB).roleNames(UPDATED_ROLE_NAMES);

        restTitlePrincipalMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedTitlePrincipal.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedTitlePrincipal))
            )
            .andExpect(status().isOk());

        // Validate the TitlePrincipal in the database
        List<TitlePrincipal> titlePrincipalList = titlePrincipalRepository.findAll();
        assertThat(titlePrincipalList).hasSize(databaseSizeBeforeUpdate);
        TitlePrincipal testTitlePrincipal = titlePrincipalList.get(titlePrincipalList.size() - 1);
        assertThat(testTitlePrincipal.getCategory()).isEqualTo(DEFAULT_CATEGORY);
        assertThat(testTitlePrincipal.getJob()).isEqualTo(UPDATED_JOB);
        assertThat(testTitlePrincipal.getRoleNames()).isEqualTo(UPDATED_ROLE_NAMES);
    }

    @Test
    @Transactional
    void fullUpdateTitlePrincipalWithPatch() throws Exception {
        // Initialize the database
        titlePrincipalRepository.saveAndFlush(titlePrincipal);

        int databaseSizeBeforeUpdate = titlePrincipalRepository.findAll().size();

        // Update the titlePrincipal using partial update
        TitlePrincipal partialUpdatedTitlePrincipal = new TitlePrincipal();
        partialUpdatedTitlePrincipal.setId(titlePrincipal.getId());

        partialUpdatedTitlePrincipal.category(UPDATED_CATEGORY).job(UPDATED_JOB).roleNames(UPDATED_ROLE_NAMES);

        restTitlePrincipalMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedTitlePrincipal.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedTitlePrincipal))
            )
            .andExpect(status().isOk());

        // Validate the TitlePrincipal in the database
        List<TitlePrincipal> titlePrincipalList = titlePrincipalRepository.findAll();
        assertThat(titlePrincipalList).hasSize(databaseSizeBeforeUpdate);
        TitlePrincipal testTitlePrincipal = titlePrincipalList.get(titlePrincipalList.size() - 1);
        assertThat(testTitlePrincipal.getCategory()).isEqualTo(UPDATED_CATEGORY);
        assertThat(testTitlePrincipal.getJob()).isEqualTo(UPDATED_JOB);
        assertThat(testTitlePrincipal.getRoleNames()).isEqualTo(UPDATED_ROLE_NAMES);
    }

    @Test
    @Transactional
    void patchNonExistingTitlePrincipal() throws Exception {
        int databaseSizeBeforeUpdate = titlePrincipalRepository.findAll().size();
        titlePrincipal.setId(count.incrementAndGet());

        // Create the TitlePrincipal
        TitlePrincipalDTO titlePrincipalDTO = titlePrincipalMapper.toDto(titlePrincipal);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTitlePrincipalMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, titlePrincipalDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(titlePrincipalDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the TitlePrincipal in the database
        List<TitlePrincipal> titlePrincipalList = titlePrincipalRepository.findAll();
        assertThat(titlePrincipalList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchTitlePrincipal() throws Exception {
        int databaseSizeBeforeUpdate = titlePrincipalRepository.findAll().size();
        titlePrincipal.setId(count.incrementAndGet());

        // Create the TitlePrincipal
        TitlePrincipalDTO titlePrincipalDTO = titlePrincipalMapper.toDto(titlePrincipal);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTitlePrincipalMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(titlePrincipalDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the TitlePrincipal in the database
        List<TitlePrincipal> titlePrincipalList = titlePrincipalRepository.findAll();
        assertThat(titlePrincipalList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamTitlePrincipal() throws Exception {
        int databaseSizeBeforeUpdate = titlePrincipalRepository.findAll().size();
        titlePrincipal.setId(count.incrementAndGet());

        // Create the TitlePrincipal
        TitlePrincipalDTO titlePrincipalDTO = titlePrincipalMapper.toDto(titlePrincipal);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTitlePrincipalMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(titlePrincipalDTO))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the TitlePrincipal in the database
        List<TitlePrincipal> titlePrincipalList = titlePrincipalRepository.findAll();
        assertThat(titlePrincipalList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteTitlePrincipal() throws Exception {
        // Initialize the database
        titlePrincipalRepository.saveAndFlush(titlePrincipal);

        int databaseSizeBeforeDelete = titlePrincipalRepository.findAll().size();

        // Delete the titlePrincipal
        restTitlePrincipalMockMvc
            .perform(delete(ENTITY_API_URL_ID, titlePrincipal.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<TitlePrincipal> titlePrincipalList = titlePrincipalRepository.findAll();
        assertThat(titlePrincipalList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
