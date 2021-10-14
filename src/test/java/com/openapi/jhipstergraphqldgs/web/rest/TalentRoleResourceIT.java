package com.openapi.jhipstergraphqldgs.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.openapi.jhipstergraphqldgs.IntegrationTest;
import com.openapi.jhipstergraphqldgs.domain.TalentRole;
import com.openapi.jhipstergraphqldgs.repository.TalentRoleRepository;
import com.openapi.jhipstergraphqldgs.service.dto.TalentRoleDTO;
import com.openapi.jhipstergraphqldgs.service.mapper.TalentRoleMapper;
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
 * Integration tests for the {@link TalentRoleResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class TalentRoleResourceIT {

    private static final Integer DEFAULT_ORD = 1;
    private static final Integer UPDATED_ORD = 2;

    private static final String ENTITY_API_URL = "/api/talent-roles";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private TalentRoleRepository talentRoleRepository;

    @Autowired
    private TalentRoleMapper talentRoleMapper;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restTalentRoleMockMvc;

    private TalentRole talentRole;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TalentRole createEntity(EntityManager em) {
        TalentRole talentRole = new TalentRole().ord(DEFAULT_ORD);
        return talentRole;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TalentRole createUpdatedEntity(EntityManager em) {
        TalentRole talentRole = new TalentRole().ord(UPDATED_ORD);
        return talentRole;
    }

    @BeforeEach
    public void initTest() {
        talentRole = createEntity(em);
    }

    @Test
    @Transactional
    void createTalentRole() throws Exception {
        int databaseSizeBeforeCreate = talentRoleRepository.findAll().size();
        // Create the TalentRole
        TalentRoleDTO talentRoleDTO = talentRoleMapper.toDto(talentRole);
        restTalentRoleMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(talentRoleDTO)))
            .andExpect(status().isCreated());

        // Validate the TalentRole in the database
        List<TalentRole> talentRoleList = talentRoleRepository.findAll();
        assertThat(talentRoleList).hasSize(databaseSizeBeforeCreate + 1);
        TalentRole testTalentRole = talentRoleList.get(talentRoleList.size() - 1);
        assertThat(testTalentRole.getOrd()).isEqualTo(DEFAULT_ORD);
    }

    @Test
    @Transactional
    void createTalentRoleWithExistingId() throws Exception {
        // Create the TalentRole with an existing ID
        talentRole.setId(1L);
        TalentRoleDTO talentRoleDTO = talentRoleMapper.toDto(talentRole);

        int databaseSizeBeforeCreate = talentRoleRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restTalentRoleMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(talentRoleDTO)))
            .andExpect(status().isBadRequest());

        // Validate the TalentRole in the database
        List<TalentRole> talentRoleList = talentRoleRepository.findAll();
        assertThat(talentRoleList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkOrdIsRequired() throws Exception {
        int databaseSizeBeforeTest = talentRoleRepository.findAll().size();
        // set the field null
        talentRole.setOrd(null);

        // Create the TalentRole, which fails.
        TalentRoleDTO talentRoleDTO = talentRoleMapper.toDto(talentRole);

        restTalentRoleMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(talentRoleDTO)))
            .andExpect(status().isBadRequest());

        List<TalentRole> talentRoleList = talentRoleRepository.findAll();
        assertThat(talentRoleList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllTalentRoles() throws Exception {
        // Initialize the database
        talentRoleRepository.saveAndFlush(talentRole);

        // Get all the talentRoleList
        restTalentRoleMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(talentRole.getId().intValue())))
            .andExpect(jsonPath("$.[*].ord").value(hasItem(DEFAULT_ORD)));
    }

    @Test
    @Transactional
    void getTalentRole() throws Exception {
        // Initialize the database
        talentRoleRepository.saveAndFlush(talentRole);

        // Get the talentRole
        restTalentRoleMockMvc
            .perform(get(ENTITY_API_URL_ID, talentRole.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(talentRole.getId().intValue()))
            .andExpect(jsonPath("$.ord").value(DEFAULT_ORD));
    }

    @Test
    @Transactional
    void getNonExistingTalentRole() throws Exception {
        // Get the talentRole
        restTalentRoleMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewTalentRole() throws Exception {
        // Initialize the database
        talentRoleRepository.saveAndFlush(talentRole);

        int databaseSizeBeforeUpdate = talentRoleRepository.findAll().size();

        // Update the talentRole
        TalentRole updatedTalentRole = talentRoleRepository.findById(talentRole.getId()).get();
        // Disconnect from session so that the updates on updatedTalentRole are not directly saved in db
        em.detach(updatedTalentRole);
        updatedTalentRole.ord(UPDATED_ORD);
        TalentRoleDTO talentRoleDTO = talentRoleMapper.toDto(updatedTalentRole);

        restTalentRoleMockMvc
            .perform(
                put(ENTITY_API_URL_ID, talentRoleDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(talentRoleDTO))
            )
            .andExpect(status().isOk());

        // Validate the TalentRole in the database
        List<TalentRole> talentRoleList = talentRoleRepository.findAll();
        assertThat(talentRoleList).hasSize(databaseSizeBeforeUpdate);
        TalentRole testTalentRole = talentRoleList.get(talentRoleList.size() - 1);
        assertThat(testTalentRole.getOrd()).isEqualTo(UPDATED_ORD);
    }

    @Test
    @Transactional
    void putNonExistingTalentRole() throws Exception {
        int databaseSizeBeforeUpdate = talentRoleRepository.findAll().size();
        talentRole.setId(count.incrementAndGet());

        // Create the TalentRole
        TalentRoleDTO talentRoleDTO = talentRoleMapper.toDto(talentRole);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTalentRoleMockMvc
            .perform(
                put(ENTITY_API_URL_ID, talentRoleDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(talentRoleDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the TalentRole in the database
        List<TalentRole> talentRoleList = talentRoleRepository.findAll();
        assertThat(talentRoleList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchTalentRole() throws Exception {
        int databaseSizeBeforeUpdate = talentRoleRepository.findAll().size();
        talentRole.setId(count.incrementAndGet());

        // Create the TalentRole
        TalentRoleDTO talentRoleDTO = talentRoleMapper.toDto(talentRole);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTalentRoleMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(talentRoleDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the TalentRole in the database
        List<TalentRole> talentRoleList = talentRoleRepository.findAll();
        assertThat(talentRoleList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamTalentRole() throws Exception {
        int databaseSizeBeforeUpdate = talentRoleRepository.findAll().size();
        talentRole.setId(count.incrementAndGet());

        // Create the TalentRole
        TalentRoleDTO talentRoleDTO = talentRoleMapper.toDto(talentRole);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTalentRoleMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(talentRoleDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the TalentRole in the database
        List<TalentRole> talentRoleList = talentRoleRepository.findAll();
        assertThat(talentRoleList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateTalentRoleWithPatch() throws Exception {
        // Initialize the database
        talentRoleRepository.saveAndFlush(talentRole);

        int databaseSizeBeforeUpdate = talentRoleRepository.findAll().size();

        // Update the talentRole using partial update
        TalentRole partialUpdatedTalentRole = new TalentRole();
        partialUpdatedTalentRole.setId(talentRole.getId());

        partialUpdatedTalentRole.ord(UPDATED_ORD);

        restTalentRoleMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedTalentRole.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedTalentRole))
            )
            .andExpect(status().isOk());

        // Validate the TalentRole in the database
        List<TalentRole> talentRoleList = talentRoleRepository.findAll();
        assertThat(talentRoleList).hasSize(databaseSizeBeforeUpdate);
        TalentRole testTalentRole = talentRoleList.get(talentRoleList.size() - 1);
        assertThat(testTalentRole.getOrd()).isEqualTo(UPDATED_ORD);
    }

    @Test
    @Transactional
    void fullUpdateTalentRoleWithPatch() throws Exception {
        // Initialize the database
        talentRoleRepository.saveAndFlush(talentRole);

        int databaseSizeBeforeUpdate = talentRoleRepository.findAll().size();

        // Update the talentRole using partial update
        TalentRole partialUpdatedTalentRole = new TalentRole();
        partialUpdatedTalentRole.setId(talentRole.getId());

        partialUpdatedTalentRole.ord(UPDATED_ORD);

        restTalentRoleMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedTalentRole.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedTalentRole))
            )
            .andExpect(status().isOk());

        // Validate the TalentRole in the database
        List<TalentRole> talentRoleList = talentRoleRepository.findAll();
        assertThat(talentRoleList).hasSize(databaseSizeBeforeUpdate);
        TalentRole testTalentRole = talentRoleList.get(talentRoleList.size() - 1);
        assertThat(testTalentRole.getOrd()).isEqualTo(UPDATED_ORD);
    }

    @Test
    @Transactional
    void patchNonExistingTalentRole() throws Exception {
        int databaseSizeBeforeUpdate = talentRoleRepository.findAll().size();
        talentRole.setId(count.incrementAndGet());

        // Create the TalentRole
        TalentRoleDTO talentRoleDTO = talentRoleMapper.toDto(talentRole);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTalentRoleMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, talentRoleDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(talentRoleDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the TalentRole in the database
        List<TalentRole> talentRoleList = talentRoleRepository.findAll();
        assertThat(talentRoleList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchTalentRole() throws Exception {
        int databaseSizeBeforeUpdate = talentRoleRepository.findAll().size();
        talentRole.setId(count.incrementAndGet());

        // Create the TalentRole
        TalentRoleDTO talentRoleDTO = talentRoleMapper.toDto(talentRole);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTalentRoleMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(talentRoleDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the TalentRole in the database
        List<TalentRole> talentRoleList = talentRoleRepository.findAll();
        assertThat(talentRoleList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamTalentRole() throws Exception {
        int databaseSizeBeforeUpdate = talentRoleRepository.findAll().size();
        talentRole.setId(count.incrementAndGet());

        // Create the TalentRole
        TalentRoleDTO talentRoleDTO = talentRoleMapper.toDto(talentRole);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTalentRoleMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(talentRoleDTO))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the TalentRole in the database
        List<TalentRole> talentRoleList = talentRoleRepository.findAll();
        assertThat(talentRoleList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteTalentRole() throws Exception {
        // Initialize the database
        talentRoleRepository.saveAndFlush(talentRole);

        int databaseSizeBeforeDelete = talentRoleRepository.findAll().size();

        // Delete the talentRole
        restTalentRoleMockMvc
            .perform(delete(ENTITY_API_URL_ID, talentRole.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<TalentRole> talentRoleList = talentRoleRepository.findAll();
        assertThat(talentRoleList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
