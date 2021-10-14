package com.openapi.jhipstergraphqldgs.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.openapi.jhipstergraphqldgs.IntegrationTest;
import com.openapi.jhipstergraphqldgs.domain.TitleAkaTitleType;
import com.openapi.jhipstergraphqldgs.repository.TitleAkaTitleTypeRepository;
import com.openapi.jhipstergraphqldgs.service.dto.TitleAkaTitleTypeDTO;
import com.openapi.jhipstergraphqldgs.service.mapper.TitleAkaTitleTypeMapper;
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
 * Integration tests for the {@link TitleAkaTitleTypeResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class TitleAkaTitleTypeResourceIT {

    private static final String ENTITY_API_URL = "/api/title-aka-title-types";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private TitleAkaTitleTypeRepository titleAkaTitleTypeRepository;

    @Autowired
    private TitleAkaTitleTypeMapper titleAkaTitleTypeMapper;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restTitleAkaTitleTypeMockMvc;

    private TitleAkaTitleType titleAkaTitleType;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TitleAkaTitleType createEntity(EntityManager em) {
        TitleAkaTitleType titleAkaTitleType = new TitleAkaTitleType();
        return titleAkaTitleType;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TitleAkaTitleType createUpdatedEntity(EntityManager em) {
        TitleAkaTitleType titleAkaTitleType = new TitleAkaTitleType();
        return titleAkaTitleType;
    }

    @BeforeEach
    public void initTest() {
        titleAkaTitleType = createEntity(em);
    }

    @Test
    @Transactional
    void createTitleAkaTitleType() throws Exception {
        int databaseSizeBeforeCreate = titleAkaTitleTypeRepository.findAll().size();
        // Create the TitleAkaTitleType
        TitleAkaTitleTypeDTO titleAkaTitleTypeDTO = titleAkaTitleTypeMapper.toDto(titleAkaTitleType);
        restTitleAkaTitleTypeMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(titleAkaTitleTypeDTO))
            )
            .andExpect(status().isCreated());

        // Validate the TitleAkaTitleType in the database
        List<TitleAkaTitleType> titleAkaTitleTypeList = titleAkaTitleTypeRepository.findAll();
        assertThat(titleAkaTitleTypeList).hasSize(databaseSizeBeforeCreate + 1);
        TitleAkaTitleType testTitleAkaTitleType = titleAkaTitleTypeList.get(titleAkaTitleTypeList.size() - 1);
    }

    @Test
    @Transactional
    void createTitleAkaTitleTypeWithExistingId() throws Exception {
        // Create the TitleAkaTitleType with an existing ID
        titleAkaTitleType.setId(1L);
        TitleAkaTitleTypeDTO titleAkaTitleTypeDTO = titleAkaTitleTypeMapper.toDto(titleAkaTitleType);

        int databaseSizeBeforeCreate = titleAkaTitleTypeRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restTitleAkaTitleTypeMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(titleAkaTitleTypeDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the TitleAkaTitleType in the database
        List<TitleAkaTitleType> titleAkaTitleTypeList = titleAkaTitleTypeRepository.findAll();
        assertThat(titleAkaTitleTypeList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllTitleAkaTitleTypes() throws Exception {
        // Initialize the database
        titleAkaTitleTypeRepository.saveAndFlush(titleAkaTitleType);

        // Get all the titleAkaTitleTypeList
        restTitleAkaTitleTypeMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(titleAkaTitleType.getId().intValue())));
    }

    @Test
    @Transactional
    void getTitleAkaTitleType() throws Exception {
        // Initialize the database
        titleAkaTitleTypeRepository.saveAndFlush(titleAkaTitleType);

        // Get the titleAkaTitleType
        restTitleAkaTitleTypeMockMvc
            .perform(get(ENTITY_API_URL_ID, titleAkaTitleType.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(titleAkaTitleType.getId().intValue()));
    }

    @Test
    @Transactional
    void getNonExistingTitleAkaTitleType() throws Exception {
        // Get the titleAkaTitleType
        restTitleAkaTitleTypeMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewTitleAkaTitleType() throws Exception {
        // Initialize the database
        titleAkaTitleTypeRepository.saveAndFlush(titleAkaTitleType);

        int databaseSizeBeforeUpdate = titleAkaTitleTypeRepository.findAll().size();

        // Update the titleAkaTitleType
        TitleAkaTitleType updatedTitleAkaTitleType = titleAkaTitleTypeRepository.findById(titleAkaTitleType.getId()).get();
        // Disconnect from session so that the updates on updatedTitleAkaTitleType are not directly saved in db
        em.detach(updatedTitleAkaTitleType);
        TitleAkaTitleTypeDTO titleAkaTitleTypeDTO = titleAkaTitleTypeMapper.toDto(updatedTitleAkaTitleType);

        restTitleAkaTitleTypeMockMvc
            .perform(
                put(ENTITY_API_URL_ID, titleAkaTitleTypeDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(titleAkaTitleTypeDTO))
            )
            .andExpect(status().isOk());

        // Validate the TitleAkaTitleType in the database
        List<TitleAkaTitleType> titleAkaTitleTypeList = titleAkaTitleTypeRepository.findAll();
        assertThat(titleAkaTitleTypeList).hasSize(databaseSizeBeforeUpdate);
        TitleAkaTitleType testTitleAkaTitleType = titleAkaTitleTypeList.get(titleAkaTitleTypeList.size() - 1);
    }

    @Test
    @Transactional
    void putNonExistingTitleAkaTitleType() throws Exception {
        int databaseSizeBeforeUpdate = titleAkaTitleTypeRepository.findAll().size();
        titleAkaTitleType.setId(count.incrementAndGet());

        // Create the TitleAkaTitleType
        TitleAkaTitleTypeDTO titleAkaTitleTypeDTO = titleAkaTitleTypeMapper.toDto(titleAkaTitleType);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTitleAkaTitleTypeMockMvc
            .perform(
                put(ENTITY_API_URL_ID, titleAkaTitleTypeDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(titleAkaTitleTypeDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the TitleAkaTitleType in the database
        List<TitleAkaTitleType> titleAkaTitleTypeList = titleAkaTitleTypeRepository.findAll();
        assertThat(titleAkaTitleTypeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchTitleAkaTitleType() throws Exception {
        int databaseSizeBeforeUpdate = titleAkaTitleTypeRepository.findAll().size();
        titleAkaTitleType.setId(count.incrementAndGet());

        // Create the TitleAkaTitleType
        TitleAkaTitleTypeDTO titleAkaTitleTypeDTO = titleAkaTitleTypeMapper.toDto(titleAkaTitleType);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTitleAkaTitleTypeMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(titleAkaTitleTypeDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the TitleAkaTitleType in the database
        List<TitleAkaTitleType> titleAkaTitleTypeList = titleAkaTitleTypeRepository.findAll();
        assertThat(titleAkaTitleTypeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamTitleAkaTitleType() throws Exception {
        int databaseSizeBeforeUpdate = titleAkaTitleTypeRepository.findAll().size();
        titleAkaTitleType.setId(count.incrementAndGet());

        // Create the TitleAkaTitleType
        TitleAkaTitleTypeDTO titleAkaTitleTypeDTO = titleAkaTitleTypeMapper.toDto(titleAkaTitleType);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTitleAkaTitleTypeMockMvc
            .perform(
                put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(titleAkaTitleTypeDTO))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the TitleAkaTitleType in the database
        List<TitleAkaTitleType> titleAkaTitleTypeList = titleAkaTitleTypeRepository.findAll();
        assertThat(titleAkaTitleTypeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateTitleAkaTitleTypeWithPatch() throws Exception {
        // Initialize the database
        titleAkaTitleTypeRepository.saveAndFlush(titleAkaTitleType);

        int databaseSizeBeforeUpdate = titleAkaTitleTypeRepository.findAll().size();

        // Update the titleAkaTitleType using partial update
        TitleAkaTitleType partialUpdatedTitleAkaTitleType = new TitleAkaTitleType();
        partialUpdatedTitleAkaTitleType.setId(titleAkaTitleType.getId());

        restTitleAkaTitleTypeMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedTitleAkaTitleType.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedTitleAkaTitleType))
            )
            .andExpect(status().isOk());

        // Validate the TitleAkaTitleType in the database
        List<TitleAkaTitleType> titleAkaTitleTypeList = titleAkaTitleTypeRepository.findAll();
        assertThat(titleAkaTitleTypeList).hasSize(databaseSizeBeforeUpdate);
        TitleAkaTitleType testTitleAkaTitleType = titleAkaTitleTypeList.get(titleAkaTitleTypeList.size() - 1);
    }

    @Test
    @Transactional
    void fullUpdateTitleAkaTitleTypeWithPatch() throws Exception {
        // Initialize the database
        titleAkaTitleTypeRepository.saveAndFlush(titleAkaTitleType);

        int databaseSizeBeforeUpdate = titleAkaTitleTypeRepository.findAll().size();

        // Update the titleAkaTitleType using partial update
        TitleAkaTitleType partialUpdatedTitleAkaTitleType = new TitleAkaTitleType();
        partialUpdatedTitleAkaTitleType.setId(titleAkaTitleType.getId());

        restTitleAkaTitleTypeMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedTitleAkaTitleType.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedTitleAkaTitleType))
            )
            .andExpect(status().isOk());

        // Validate the TitleAkaTitleType in the database
        List<TitleAkaTitleType> titleAkaTitleTypeList = titleAkaTitleTypeRepository.findAll();
        assertThat(titleAkaTitleTypeList).hasSize(databaseSizeBeforeUpdate);
        TitleAkaTitleType testTitleAkaTitleType = titleAkaTitleTypeList.get(titleAkaTitleTypeList.size() - 1);
    }

    @Test
    @Transactional
    void patchNonExistingTitleAkaTitleType() throws Exception {
        int databaseSizeBeforeUpdate = titleAkaTitleTypeRepository.findAll().size();
        titleAkaTitleType.setId(count.incrementAndGet());

        // Create the TitleAkaTitleType
        TitleAkaTitleTypeDTO titleAkaTitleTypeDTO = titleAkaTitleTypeMapper.toDto(titleAkaTitleType);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTitleAkaTitleTypeMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, titleAkaTitleTypeDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(titleAkaTitleTypeDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the TitleAkaTitleType in the database
        List<TitleAkaTitleType> titleAkaTitleTypeList = titleAkaTitleTypeRepository.findAll();
        assertThat(titleAkaTitleTypeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchTitleAkaTitleType() throws Exception {
        int databaseSizeBeforeUpdate = titleAkaTitleTypeRepository.findAll().size();
        titleAkaTitleType.setId(count.incrementAndGet());

        // Create the TitleAkaTitleType
        TitleAkaTitleTypeDTO titleAkaTitleTypeDTO = titleAkaTitleTypeMapper.toDto(titleAkaTitleType);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTitleAkaTitleTypeMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(titleAkaTitleTypeDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the TitleAkaTitleType in the database
        List<TitleAkaTitleType> titleAkaTitleTypeList = titleAkaTitleTypeRepository.findAll();
        assertThat(titleAkaTitleTypeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamTitleAkaTitleType() throws Exception {
        int databaseSizeBeforeUpdate = titleAkaTitleTypeRepository.findAll().size();
        titleAkaTitleType.setId(count.incrementAndGet());

        // Create the TitleAkaTitleType
        TitleAkaTitleTypeDTO titleAkaTitleTypeDTO = titleAkaTitleTypeMapper.toDto(titleAkaTitleType);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTitleAkaTitleTypeMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(titleAkaTitleTypeDTO))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the TitleAkaTitleType in the database
        List<TitleAkaTitleType> titleAkaTitleTypeList = titleAkaTitleTypeRepository.findAll();
        assertThat(titleAkaTitleTypeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteTitleAkaTitleType() throws Exception {
        // Initialize the database
        titleAkaTitleTypeRepository.saveAndFlush(titleAkaTitleType);

        int databaseSizeBeforeDelete = titleAkaTitleTypeRepository.findAll().size();

        // Delete the titleAkaTitleType
        restTitleAkaTitleTypeMockMvc
            .perform(delete(ENTITY_API_URL_ID, titleAkaTitleType.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<TitleAkaTitleType> titleAkaTitleTypeList = titleAkaTitleTypeRepository.findAll();
        assertThat(titleAkaTitleTypeList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
