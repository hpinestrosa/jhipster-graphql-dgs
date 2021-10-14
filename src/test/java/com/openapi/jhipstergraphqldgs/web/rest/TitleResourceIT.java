package com.openapi.jhipstergraphqldgs.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.openapi.jhipstergraphqldgs.IntegrationTest;
import com.openapi.jhipstergraphqldgs.domain.Title;
import com.openapi.jhipstergraphqldgs.repository.TitleRepository;
import com.openapi.jhipstergraphqldgs.service.dto.TitleDTO;
import com.openapi.jhipstergraphqldgs.service.mapper.TitleMapper;
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
 * Integration tests for the {@link TitleResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class TitleResourceIT {

    private static final String DEFAULT_PRIMARY_TITLE = "AAAAAAAAAA";
    private static final String UPDATED_PRIMARY_TITLE = "BBBBBBBBBB";

    private static final String DEFAULT_ORIGINAL_TITLE = "AAAAAAAAAA";
    private static final String UPDATED_ORIGINAL_TITLE = "BBBBBBBBBB";

    private static final Boolean DEFAULT_IS_ADULT = false;
    private static final Boolean UPDATED_IS_ADULT = true;

    private static final Integer DEFAULT_START_YEAR = 1;
    private static final Integer UPDATED_START_YEAR = 2;

    private static final Integer DEFAULT_END_YEAR = 1;
    private static final Integer UPDATED_END_YEAR = 2;

    private static final Integer DEFAULT_RUNTIME_MINUTES = 1;
    private static final Integer UPDATED_RUNTIME_MINUTES = 2;

    private static final String ENTITY_API_URL = "/api/titles";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private TitleRepository titleRepository;

    @Autowired
    private TitleMapper titleMapper;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restTitleMockMvc;

    private Title title;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Title createEntity(EntityManager em) {
        Title title = new Title()
            .primaryTitle(DEFAULT_PRIMARY_TITLE)
            .originalTitle(DEFAULT_ORIGINAL_TITLE)
            .isAdult(DEFAULT_IS_ADULT)
            .startYear(DEFAULT_START_YEAR)
            .endYear(DEFAULT_END_YEAR)
            .runtimeMinutes(DEFAULT_RUNTIME_MINUTES);
        return title;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Title createUpdatedEntity(EntityManager em) {
        Title title = new Title()
            .primaryTitle(UPDATED_PRIMARY_TITLE)
            .originalTitle(UPDATED_ORIGINAL_TITLE)
            .isAdult(UPDATED_IS_ADULT)
            .startYear(UPDATED_START_YEAR)
            .endYear(UPDATED_END_YEAR)
            .runtimeMinutes(UPDATED_RUNTIME_MINUTES);
        return title;
    }

    @BeforeEach
    public void initTest() {
        title = createEntity(em);
    }

    @Test
    @Transactional
    void createTitle() throws Exception {
        int databaseSizeBeforeCreate = titleRepository.findAll().size();
        // Create the Title
        TitleDTO titleDTO = titleMapper.toDto(title);
        restTitleMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(titleDTO)))
            .andExpect(status().isCreated());

        // Validate the Title in the database
        List<Title> titleList = titleRepository.findAll();
        assertThat(titleList).hasSize(databaseSizeBeforeCreate + 1);
        Title testTitle = titleList.get(titleList.size() - 1);
        assertThat(testTitle.getPrimaryTitle()).isEqualTo(DEFAULT_PRIMARY_TITLE);
        assertThat(testTitle.getOriginalTitle()).isEqualTo(DEFAULT_ORIGINAL_TITLE);
        assertThat(testTitle.getIsAdult()).isEqualTo(DEFAULT_IS_ADULT);
        assertThat(testTitle.getStartYear()).isEqualTo(DEFAULT_START_YEAR);
        assertThat(testTitle.getEndYear()).isEqualTo(DEFAULT_END_YEAR);
        assertThat(testTitle.getRuntimeMinutes()).isEqualTo(DEFAULT_RUNTIME_MINUTES);
    }

    @Test
    @Transactional
    void createTitleWithExistingId() throws Exception {
        // Create the Title with an existing ID
        title.setId(1L);
        TitleDTO titleDTO = titleMapper.toDto(title);

        int databaseSizeBeforeCreate = titleRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restTitleMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(titleDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Title in the database
        List<Title> titleList = titleRepository.findAll();
        assertThat(titleList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkPrimaryTitleIsRequired() throws Exception {
        int databaseSizeBeforeTest = titleRepository.findAll().size();
        // set the field null
        title.setPrimaryTitle(null);

        // Create the Title, which fails.
        TitleDTO titleDTO = titleMapper.toDto(title);

        restTitleMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(titleDTO)))
            .andExpect(status().isBadRequest());

        List<Title> titleList = titleRepository.findAll();
        assertThat(titleList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllTitles() throws Exception {
        // Initialize the database
        titleRepository.saveAndFlush(title);

        // Get all the titleList
        restTitleMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(title.getId().intValue())))
            .andExpect(jsonPath("$.[*].primaryTitle").value(hasItem(DEFAULT_PRIMARY_TITLE)))
            .andExpect(jsonPath("$.[*].originalTitle").value(hasItem(DEFAULT_ORIGINAL_TITLE)))
            .andExpect(jsonPath("$.[*].isAdult").value(hasItem(DEFAULT_IS_ADULT.booleanValue())))
            .andExpect(jsonPath("$.[*].startYear").value(hasItem(DEFAULT_START_YEAR)))
            .andExpect(jsonPath("$.[*].endYear").value(hasItem(DEFAULT_END_YEAR)))
            .andExpect(jsonPath("$.[*].runtimeMinutes").value(hasItem(DEFAULT_RUNTIME_MINUTES)));
    }

    @Test
    @Transactional
    void getTitle() throws Exception {
        // Initialize the database
        titleRepository.saveAndFlush(title);

        // Get the title
        restTitleMockMvc
            .perform(get(ENTITY_API_URL_ID, title.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(title.getId().intValue()))
            .andExpect(jsonPath("$.primaryTitle").value(DEFAULT_PRIMARY_TITLE))
            .andExpect(jsonPath("$.originalTitle").value(DEFAULT_ORIGINAL_TITLE))
            .andExpect(jsonPath("$.isAdult").value(DEFAULT_IS_ADULT.booleanValue()))
            .andExpect(jsonPath("$.startYear").value(DEFAULT_START_YEAR))
            .andExpect(jsonPath("$.endYear").value(DEFAULT_END_YEAR))
            .andExpect(jsonPath("$.runtimeMinutes").value(DEFAULT_RUNTIME_MINUTES));
    }

    @Test
    @Transactional
    void getNonExistingTitle() throws Exception {
        // Get the title
        restTitleMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewTitle() throws Exception {
        // Initialize the database
        titleRepository.saveAndFlush(title);

        int databaseSizeBeforeUpdate = titleRepository.findAll().size();

        // Update the title
        Title updatedTitle = titleRepository.findById(title.getId()).get();
        // Disconnect from session so that the updates on updatedTitle are not directly saved in db
        em.detach(updatedTitle);
        updatedTitle
            .primaryTitle(UPDATED_PRIMARY_TITLE)
            .originalTitle(UPDATED_ORIGINAL_TITLE)
            .isAdult(UPDATED_IS_ADULT)
            .startYear(UPDATED_START_YEAR)
            .endYear(UPDATED_END_YEAR)
            .runtimeMinutes(UPDATED_RUNTIME_MINUTES);
        TitleDTO titleDTO = titleMapper.toDto(updatedTitle);

        restTitleMockMvc
            .perform(
                put(ENTITY_API_URL_ID, titleDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(titleDTO))
            )
            .andExpect(status().isOk());

        // Validate the Title in the database
        List<Title> titleList = titleRepository.findAll();
        assertThat(titleList).hasSize(databaseSizeBeforeUpdate);
        Title testTitle = titleList.get(titleList.size() - 1);
        assertThat(testTitle.getPrimaryTitle()).isEqualTo(UPDATED_PRIMARY_TITLE);
        assertThat(testTitle.getOriginalTitle()).isEqualTo(UPDATED_ORIGINAL_TITLE);
        assertThat(testTitle.getIsAdult()).isEqualTo(UPDATED_IS_ADULT);
        assertThat(testTitle.getStartYear()).isEqualTo(UPDATED_START_YEAR);
        assertThat(testTitle.getEndYear()).isEqualTo(UPDATED_END_YEAR);
        assertThat(testTitle.getRuntimeMinutes()).isEqualTo(UPDATED_RUNTIME_MINUTES);
    }

    @Test
    @Transactional
    void putNonExistingTitle() throws Exception {
        int databaseSizeBeforeUpdate = titleRepository.findAll().size();
        title.setId(count.incrementAndGet());

        // Create the Title
        TitleDTO titleDTO = titleMapper.toDto(title);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTitleMockMvc
            .perform(
                put(ENTITY_API_URL_ID, titleDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(titleDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Title in the database
        List<Title> titleList = titleRepository.findAll();
        assertThat(titleList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchTitle() throws Exception {
        int databaseSizeBeforeUpdate = titleRepository.findAll().size();
        title.setId(count.incrementAndGet());

        // Create the Title
        TitleDTO titleDTO = titleMapper.toDto(title);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTitleMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(titleDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Title in the database
        List<Title> titleList = titleRepository.findAll();
        assertThat(titleList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamTitle() throws Exception {
        int databaseSizeBeforeUpdate = titleRepository.findAll().size();
        title.setId(count.incrementAndGet());

        // Create the Title
        TitleDTO titleDTO = titleMapper.toDto(title);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTitleMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(titleDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Title in the database
        List<Title> titleList = titleRepository.findAll();
        assertThat(titleList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateTitleWithPatch() throws Exception {
        // Initialize the database
        titleRepository.saveAndFlush(title);

        int databaseSizeBeforeUpdate = titleRepository.findAll().size();

        // Update the title using partial update
        Title partialUpdatedTitle = new Title();
        partialUpdatedTitle.setId(title.getId());

        partialUpdatedTitle.originalTitle(UPDATED_ORIGINAL_TITLE).runtimeMinutes(UPDATED_RUNTIME_MINUTES);

        restTitleMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedTitle.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedTitle))
            )
            .andExpect(status().isOk());

        // Validate the Title in the database
        List<Title> titleList = titleRepository.findAll();
        assertThat(titleList).hasSize(databaseSizeBeforeUpdate);
        Title testTitle = titleList.get(titleList.size() - 1);
        assertThat(testTitle.getPrimaryTitle()).isEqualTo(DEFAULT_PRIMARY_TITLE);
        assertThat(testTitle.getOriginalTitle()).isEqualTo(UPDATED_ORIGINAL_TITLE);
        assertThat(testTitle.getIsAdult()).isEqualTo(DEFAULT_IS_ADULT);
        assertThat(testTitle.getStartYear()).isEqualTo(DEFAULT_START_YEAR);
        assertThat(testTitle.getEndYear()).isEqualTo(DEFAULT_END_YEAR);
        assertThat(testTitle.getRuntimeMinutes()).isEqualTo(UPDATED_RUNTIME_MINUTES);
    }

    @Test
    @Transactional
    void fullUpdateTitleWithPatch() throws Exception {
        // Initialize the database
        titleRepository.saveAndFlush(title);

        int databaseSizeBeforeUpdate = titleRepository.findAll().size();

        // Update the title using partial update
        Title partialUpdatedTitle = new Title();
        partialUpdatedTitle.setId(title.getId());

        partialUpdatedTitle
            .primaryTitle(UPDATED_PRIMARY_TITLE)
            .originalTitle(UPDATED_ORIGINAL_TITLE)
            .isAdult(UPDATED_IS_ADULT)
            .startYear(UPDATED_START_YEAR)
            .endYear(UPDATED_END_YEAR)
            .runtimeMinutes(UPDATED_RUNTIME_MINUTES);

        restTitleMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedTitle.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedTitle))
            )
            .andExpect(status().isOk());

        // Validate the Title in the database
        List<Title> titleList = titleRepository.findAll();
        assertThat(titleList).hasSize(databaseSizeBeforeUpdate);
        Title testTitle = titleList.get(titleList.size() - 1);
        assertThat(testTitle.getPrimaryTitle()).isEqualTo(UPDATED_PRIMARY_TITLE);
        assertThat(testTitle.getOriginalTitle()).isEqualTo(UPDATED_ORIGINAL_TITLE);
        assertThat(testTitle.getIsAdult()).isEqualTo(UPDATED_IS_ADULT);
        assertThat(testTitle.getStartYear()).isEqualTo(UPDATED_START_YEAR);
        assertThat(testTitle.getEndYear()).isEqualTo(UPDATED_END_YEAR);
        assertThat(testTitle.getRuntimeMinutes()).isEqualTo(UPDATED_RUNTIME_MINUTES);
    }

    @Test
    @Transactional
    void patchNonExistingTitle() throws Exception {
        int databaseSizeBeforeUpdate = titleRepository.findAll().size();
        title.setId(count.incrementAndGet());

        // Create the Title
        TitleDTO titleDTO = titleMapper.toDto(title);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTitleMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, titleDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(titleDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Title in the database
        List<Title> titleList = titleRepository.findAll();
        assertThat(titleList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchTitle() throws Exception {
        int databaseSizeBeforeUpdate = titleRepository.findAll().size();
        title.setId(count.incrementAndGet());

        // Create the Title
        TitleDTO titleDTO = titleMapper.toDto(title);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTitleMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(titleDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Title in the database
        List<Title> titleList = titleRepository.findAll();
        assertThat(titleList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamTitle() throws Exception {
        int databaseSizeBeforeUpdate = titleRepository.findAll().size();
        title.setId(count.incrementAndGet());

        // Create the Title
        TitleDTO titleDTO = titleMapper.toDto(title);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTitleMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(titleDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Title in the database
        List<Title> titleList = titleRepository.findAll();
        assertThat(titleList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteTitle() throws Exception {
        // Initialize the database
        titleRepository.saveAndFlush(title);

        int databaseSizeBeforeDelete = titleRepository.findAll().size();

        // Delete the title
        restTitleMockMvc
            .perform(delete(ENTITY_API_URL_ID, title.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Title> titleList = titleRepository.findAll();
        assertThat(titleList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
