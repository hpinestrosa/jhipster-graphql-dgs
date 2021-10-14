package com.openapi.jhipstergraphqldgs.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.openapi.jhipstergraphqldgs.IntegrationTest;
import com.openapi.jhipstergraphqldgs.domain.TitleType;
import com.openapi.jhipstergraphqldgs.repository.TitleTypeRepository;
import com.openapi.jhipstergraphqldgs.service.dto.TitleTypeDTO;
import com.openapi.jhipstergraphqldgs.service.mapper.TitleTypeMapper;
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
 * Integration tests for the {@link TitleTypeResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class TitleTypeResourceIT {

    private static final String DEFAULT_TITLE_TYPE_NAME = "AAAAAAAAAA";
    private static final String UPDATED_TITLE_TYPE_NAME = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/title-types";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private TitleTypeRepository titleTypeRepository;

    @Autowired
    private TitleTypeMapper titleTypeMapper;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restTitleTypeMockMvc;

    private TitleType titleType;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TitleType createEntity(EntityManager em) {
        TitleType titleType = new TitleType().titleTypeName(DEFAULT_TITLE_TYPE_NAME);
        return titleType;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TitleType createUpdatedEntity(EntityManager em) {
        TitleType titleType = new TitleType().titleTypeName(UPDATED_TITLE_TYPE_NAME);
        return titleType;
    }

    @BeforeEach
    public void initTest() {
        titleType = createEntity(em);
    }

    @Test
    @Transactional
    void createTitleType() throws Exception {
        int databaseSizeBeforeCreate = titleTypeRepository.findAll().size();
        // Create the TitleType
        TitleTypeDTO titleTypeDTO = titleTypeMapper.toDto(titleType);
        restTitleTypeMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(titleTypeDTO)))
            .andExpect(status().isCreated());

        // Validate the TitleType in the database
        List<TitleType> titleTypeList = titleTypeRepository.findAll();
        assertThat(titleTypeList).hasSize(databaseSizeBeforeCreate + 1);
        TitleType testTitleType = titleTypeList.get(titleTypeList.size() - 1);
        assertThat(testTitleType.getTitleTypeName()).isEqualTo(DEFAULT_TITLE_TYPE_NAME);
    }

    @Test
    @Transactional
    void createTitleTypeWithExistingId() throws Exception {
        // Create the TitleType with an existing ID
        titleType.setId(1L);
        TitleTypeDTO titleTypeDTO = titleTypeMapper.toDto(titleType);

        int databaseSizeBeforeCreate = titleTypeRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restTitleTypeMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(titleTypeDTO)))
            .andExpect(status().isBadRequest());

        // Validate the TitleType in the database
        List<TitleType> titleTypeList = titleTypeRepository.findAll();
        assertThat(titleTypeList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkTitleTypeNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = titleTypeRepository.findAll().size();
        // set the field null
        titleType.setTitleTypeName(null);

        // Create the TitleType, which fails.
        TitleTypeDTO titleTypeDTO = titleTypeMapper.toDto(titleType);

        restTitleTypeMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(titleTypeDTO)))
            .andExpect(status().isBadRequest());

        List<TitleType> titleTypeList = titleTypeRepository.findAll();
        assertThat(titleTypeList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllTitleTypes() throws Exception {
        // Initialize the database
        titleTypeRepository.saveAndFlush(titleType);

        // Get all the titleTypeList
        restTitleTypeMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(titleType.getId().intValue())))
            .andExpect(jsonPath("$.[*].titleTypeName").value(hasItem(DEFAULT_TITLE_TYPE_NAME)));
    }

    @Test
    @Transactional
    void getTitleType() throws Exception {
        // Initialize the database
        titleTypeRepository.saveAndFlush(titleType);

        // Get the titleType
        restTitleTypeMockMvc
            .perform(get(ENTITY_API_URL_ID, titleType.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(titleType.getId().intValue()))
            .andExpect(jsonPath("$.titleTypeName").value(DEFAULT_TITLE_TYPE_NAME));
    }

    @Test
    @Transactional
    void getNonExistingTitleType() throws Exception {
        // Get the titleType
        restTitleTypeMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewTitleType() throws Exception {
        // Initialize the database
        titleTypeRepository.saveAndFlush(titleType);

        int databaseSizeBeforeUpdate = titleTypeRepository.findAll().size();

        // Update the titleType
        TitleType updatedTitleType = titleTypeRepository.findById(titleType.getId()).get();
        // Disconnect from session so that the updates on updatedTitleType are not directly saved in db
        em.detach(updatedTitleType);
        updatedTitleType.titleTypeName(UPDATED_TITLE_TYPE_NAME);
        TitleTypeDTO titleTypeDTO = titleTypeMapper.toDto(updatedTitleType);

        restTitleTypeMockMvc
            .perform(
                put(ENTITY_API_URL_ID, titleTypeDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(titleTypeDTO))
            )
            .andExpect(status().isOk());

        // Validate the TitleType in the database
        List<TitleType> titleTypeList = titleTypeRepository.findAll();
        assertThat(titleTypeList).hasSize(databaseSizeBeforeUpdate);
        TitleType testTitleType = titleTypeList.get(titleTypeList.size() - 1);
        assertThat(testTitleType.getTitleTypeName()).isEqualTo(UPDATED_TITLE_TYPE_NAME);
    }

    @Test
    @Transactional
    void putNonExistingTitleType() throws Exception {
        int databaseSizeBeforeUpdate = titleTypeRepository.findAll().size();
        titleType.setId(count.incrementAndGet());

        // Create the TitleType
        TitleTypeDTO titleTypeDTO = titleTypeMapper.toDto(titleType);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTitleTypeMockMvc
            .perform(
                put(ENTITY_API_URL_ID, titleTypeDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(titleTypeDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the TitleType in the database
        List<TitleType> titleTypeList = titleTypeRepository.findAll();
        assertThat(titleTypeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchTitleType() throws Exception {
        int databaseSizeBeforeUpdate = titleTypeRepository.findAll().size();
        titleType.setId(count.incrementAndGet());

        // Create the TitleType
        TitleTypeDTO titleTypeDTO = titleTypeMapper.toDto(titleType);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTitleTypeMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(titleTypeDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the TitleType in the database
        List<TitleType> titleTypeList = titleTypeRepository.findAll();
        assertThat(titleTypeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamTitleType() throws Exception {
        int databaseSizeBeforeUpdate = titleTypeRepository.findAll().size();
        titleType.setId(count.incrementAndGet());

        // Create the TitleType
        TitleTypeDTO titleTypeDTO = titleTypeMapper.toDto(titleType);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTitleTypeMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(titleTypeDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the TitleType in the database
        List<TitleType> titleTypeList = titleTypeRepository.findAll();
        assertThat(titleTypeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateTitleTypeWithPatch() throws Exception {
        // Initialize the database
        titleTypeRepository.saveAndFlush(titleType);

        int databaseSizeBeforeUpdate = titleTypeRepository.findAll().size();

        // Update the titleType using partial update
        TitleType partialUpdatedTitleType = new TitleType();
        partialUpdatedTitleType.setId(titleType.getId());

        partialUpdatedTitleType.titleTypeName(UPDATED_TITLE_TYPE_NAME);

        restTitleTypeMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedTitleType.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedTitleType))
            )
            .andExpect(status().isOk());

        // Validate the TitleType in the database
        List<TitleType> titleTypeList = titleTypeRepository.findAll();
        assertThat(titleTypeList).hasSize(databaseSizeBeforeUpdate);
        TitleType testTitleType = titleTypeList.get(titleTypeList.size() - 1);
        assertThat(testTitleType.getTitleTypeName()).isEqualTo(UPDATED_TITLE_TYPE_NAME);
    }

    @Test
    @Transactional
    void fullUpdateTitleTypeWithPatch() throws Exception {
        // Initialize the database
        titleTypeRepository.saveAndFlush(titleType);

        int databaseSizeBeforeUpdate = titleTypeRepository.findAll().size();

        // Update the titleType using partial update
        TitleType partialUpdatedTitleType = new TitleType();
        partialUpdatedTitleType.setId(titleType.getId());

        partialUpdatedTitleType.titleTypeName(UPDATED_TITLE_TYPE_NAME);

        restTitleTypeMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedTitleType.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedTitleType))
            )
            .andExpect(status().isOk());

        // Validate the TitleType in the database
        List<TitleType> titleTypeList = titleTypeRepository.findAll();
        assertThat(titleTypeList).hasSize(databaseSizeBeforeUpdate);
        TitleType testTitleType = titleTypeList.get(titleTypeList.size() - 1);
        assertThat(testTitleType.getTitleTypeName()).isEqualTo(UPDATED_TITLE_TYPE_NAME);
    }

    @Test
    @Transactional
    void patchNonExistingTitleType() throws Exception {
        int databaseSizeBeforeUpdate = titleTypeRepository.findAll().size();
        titleType.setId(count.incrementAndGet());

        // Create the TitleType
        TitleTypeDTO titleTypeDTO = titleTypeMapper.toDto(titleType);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTitleTypeMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, titleTypeDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(titleTypeDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the TitleType in the database
        List<TitleType> titleTypeList = titleTypeRepository.findAll();
        assertThat(titleTypeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchTitleType() throws Exception {
        int databaseSizeBeforeUpdate = titleTypeRepository.findAll().size();
        titleType.setId(count.incrementAndGet());

        // Create the TitleType
        TitleTypeDTO titleTypeDTO = titleTypeMapper.toDto(titleType);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTitleTypeMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(titleTypeDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the TitleType in the database
        List<TitleType> titleTypeList = titleTypeRepository.findAll();
        assertThat(titleTypeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamTitleType() throws Exception {
        int databaseSizeBeforeUpdate = titleTypeRepository.findAll().size();
        titleType.setId(count.incrementAndGet());

        // Create the TitleType
        TitleTypeDTO titleTypeDTO = titleTypeMapper.toDto(titleType);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTitleTypeMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(titleTypeDTO))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the TitleType in the database
        List<TitleType> titleTypeList = titleTypeRepository.findAll();
        assertThat(titleTypeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteTitleType() throws Exception {
        // Initialize the database
        titleTypeRepository.saveAndFlush(titleType);

        int databaseSizeBeforeDelete = titleTypeRepository.findAll().size();

        // Delete the titleType
        restTitleTypeMockMvc
            .perform(delete(ENTITY_API_URL_ID, titleType.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<TitleType> titleTypeList = titleTypeRepository.findAll();
        assertThat(titleTypeList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
