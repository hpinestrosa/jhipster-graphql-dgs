package com.openapi.jhipstergraphqldgs.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.openapi.jhipstergraphqldgs.IntegrationTest;
import com.openapi.jhipstergraphqldgs.domain.Talent;
import com.openapi.jhipstergraphqldgs.repository.TalentRepository;
import com.openapi.jhipstergraphqldgs.service.dto.TalentDTO;
import com.openapi.jhipstergraphqldgs.service.mapper.TalentMapper;
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
 * Integration tests for the {@link TalentResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class TalentResourceIT {

    private static final String DEFAULT_TALENT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_TALENT_NAME = "BBBBBBBBBB";

    private static final Integer DEFAULT_BIRTH_YEAR = 1;
    private static final Integer UPDATED_BIRTH_YEAR = 2;

    private static final Integer DEFAULT_DEATH_YEAR = 1;
    private static final Integer UPDATED_DEATH_YEAR = 2;

    private static final String ENTITY_API_URL = "/api/talents";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private TalentRepository talentRepository;

    @Autowired
    private TalentMapper talentMapper;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restTalentMockMvc;

    private Talent talent;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Talent createEntity(EntityManager em) {
        Talent talent = new Talent().talentName(DEFAULT_TALENT_NAME).birthYear(DEFAULT_BIRTH_YEAR).deathYear(DEFAULT_DEATH_YEAR);
        return talent;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Talent createUpdatedEntity(EntityManager em) {
        Talent talent = new Talent().talentName(UPDATED_TALENT_NAME).birthYear(UPDATED_BIRTH_YEAR).deathYear(UPDATED_DEATH_YEAR);
        return talent;
    }

    @BeforeEach
    public void initTest() {
        talent = createEntity(em);
    }

    @Test
    @Transactional
    void createTalent() throws Exception {
        int databaseSizeBeforeCreate = talentRepository.findAll().size();
        // Create the Talent
        TalentDTO talentDTO = talentMapper.toDto(talent);
        restTalentMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(talentDTO)))
            .andExpect(status().isCreated());

        // Validate the Talent in the database
        List<Talent> talentList = talentRepository.findAll();
        assertThat(talentList).hasSize(databaseSizeBeforeCreate + 1);
        Talent testTalent = talentList.get(talentList.size() - 1);
        assertThat(testTalent.getTalentName()).isEqualTo(DEFAULT_TALENT_NAME);
        assertThat(testTalent.getBirthYear()).isEqualTo(DEFAULT_BIRTH_YEAR);
        assertThat(testTalent.getDeathYear()).isEqualTo(DEFAULT_DEATH_YEAR);
    }

    @Test
    @Transactional
    void createTalentWithExistingId() throws Exception {
        // Create the Talent with an existing ID
        talent.setId(1L);
        TalentDTO talentDTO = talentMapper.toDto(talent);

        int databaseSizeBeforeCreate = talentRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restTalentMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(talentDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Talent in the database
        List<Talent> talentList = talentRepository.findAll();
        assertThat(talentList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkTalentNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = talentRepository.findAll().size();
        // set the field null
        talent.setTalentName(null);

        // Create the Talent, which fails.
        TalentDTO talentDTO = talentMapper.toDto(talent);

        restTalentMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(talentDTO)))
            .andExpect(status().isBadRequest());

        List<Talent> talentList = talentRepository.findAll();
        assertThat(talentList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllTalents() throws Exception {
        // Initialize the database
        talentRepository.saveAndFlush(talent);

        // Get all the talentList
        restTalentMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(talent.getId().intValue())))
            .andExpect(jsonPath("$.[*].talentName").value(hasItem(DEFAULT_TALENT_NAME)))
            .andExpect(jsonPath("$.[*].birthYear").value(hasItem(DEFAULT_BIRTH_YEAR)))
            .andExpect(jsonPath("$.[*].deathYear").value(hasItem(DEFAULT_DEATH_YEAR)));
    }

    @Test
    @Transactional
    void getTalent() throws Exception {
        // Initialize the database
        talentRepository.saveAndFlush(talent);

        // Get the talent
        restTalentMockMvc
            .perform(get(ENTITY_API_URL_ID, talent.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(talent.getId().intValue()))
            .andExpect(jsonPath("$.talentName").value(DEFAULT_TALENT_NAME))
            .andExpect(jsonPath("$.birthYear").value(DEFAULT_BIRTH_YEAR))
            .andExpect(jsonPath("$.deathYear").value(DEFAULT_DEATH_YEAR));
    }

    @Test
    @Transactional
    void getNonExistingTalent() throws Exception {
        // Get the talent
        restTalentMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewTalent() throws Exception {
        // Initialize the database
        talentRepository.saveAndFlush(talent);

        int databaseSizeBeforeUpdate = talentRepository.findAll().size();

        // Update the talent
        Talent updatedTalent = talentRepository.findById(talent.getId()).get();
        // Disconnect from session so that the updates on updatedTalent are not directly saved in db
        em.detach(updatedTalent);
        updatedTalent.talentName(UPDATED_TALENT_NAME).birthYear(UPDATED_BIRTH_YEAR).deathYear(UPDATED_DEATH_YEAR);
        TalentDTO talentDTO = talentMapper.toDto(updatedTalent);

        restTalentMockMvc
            .perform(
                put(ENTITY_API_URL_ID, talentDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(talentDTO))
            )
            .andExpect(status().isOk());

        // Validate the Talent in the database
        List<Talent> talentList = talentRepository.findAll();
        assertThat(talentList).hasSize(databaseSizeBeforeUpdate);
        Talent testTalent = talentList.get(talentList.size() - 1);
        assertThat(testTalent.getTalentName()).isEqualTo(UPDATED_TALENT_NAME);
        assertThat(testTalent.getBirthYear()).isEqualTo(UPDATED_BIRTH_YEAR);
        assertThat(testTalent.getDeathYear()).isEqualTo(UPDATED_DEATH_YEAR);
    }

    @Test
    @Transactional
    void putNonExistingTalent() throws Exception {
        int databaseSizeBeforeUpdate = talentRepository.findAll().size();
        talent.setId(count.incrementAndGet());

        // Create the Talent
        TalentDTO talentDTO = talentMapper.toDto(talent);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTalentMockMvc
            .perform(
                put(ENTITY_API_URL_ID, talentDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(talentDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Talent in the database
        List<Talent> talentList = talentRepository.findAll();
        assertThat(talentList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchTalent() throws Exception {
        int databaseSizeBeforeUpdate = talentRepository.findAll().size();
        talent.setId(count.incrementAndGet());

        // Create the Talent
        TalentDTO talentDTO = talentMapper.toDto(talent);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTalentMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(talentDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Talent in the database
        List<Talent> talentList = talentRepository.findAll();
        assertThat(talentList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamTalent() throws Exception {
        int databaseSizeBeforeUpdate = talentRepository.findAll().size();
        talent.setId(count.incrementAndGet());

        // Create the Talent
        TalentDTO talentDTO = talentMapper.toDto(talent);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTalentMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(talentDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Talent in the database
        List<Talent> talentList = talentRepository.findAll();
        assertThat(talentList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateTalentWithPatch() throws Exception {
        // Initialize the database
        talentRepository.saveAndFlush(talent);

        int databaseSizeBeforeUpdate = talentRepository.findAll().size();

        // Update the talent using partial update
        Talent partialUpdatedTalent = new Talent();
        partialUpdatedTalent.setId(talent.getId());

        partialUpdatedTalent.talentName(UPDATED_TALENT_NAME).deathYear(UPDATED_DEATH_YEAR);

        restTalentMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedTalent.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedTalent))
            )
            .andExpect(status().isOk());

        // Validate the Talent in the database
        List<Talent> talentList = talentRepository.findAll();
        assertThat(talentList).hasSize(databaseSizeBeforeUpdate);
        Talent testTalent = talentList.get(talentList.size() - 1);
        assertThat(testTalent.getTalentName()).isEqualTo(UPDATED_TALENT_NAME);
        assertThat(testTalent.getBirthYear()).isEqualTo(DEFAULT_BIRTH_YEAR);
        assertThat(testTalent.getDeathYear()).isEqualTo(UPDATED_DEATH_YEAR);
    }

    @Test
    @Transactional
    void fullUpdateTalentWithPatch() throws Exception {
        // Initialize the database
        talentRepository.saveAndFlush(talent);

        int databaseSizeBeforeUpdate = talentRepository.findAll().size();

        // Update the talent using partial update
        Talent partialUpdatedTalent = new Talent();
        partialUpdatedTalent.setId(talent.getId());

        partialUpdatedTalent.talentName(UPDATED_TALENT_NAME).birthYear(UPDATED_BIRTH_YEAR).deathYear(UPDATED_DEATH_YEAR);

        restTalentMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedTalent.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedTalent))
            )
            .andExpect(status().isOk());

        // Validate the Talent in the database
        List<Talent> talentList = talentRepository.findAll();
        assertThat(talentList).hasSize(databaseSizeBeforeUpdate);
        Talent testTalent = talentList.get(talentList.size() - 1);
        assertThat(testTalent.getTalentName()).isEqualTo(UPDATED_TALENT_NAME);
        assertThat(testTalent.getBirthYear()).isEqualTo(UPDATED_BIRTH_YEAR);
        assertThat(testTalent.getDeathYear()).isEqualTo(UPDATED_DEATH_YEAR);
    }

    @Test
    @Transactional
    void patchNonExistingTalent() throws Exception {
        int databaseSizeBeforeUpdate = talentRepository.findAll().size();
        talent.setId(count.incrementAndGet());

        // Create the Talent
        TalentDTO talentDTO = talentMapper.toDto(talent);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTalentMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, talentDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(talentDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Talent in the database
        List<Talent> talentList = talentRepository.findAll();
        assertThat(talentList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchTalent() throws Exception {
        int databaseSizeBeforeUpdate = talentRepository.findAll().size();
        talent.setId(count.incrementAndGet());

        // Create the Talent
        TalentDTO talentDTO = talentMapper.toDto(talent);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTalentMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(talentDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Talent in the database
        List<Talent> talentList = talentRepository.findAll();
        assertThat(talentList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamTalent() throws Exception {
        int databaseSizeBeforeUpdate = talentRepository.findAll().size();
        talent.setId(count.incrementAndGet());

        // Create the Talent
        TalentDTO talentDTO = talentMapper.toDto(talent);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTalentMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(talentDTO))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the Talent in the database
        List<Talent> talentList = talentRepository.findAll();
        assertThat(talentList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteTalent() throws Exception {
        // Initialize the database
        talentRepository.saveAndFlush(talent);

        int databaseSizeBeforeDelete = talentRepository.findAll().size();

        // Delete the talent
        restTalentMockMvc
            .perform(delete(ENTITY_API_URL_ID, talent.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Talent> talentList = talentRepository.findAll();
        assertThat(talentList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
