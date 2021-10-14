package com.openapi.jhipstergraphqldgs.web.rest;

import com.openapi.jhipstergraphqldgs.repository.TalentRoleRepository;
import com.openapi.jhipstergraphqldgs.service.TalentRoleService;
import com.openapi.jhipstergraphqldgs.service.dto.TalentRoleDTO;
import com.openapi.jhipstergraphqldgs.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.openapi.jhipstergraphqldgs.domain.TalentRole}.
 */
@RestController
@RequestMapping("/api")
public class TalentRoleResource {

    private final Logger log = LoggerFactory.getLogger(TalentRoleResource.class);

    private static final String ENTITY_NAME = "talentRole";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TalentRoleService talentRoleService;

    private final TalentRoleRepository talentRoleRepository;

    public TalentRoleResource(TalentRoleService talentRoleService, TalentRoleRepository talentRoleRepository) {
        this.talentRoleService = talentRoleService;
        this.talentRoleRepository = talentRoleRepository;
    }

    /**
     * {@code POST  /talent-roles} : Create a new talentRole.
     *
     * @param talentRoleDTO the talentRoleDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new talentRoleDTO, or with status {@code 400 (Bad Request)} if the talentRole has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/talent-roles")
    public ResponseEntity<TalentRoleDTO> createTalentRole(@Valid @RequestBody TalentRoleDTO talentRoleDTO) throws URISyntaxException {
        log.debug("REST request to save TalentRole : {}", talentRoleDTO);
        if (talentRoleDTO.getId() != null) {
            throw new BadRequestAlertException("A new talentRole cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TalentRoleDTO result = talentRoleService.save(talentRoleDTO);
        return ResponseEntity
            .created(new URI("/api/talent-roles/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /talent-roles/:id} : Updates an existing talentRole.
     *
     * @param id the id of the talentRoleDTO to save.
     * @param talentRoleDTO the talentRoleDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated talentRoleDTO,
     * or with status {@code 400 (Bad Request)} if the talentRoleDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the talentRoleDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/talent-roles/{id}")
    public ResponseEntity<TalentRoleDTO> updateTalentRole(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody TalentRoleDTO talentRoleDTO
    ) throws URISyntaxException {
        log.debug("REST request to update TalentRole : {}, {}", id, talentRoleDTO);
        if (talentRoleDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, talentRoleDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!talentRoleRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        TalentRoleDTO result = talentRoleService.save(talentRoleDTO);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, talentRoleDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /talent-roles/:id} : Partial updates given fields of an existing talentRole, field will ignore if it is null
     *
     * @param id the id of the talentRoleDTO to save.
     * @param talentRoleDTO the talentRoleDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated talentRoleDTO,
     * or with status {@code 400 (Bad Request)} if the talentRoleDTO is not valid,
     * or with status {@code 404 (Not Found)} if the talentRoleDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the talentRoleDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/talent-roles/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<TalentRoleDTO> partialUpdateTalentRole(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody TalentRoleDTO talentRoleDTO
    ) throws URISyntaxException {
        log.debug("REST request to partial update TalentRole partially : {}, {}", id, talentRoleDTO);
        if (talentRoleDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, talentRoleDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!talentRoleRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<TalentRoleDTO> result = talentRoleService.partialUpdate(talentRoleDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, talentRoleDTO.getId().toString())
        );
    }

    /**
     * {@code GET  /talent-roles} : get all the talentRoles.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of talentRoles in body.
     */
    @GetMapping("/talent-roles")
    public List<TalentRoleDTO> getAllTalentRoles() {
        log.debug("REST request to get all TalentRoles");
        return talentRoleService.findAll();
    }

    /**
     * {@code GET  /talent-roles/:id} : get the "id" talentRole.
     *
     * @param id the id of the talentRoleDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the talentRoleDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/talent-roles/{id}")
    public ResponseEntity<TalentRoleDTO> getTalentRole(@PathVariable Long id) {
        log.debug("REST request to get TalentRole : {}", id);
        Optional<TalentRoleDTO> talentRoleDTO = talentRoleService.findOne(id);
        return ResponseUtil.wrapOrNotFound(talentRoleDTO);
    }

    /**
     * {@code DELETE  /talent-roles/:id} : delete the "id" talentRole.
     *
     * @param id the id of the talentRoleDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/talent-roles/{id}")
    public ResponseEntity<Void> deleteTalentRole(@PathVariable Long id) {
        log.debug("REST request to delete TalentRole : {}", id);
        talentRoleService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
