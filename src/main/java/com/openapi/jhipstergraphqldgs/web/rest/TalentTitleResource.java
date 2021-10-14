package com.openapi.jhipstergraphqldgs.web.rest;

import com.openapi.jhipstergraphqldgs.repository.TalentTitleRepository;
import com.openapi.jhipstergraphqldgs.service.TalentTitleService;
import com.openapi.jhipstergraphqldgs.service.dto.TalentTitleDTO;
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
 * REST controller for managing {@link com.openapi.jhipstergraphqldgs.domain.TalentTitle}.
 */
@RestController
@RequestMapping("/api")
public class TalentTitleResource {

    private final Logger log = LoggerFactory.getLogger(TalentTitleResource.class);

    private static final String ENTITY_NAME = "talentTitle";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TalentTitleService talentTitleService;

    private final TalentTitleRepository talentTitleRepository;

    public TalentTitleResource(TalentTitleService talentTitleService, TalentTitleRepository talentTitleRepository) {
        this.talentTitleService = talentTitleService;
        this.talentTitleRepository = talentTitleRepository;
    }

    /**
     * {@code POST  /talent-titles} : Create a new talentTitle.
     *
     * @param talentTitleDTO the talentTitleDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new talentTitleDTO, or with status {@code 400 (Bad Request)} if the talentTitle has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/talent-titles")
    public ResponseEntity<TalentTitleDTO> createTalentTitle(@Valid @RequestBody TalentTitleDTO talentTitleDTO) throws URISyntaxException {
        log.debug("REST request to save TalentTitle : {}", talentTitleDTO);
        if (talentTitleDTO.getId() != null) {
            throw new BadRequestAlertException("A new talentTitle cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TalentTitleDTO result = talentTitleService.save(talentTitleDTO);
        return ResponseEntity
            .created(new URI("/api/talent-titles/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /talent-titles/:id} : Updates an existing talentTitle.
     *
     * @param id the id of the talentTitleDTO to save.
     * @param talentTitleDTO the talentTitleDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated talentTitleDTO,
     * or with status {@code 400 (Bad Request)} if the talentTitleDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the talentTitleDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/talent-titles/{id}")
    public ResponseEntity<TalentTitleDTO> updateTalentTitle(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody TalentTitleDTO talentTitleDTO
    ) throws URISyntaxException {
        log.debug("REST request to update TalentTitle : {}, {}", id, talentTitleDTO);
        if (talentTitleDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, talentTitleDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!talentTitleRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        TalentTitleDTO result = talentTitleService.save(talentTitleDTO);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, talentTitleDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /talent-titles/:id} : Partial updates given fields of an existing talentTitle, field will ignore if it is null
     *
     * @param id the id of the talentTitleDTO to save.
     * @param talentTitleDTO the talentTitleDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated talentTitleDTO,
     * or with status {@code 400 (Bad Request)} if the talentTitleDTO is not valid,
     * or with status {@code 404 (Not Found)} if the talentTitleDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the talentTitleDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/talent-titles/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<TalentTitleDTO> partialUpdateTalentTitle(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody TalentTitleDTO talentTitleDTO
    ) throws URISyntaxException {
        log.debug("REST request to partial update TalentTitle partially : {}, {}", id, talentTitleDTO);
        if (talentTitleDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, talentTitleDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!talentTitleRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<TalentTitleDTO> result = talentTitleService.partialUpdate(talentTitleDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, talentTitleDTO.getId().toString())
        );
    }

    /**
     * {@code GET  /talent-titles} : get all the talentTitles.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of talentTitles in body.
     */
    @GetMapping("/talent-titles")
    public List<TalentTitleDTO> getAllTalentTitles() {
        log.debug("REST request to get all TalentTitles");
        return talentTitleService.findAll();
    }

    /**
     * {@code GET  /talent-titles/:id} : get the "id" talentTitle.
     *
     * @param id the id of the talentTitleDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the talentTitleDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/talent-titles/{id}")
    public ResponseEntity<TalentTitleDTO> getTalentTitle(@PathVariable Long id) {
        log.debug("REST request to get TalentTitle : {}", id);
        Optional<TalentTitleDTO> talentTitleDTO = talentTitleService.findOne(id);
        return ResponseUtil.wrapOrNotFound(talentTitleDTO);
    }

    /**
     * {@code DELETE  /talent-titles/:id} : delete the "id" talentTitle.
     *
     * @param id the id of the talentTitleDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/talent-titles/{id}")
    public ResponseEntity<Void> deleteTalentTitle(@PathVariable Long id) {
        log.debug("REST request to delete TalentTitle : {}", id);
        talentTitleService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
