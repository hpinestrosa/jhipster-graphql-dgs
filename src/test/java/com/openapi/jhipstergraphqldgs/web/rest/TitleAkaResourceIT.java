package com.openapi.jhipstergraphqldgs.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.openapi.jhipstergraphqldgs.IntegrationTest;
import com.openapi.jhipstergraphqldgs.domain.TitleAka;
import com.openapi.jhipstergraphqldgs.repository.TitleAkaRepository;
import com.openapi.jhipstergraphqldgs.service.dto.TitleAkaDTO;
import com.openapi.jhipstergraphqldgs.service.mapper.TitleAkaMapper;
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
 * Integration tests for the {@link TitleAkaResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class TitleAkaResourceIT {

    private static final String DEFAULT_AKA_TITLE = "AAAAAAAAAA";
    private static final String UPDATED_AKA_TITLE = "BBBBBBBBBB";

    private static final String DEFAULT_ADDITIONAL_ATTRS = "AAAAAAAAAA";
    private static final String UPDATED_ADDITIONAL_ATTRS = "BBBBBBBBBB";

    private static final Boolean DEFAULT_IS_ORIGINAL_TITLE = false;
    private static final Boolean UPDATED_IS_ORIGINAL_TITLE = true;

    private static final String ENTITY_API_URL = "/api/title-akas";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private TitleAkaRepository titleAkaRepository;

    @Autowired
    private TitleAkaMapper titleAkaMapper;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restTitleAkaMockMvc;

    private TitleAka titleAka;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TitleAka createEntity(EntityManager em) {
        TitleAka titleAka = new TitleAka()
            .akaTitle(DEFAULT_AKA_TITLE)
            .additionalAttrs(DEFAULT_ADDITIONAL_ATTRS)
            .isOriginalTitle(DEFAULT_IS_ORIGINAL_TITLE);
        return titleAka;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TitleAka createUpdatedEntity(EntityManager em) {
        TitleAka titleAka = new TitleAka()
            .akaTitle(UPDATED_AKA_TITLE)
            .additionalAttrs(UPDATED_ADDITIONAL_ATTRS)
            .isOriginalTitle(UPDATED_IS_ORIGINAL_TITLE);
        return titleAka;
    }

    @BeforeEach
    public void initTest() {
        titleAka = createEntity(em);
    }

    @Test
    @Transactional
    void createTitleAka() throws Exception {
        int databaseSizeBeforeCreate = titleAkaRepository.findAll().size();
        // Create the TitleAka
        TitleAkaDTO titleAkaDTO = titleAkaMapper.toDto(titleAka);
        restTitleAkaMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(titleAkaDTO)))
            .andExpect(status().isCreated());

        // Validate the TitleAka in the database
        List<TitleAka> titleAkaList = titleAkaRepository.findAll();
        assertThat(titleAkaList).hasSize(databaseSizeBeforeCreate + 1);
        TitleAka testTitleAka = titleAkaList.get(titleAkaList.size() - 1);
        assertThat(testTitleAka.getAkaTitle()).isEqualTo(DEFAULT_AKA_TITLE);
        assertThat(testTitleAka.getAdditionalAttrs()).isEqualTo(DEFAULT_ADDITIONAL_ATTRS);
        assertThat(testTitleAka.getIsOriginalTitle()).isEqualTo(DEFAULT_IS_ORIGINAL_TITLE);
    }

    @Test
    @Transactional
    void createTitleAkaWithExistingId() throws Exception {
        // Create the TitleAka with an existing ID
        titleAka.setId(1L);
        TitleAkaDTO titleAkaDTO = titleAkaMapper.toDto(titleAka);

        int databaseSizeBeforeCreate = titleAkaRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restTitleAkaMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(titleAkaDTO)))
            .andExpect(status().isBadRequest());

        // Validate the TitleAka in the database
        List<TitleAka> titleAkaList = titleAkaRepository.findAll();
        assertThat(titleAkaList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkAkaTitleIsRequired() throws Exception {
        int databaseSizeBeforeTest = titleAkaRepository.findAll().size();
        // set the field null
        titleAka.setAkaTitle(null);

        // Create the TitleAka, which fails.
        TitleAkaDTO titleAkaDTO = titleAkaMapper.toDto(titleAka);

        restTitleAkaMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(titleAkaDTO)))
            .andExpect(status().isBadRequest());

        List<TitleAka> titleAkaList = titleAkaRepository.findAll();
        assertThat(titleAkaList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllTitleAkas() throws Exception {
        // Initialize the database
        titleAkaRepository.saveAndFlush(titleAka);

        // Get all the titleAkaList
        restTitleAkaMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(titleAka.getId().intValue())))
            .andExpect(jsonPath("$.[*].akaTitle").value(hasItem(DEFAULT_AKA_TITLE)))
            .andExpect(jsonPath("$.[*].additionalAttrs").value(hasItem(DEFAULT_ADDITIONAL_ATTRS)))
            .andExpect(jsonPath("$.[*].isOriginalTitle").value(hasItem(DEFAULT_IS_ORIGINAL_TITLE.booleanValue())));
    }

    @Test
    @Transactional
    void getTitleAka() throws Exception {
        // Initialize the database
        titleAkaRepository.saveAndFlush(titleAka);

        // Get the titleAka
        restTitleAkaMockMvc
            .perform(get(ENTITY_API_URL_ID, titleAka.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(titleAka.getId().intValue()))
            .andExpect(jsonPath("$.akaTitle").value(DEFAULT_AKA_TITLE))
            .andExpect(jsonPath("$.additionalAttrs").value(DEFAULT_ADDITIONAL_ATTRS))
            .andExpect(jsonPath("$.isOriginalTitle").value(DEFAULT_IS_ORIGINAL_TITLE.booleanValue()));
    }

    @Test
    @Transactional
    void getNonExistingTitleAka() throws Exception {
        // Get the titleAka
        restTitleAkaMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewTitleAka() throws Exception {
        // Initialize the database
        titleAkaRepository.saveAndFlush(titleAka);

        int databaseSizeBeforeUpdate = titleAkaRepository.findAll().size();

        // Update the titleAka
        TitleAka updatedTitleAka = titleAkaRepository.findById(titleAka.getId()).get();
        // Disconnect from session so that the updates on updatedTitleAka are not directly saved in db
        em.detach(updatedTitleAka);
        updatedTitleAka.akaTitle(UPDATED_AKA_TITLE).additionalAttrs(UPDATED_ADDITIONAL_ATTRS).isOriginalTitle(UPDATED_IS_ORIGINAL_TITLE);
        TitleAkaDTO titleAkaDTO = titleAkaMapper.toDto(updatedTitleAka);

        restTitleAkaMockMvc
            .perform(
                put(ENTITY_API_URL_ID, titleAkaDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(titleAkaDTO))
            )
            .andExpect(status().isOk());

        // Validate the TitleAka in the database
        List<TitleAka> titleAkaList = titleAkaRepository.findAll();
        assertThat(titleAkaList).hasSize(databaseSizeBeforeUpdate);
        TitleAka testTitleAka = titleAkaList.get(titleAkaList.size() - 1);
        assertThat(testTitleAka.getAkaTitle()).isEqualTo(UPDATED_AKA_TITLE);
        assertThat(testTitleAka.getAdditionalAttrs()).isEqualTo(UPDATED_ADDITIONAL_ATTRS);
        assertThat(testTitleAka.getIsOriginalTitle()).isEqualTo(UPDATED_IS_ORIGINAL_TITLE);
    }

    @Test
    @Transactional
    void putNonExistingTitleAka() throws Exception {
        int databaseSizeBeforeUpdate = titleAkaRepository.findAll().size();
        titleAka.setId(count.incrementAndGet());

        // Create the TitleAka
        TitleAkaDTO titleAkaDTO = titleAkaMapper.toDto(titleAka);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTitleAkaMockMvc
            .perform(
                put(ENTITY_API_URL_ID, titleAkaDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(titleAkaDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the TitleAka in the database
        List<TitleAka> titleAkaList = titleAkaRepository.findAll();
        assertThat(titleAkaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchTitleAka() throws Exception {
        int databaseSizeBeforeUpdate = titleAkaRepository.findAll().size();
        titleAka.setId(count.incrementAndGet());

        // Create the TitleAka
        TitleAkaDTO titleAkaDTO = titleAkaMapper.toDto(titleAka);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTitleAkaMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(titleAkaDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the TitleAka in the database
        List<TitleAka> titleAkaList = titleAkaRepository.findAll();
        assertThat(titleAkaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamTitleAka() throws Exception {
        int databaseSizeBeforeUpdate = titleAkaRepository.findAll().size();
        titleAka.setId(count.incrementAndGet());

        // Create the TitleAka
        TitleAkaDTO titleAkaDTO = titleAkaMapper.toDto(titleAka);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTitleAkaMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(titleAkaDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the TitleAka in the database
        List<TitleAka> titleAkaList = titleAkaRepository.findAll();
        assertThat(titleAkaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateTitleAkaWithPatch() throws Exception {
        // Initialize the database
        titleAkaRepository.saveAndFlush(titleAka);

        int databaseSizeBeforeUpdate = titleAkaRepository.findAll().size();

        // Update the titleAka using partial update
        TitleAka partialUpdatedTitleAka = new TitleAka();
        partialUpdatedTitleAka.setId(titleAka.getId());

        partialUpdatedTitleAka
            .akaTitle(UPDATED_AKA_TITLE)
            .additionalAttrs(UPDATED_ADDITIONAL_ATTRS)
            .isOriginalTitle(UPDATED_IS_ORIGINAL_TITLE);

        restTitleAkaMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedTitleAka.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedTitleAka))
            )
            .andExpect(status().isOk());

        // Validate the TitleAka in the database
        List<TitleAka> titleAkaList = titleAkaRepository.findAll();
        assertThat(titleAkaList).hasSize(databaseSizeBeforeUpdate);
        TitleAka testTitleAka = titleAkaList.get(titleAkaList.size() - 1);
        assertThat(testTitleAka.getAkaTitle()).isEqualTo(UPDATED_AKA_TITLE);
        assertThat(testTitleAka.getAdditionalAttrs()).isEqualTo(UPDATED_ADDITIONAL_ATTRS);
        assertThat(testTitleAka.getIsOriginalTitle()).isEqualTo(UPDATED_IS_ORIGINAL_TITLE);
    }

    @Test
    @Transactional
    void fullUpdateTitleAkaWithPatch() throws Exception {
        // Initialize the database
        titleAkaRepository.saveAndFlush(titleAka);

        int databaseSizeBeforeUpdate = titleAkaRepository.findAll().size();

        // Update the titleAka using partial update
        TitleAka partialUpdatedTitleAka = new TitleAka();
        partialUpdatedTitleAka.setId(titleAka.getId());

        partialUpdatedTitleAka
            .akaTitle(UPDATED_AKA_TITLE)
            .additionalAttrs(UPDATED_ADDITIONAL_ATTRS)
            .isOriginalTitle(UPDATED_IS_ORIGINAL_TITLE);

        restTitleAkaMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedTitleAka.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedTitleAka))
            )
            .andExpect(status().isOk());

        // Validate the TitleAka in the database
        List<TitleAka> titleAkaList = titleAkaRepository.findAll();
        assertThat(titleAkaList).hasSize(databaseSizeBeforeUpdate);
        TitleAka testTitleAka = titleAkaList.get(titleAkaList.size() - 1);
        assertThat(testTitleAka.getAkaTitle()).isEqualTo(UPDATED_AKA_TITLE);
        assertThat(testTitleAka.getAdditionalAttrs()).isEqualTo(UPDATED_ADDITIONAL_ATTRS);
        assertThat(testTitleAka.getIsOriginalTitle()).isEqualTo(UPDATED_IS_ORIGINAL_TITLE);
    }

    @Test
    @Transactional
    void patchNonExistingTitleAka() throws Exception {
        int databaseSizeBeforeUpdate = titleAkaRepository.findAll().size();
        titleAka.setId(count.incrementAndGet());

        // Create the TitleAka
        TitleAkaDTO titleAkaDTO = titleAkaMapper.toDto(titleAka);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTitleAkaMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, titleAkaDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(titleAkaDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the TitleAka in the database
        List<TitleAka> titleAkaList = titleAkaRepository.findAll();
        assertThat(titleAkaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchTitleAka() throws Exception {
        int databaseSizeBeforeUpdate = titleAkaRepository.findAll().size();
        titleAka.setId(count.incrementAndGet());

        // Create the TitleAka
        TitleAkaDTO titleAkaDTO = titleAkaMapper.toDto(titleAka);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTitleAkaMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(titleAkaDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the TitleAka in the database
        List<TitleAka> titleAkaList = titleAkaRepository.findAll();
        assertThat(titleAkaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamTitleAka() throws Exception {
        int databaseSizeBeforeUpdate = titleAkaRepository.findAll().size();
        titleAka.setId(count.incrementAndGet());

        // Create the TitleAka
        TitleAkaDTO titleAkaDTO = titleAkaMapper.toDto(titleAka);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTitleAkaMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(titleAkaDTO))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the TitleAka in the database
        List<TitleAka> titleAkaList = titleAkaRepository.findAll();
        assertThat(titleAkaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteTitleAka() throws Exception {
        // Initialize the database
        titleAkaRepository.saveAndFlush(titleAka);

        int databaseSizeBeforeDelete = titleAkaRepository.findAll().size();

        // Delete the titleAka
        restTitleAkaMockMvc
            .perform(delete(ENTITY_API_URL_ID, titleAka.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<TitleAka> titleAkaList = titleAkaRepository.findAll();
        assertThat(titleAkaList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
