package com.openapi.jhipstergraphqldgs.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.openapi.jhipstergraphqldgs.IntegrationTest;
import com.openapi.jhipstergraphqldgs.domain.TitleGenre;
import com.openapi.jhipstergraphqldgs.repository.TitleGenreRepository;
import com.openapi.jhipstergraphqldgs.service.dto.TitleGenreDTO;
import com.openapi.jhipstergraphqldgs.service.mapper.TitleGenreMapper;
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
 * Integration tests for the {@link TitleGenreResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class TitleGenreResourceIT {

    private static final Integer DEFAULT_ORD = 1;
    private static final Integer UPDATED_ORD = 2;

    private static final String ENTITY_API_URL = "/api/title-genres";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private TitleGenreRepository titleGenreRepository;

    @Autowired
    private TitleGenreMapper titleGenreMapper;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restTitleGenreMockMvc;

    private TitleGenre titleGenre;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TitleGenre createEntity(EntityManager em) {
        TitleGenre titleGenre = new TitleGenre().ord(DEFAULT_ORD);
        return titleGenre;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TitleGenre createUpdatedEntity(EntityManager em) {
        TitleGenre titleGenre = new TitleGenre().ord(UPDATED_ORD);
        return titleGenre;
    }

    @BeforeEach
    public void initTest() {
        titleGenre = createEntity(em);
    }

    @Test
    @Transactional
    void createTitleGenre() throws Exception {
        int databaseSizeBeforeCreate = titleGenreRepository.findAll().size();
        // Create the TitleGenre
        TitleGenreDTO titleGenreDTO = titleGenreMapper.toDto(titleGenre);
        restTitleGenreMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(titleGenreDTO)))
            .andExpect(status().isCreated());

        // Validate the TitleGenre in the database
        List<TitleGenre> titleGenreList = titleGenreRepository.findAll();
        assertThat(titleGenreList).hasSize(databaseSizeBeforeCreate + 1);
        TitleGenre testTitleGenre = titleGenreList.get(titleGenreList.size() - 1);
        assertThat(testTitleGenre.getOrd()).isEqualTo(DEFAULT_ORD);
    }

    @Test
    @Transactional
    void createTitleGenreWithExistingId() throws Exception {
        // Create the TitleGenre with an existing ID
        titleGenre.setId(1L);
        TitleGenreDTO titleGenreDTO = titleGenreMapper.toDto(titleGenre);

        int databaseSizeBeforeCreate = titleGenreRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restTitleGenreMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(titleGenreDTO)))
            .andExpect(status().isBadRequest());

        // Validate the TitleGenre in the database
        List<TitleGenre> titleGenreList = titleGenreRepository.findAll();
        assertThat(titleGenreList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkOrdIsRequired() throws Exception {
        int databaseSizeBeforeTest = titleGenreRepository.findAll().size();
        // set the field null
        titleGenre.setOrd(null);

        // Create the TitleGenre, which fails.
        TitleGenreDTO titleGenreDTO = titleGenreMapper.toDto(titleGenre);

        restTitleGenreMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(titleGenreDTO)))
            .andExpect(status().isBadRequest());

        List<TitleGenre> titleGenreList = titleGenreRepository.findAll();
        assertThat(titleGenreList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllTitleGenres() throws Exception {
        // Initialize the database
        titleGenreRepository.saveAndFlush(titleGenre);

        // Get all the titleGenreList
        restTitleGenreMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(titleGenre.getId().intValue())))
            .andExpect(jsonPath("$.[*].ord").value(hasItem(DEFAULT_ORD)));
    }

    @Test
    @Transactional
    void getTitleGenre() throws Exception {
        // Initialize the database
        titleGenreRepository.saveAndFlush(titleGenre);

        // Get the titleGenre
        restTitleGenreMockMvc
            .perform(get(ENTITY_API_URL_ID, titleGenre.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(titleGenre.getId().intValue()))
            .andExpect(jsonPath("$.ord").value(DEFAULT_ORD));
    }

    @Test
    @Transactional
    void getNonExistingTitleGenre() throws Exception {
        // Get the titleGenre
        restTitleGenreMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewTitleGenre() throws Exception {
        // Initialize the database
        titleGenreRepository.saveAndFlush(titleGenre);

        int databaseSizeBeforeUpdate = titleGenreRepository.findAll().size();

        // Update the titleGenre
        TitleGenre updatedTitleGenre = titleGenreRepository.findById(titleGenre.getId()).get();
        // Disconnect from session so that the updates on updatedTitleGenre are not directly saved in db
        em.detach(updatedTitleGenre);
        updatedTitleGenre.ord(UPDATED_ORD);
        TitleGenreDTO titleGenreDTO = titleGenreMapper.toDto(updatedTitleGenre);

        restTitleGenreMockMvc
            .perform(
                put(ENTITY_API_URL_ID, titleGenreDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(titleGenreDTO))
            )
            .andExpect(status().isOk());

        // Validate the TitleGenre in the database
        List<TitleGenre> titleGenreList = titleGenreRepository.findAll();
        assertThat(titleGenreList).hasSize(databaseSizeBeforeUpdate);
        TitleGenre testTitleGenre = titleGenreList.get(titleGenreList.size() - 1);
        assertThat(testTitleGenre.getOrd()).isEqualTo(UPDATED_ORD);
    }

    @Test
    @Transactional
    void putNonExistingTitleGenre() throws Exception {
        int databaseSizeBeforeUpdate = titleGenreRepository.findAll().size();
        titleGenre.setId(count.incrementAndGet());

        // Create the TitleGenre
        TitleGenreDTO titleGenreDTO = titleGenreMapper.toDto(titleGenre);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTitleGenreMockMvc
            .perform(
                put(ENTITY_API_URL_ID, titleGenreDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(titleGenreDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the TitleGenre in the database
        List<TitleGenre> titleGenreList = titleGenreRepository.findAll();
        assertThat(titleGenreList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchTitleGenre() throws Exception {
        int databaseSizeBeforeUpdate = titleGenreRepository.findAll().size();
        titleGenre.setId(count.incrementAndGet());

        // Create the TitleGenre
        TitleGenreDTO titleGenreDTO = titleGenreMapper.toDto(titleGenre);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTitleGenreMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(titleGenreDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the TitleGenre in the database
        List<TitleGenre> titleGenreList = titleGenreRepository.findAll();
        assertThat(titleGenreList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamTitleGenre() throws Exception {
        int databaseSizeBeforeUpdate = titleGenreRepository.findAll().size();
        titleGenre.setId(count.incrementAndGet());

        // Create the TitleGenre
        TitleGenreDTO titleGenreDTO = titleGenreMapper.toDto(titleGenre);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTitleGenreMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(titleGenreDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the TitleGenre in the database
        List<TitleGenre> titleGenreList = titleGenreRepository.findAll();
        assertThat(titleGenreList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateTitleGenreWithPatch() throws Exception {
        // Initialize the database
        titleGenreRepository.saveAndFlush(titleGenre);

        int databaseSizeBeforeUpdate = titleGenreRepository.findAll().size();

        // Update the titleGenre using partial update
        TitleGenre partialUpdatedTitleGenre = new TitleGenre();
        partialUpdatedTitleGenre.setId(titleGenre.getId());

        restTitleGenreMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedTitleGenre.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedTitleGenre))
            )
            .andExpect(status().isOk());

        // Validate the TitleGenre in the database
        List<TitleGenre> titleGenreList = titleGenreRepository.findAll();
        assertThat(titleGenreList).hasSize(databaseSizeBeforeUpdate);
        TitleGenre testTitleGenre = titleGenreList.get(titleGenreList.size() - 1);
        assertThat(testTitleGenre.getOrd()).isEqualTo(DEFAULT_ORD);
    }

    @Test
    @Transactional
    void fullUpdateTitleGenreWithPatch() throws Exception {
        // Initialize the database
        titleGenreRepository.saveAndFlush(titleGenre);

        int databaseSizeBeforeUpdate = titleGenreRepository.findAll().size();

        // Update the titleGenre using partial update
        TitleGenre partialUpdatedTitleGenre = new TitleGenre();
        partialUpdatedTitleGenre.setId(titleGenre.getId());

        partialUpdatedTitleGenre.ord(UPDATED_ORD);

        restTitleGenreMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedTitleGenre.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedTitleGenre))
            )
            .andExpect(status().isOk());

        // Validate the TitleGenre in the database
        List<TitleGenre> titleGenreList = titleGenreRepository.findAll();
        assertThat(titleGenreList).hasSize(databaseSizeBeforeUpdate);
        TitleGenre testTitleGenre = titleGenreList.get(titleGenreList.size() - 1);
        assertThat(testTitleGenre.getOrd()).isEqualTo(UPDATED_ORD);
    }

    @Test
    @Transactional
    void patchNonExistingTitleGenre() throws Exception {
        int databaseSizeBeforeUpdate = titleGenreRepository.findAll().size();
        titleGenre.setId(count.incrementAndGet());

        // Create the TitleGenre
        TitleGenreDTO titleGenreDTO = titleGenreMapper.toDto(titleGenre);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTitleGenreMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, titleGenreDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(titleGenreDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the TitleGenre in the database
        List<TitleGenre> titleGenreList = titleGenreRepository.findAll();
        assertThat(titleGenreList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchTitleGenre() throws Exception {
        int databaseSizeBeforeUpdate = titleGenreRepository.findAll().size();
        titleGenre.setId(count.incrementAndGet());

        // Create the TitleGenre
        TitleGenreDTO titleGenreDTO = titleGenreMapper.toDto(titleGenre);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTitleGenreMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(titleGenreDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the TitleGenre in the database
        List<TitleGenre> titleGenreList = titleGenreRepository.findAll();
        assertThat(titleGenreList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamTitleGenre() throws Exception {
        int databaseSizeBeforeUpdate = titleGenreRepository.findAll().size();
        titleGenre.setId(count.incrementAndGet());

        // Create the TitleGenre
        TitleGenreDTO titleGenreDTO = titleGenreMapper.toDto(titleGenre);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTitleGenreMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(titleGenreDTO))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the TitleGenre in the database
        List<TitleGenre> titleGenreList = titleGenreRepository.findAll();
        assertThat(titleGenreList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteTitleGenre() throws Exception {
        // Initialize the database
        titleGenreRepository.saveAndFlush(titleGenre);

        int databaseSizeBeforeDelete = titleGenreRepository.findAll().size();

        // Delete the titleGenre
        restTitleGenreMockMvc
            .perform(delete(ENTITY_API_URL_ID, titleGenre.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<TitleGenre> titleGenreList = titleGenreRepository.findAll();
        assertThat(titleGenreList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
