package com.openapi.jhipstergraphqldgs.web.rest;

import com.openapi.jhipstergraphqldgs.repository.TalentRepository;
import com.openapi.jhipstergraphqldgs.service.TalentService;
import com.openapi.jhipstergraphqldgs.service.dto.TalentDTO;
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
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.PaginationUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.openapi.jhipstergraphqldgs.domain.Talent}.
 */
@RestController
@RequestMapping("/api")
public class TalentResource {

    private final Logger log = LoggerFactory.getLogger(TalentResource.class);

    private static final String ENTITY_NAME = "talent";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TalentService talentService;

    private final TalentRepository talentRepository;

    public TalentResource(TalentService talentService, TalentRepository talentRepository) {
        this.talentService = talentService;
        this.talentRepository = talentRepository;
    }

    /**
     * {@code POST  /talents} : Create a new talent.
     *
     * @param talentDTO the talentDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new talentDTO, or with status {@code 400 (Bad Request)} if the talent has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/talents")
    public ResponseEntity<TalentDTO> createTalent(@Valid @RequestBody TalentDTO talentDTO) throws URISyntaxException {
        log.debug("REST request to save Talent : {}", talentDTO);
        if (talentDTO.getId() != null) {
            throw new BadRequestAlertException("A new talent cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TalentDTO result = talentService.save(talentDTO);
        return ResponseEntity
            .created(new URI("/api/talents/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /talents/:id} : Updates an existing talent.
     *
     * @param id the id of the talentDTO to save.
     * @param talentDTO the talentDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated talentDTO,
     * or with status {@code 400 (Bad Request)} if the talentDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the talentDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/talents/{id}")
    public ResponseEntity<TalentDTO> updateTalent(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody TalentDTO talentDTO
    ) throws URISyntaxException {
        log.debug("REST request to update Talent : {}, {}", id, talentDTO);
        if (talentDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, talentDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!talentRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        TalentDTO result = talentService.save(talentDTO);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, talentDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /talents/:id} : Partial updates given fields of an existing talent, field will ignore if it is null
     *
     * @param id the id of the talentDTO to save.
     * @param talentDTO the talentDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated talentDTO,
     * or with status {@code 400 (Bad Request)} if the talentDTO is not valid,
     * or with status {@code 404 (Not Found)} if the talentDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the talentDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/talents/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<TalentDTO> partialUpdateTalent(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody TalentDTO talentDTO
    ) throws URISyntaxException {
        log.debug("REST request to partial update Talent partially : {}, {}", id, talentDTO);
        if (talentDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, talentDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!talentRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<TalentDTO> result = talentService.partialUpdate(talentDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, talentDTO.getId().toString())
        );
    }

    /**
     * {@code GET  /talents} : get all the talents.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of talents in body.
     */
    @GetMapping("/talents")
    public ResponseEntity<List<TalentDTO>> getAllTalents(Pageable pageable) {
        log.debug("REST request to get a page of Talents");
        Page<TalentDTO> page = talentService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /talents/:id} : get the "id" talent.
     *
     * @param id the id of the talentDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the talentDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/talents/{id}")
    public ResponseEntity<TalentDTO> getTalent(@PathVariable Long id) {
        log.debug("REST request to get Talent : {}", id);
        Optional<TalentDTO> talentDTO = talentService.findOne(id);
        return ResponseUtil.wrapOrNotFound(talentDTO);
    }

    /**
     * {@code DELETE  /talents/:id} : delete the "id" talent.
     *
     * @param id the id of the talentDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/talents/{id}")
    public ResponseEntity<Void> deleteTalent(@PathVariable Long id) {
        log.debug("REST request to delete Talent : {}", id);
        talentService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
