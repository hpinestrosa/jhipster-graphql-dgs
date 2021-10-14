package com.openapi.jhipstergraphqldgs.web.rest;

import com.openapi.jhipstergraphqldgs.repository.TitlePrincipalRepository;
import com.openapi.jhipstergraphqldgs.service.TitlePrincipalService;
import com.openapi.jhipstergraphqldgs.service.dto.TitlePrincipalDTO;
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
 * REST controller for managing {@link com.openapi.jhipstergraphqldgs.domain.TitlePrincipal}.
 */
@RestController
@RequestMapping("/api")
public class TitlePrincipalResource {

    private final Logger log = LoggerFactory.getLogger(TitlePrincipalResource.class);

    private static final String ENTITY_NAME = "titlePrincipal";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TitlePrincipalService titlePrincipalService;

    private final TitlePrincipalRepository titlePrincipalRepository;

    public TitlePrincipalResource(TitlePrincipalService titlePrincipalService, TitlePrincipalRepository titlePrincipalRepository) {
        this.titlePrincipalService = titlePrincipalService;
        this.titlePrincipalRepository = titlePrincipalRepository;
    }

    /**
     * {@code POST  /title-principals} : Create a new titlePrincipal.
     *
     * @param titlePrincipalDTO the titlePrincipalDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new titlePrincipalDTO, or with status {@code 400 (Bad Request)} if the titlePrincipal has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/title-principals")
    public ResponseEntity<TitlePrincipalDTO> createTitlePrincipal(@Valid @RequestBody TitlePrincipalDTO titlePrincipalDTO)
        throws URISyntaxException {
        log.debug("REST request to save TitlePrincipal : {}", titlePrincipalDTO);
        if (titlePrincipalDTO.getId() != null) {
            throw new BadRequestAlertException("A new titlePrincipal cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TitlePrincipalDTO result = titlePrincipalService.save(titlePrincipalDTO);
        return ResponseEntity
            .created(new URI("/api/title-principals/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /title-principals/:id} : Updates an existing titlePrincipal.
     *
     * @param id the id of the titlePrincipalDTO to save.
     * @param titlePrincipalDTO the titlePrincipalDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated titlePrincipalDTO,
     * or with status {@code 400 (Bad Request)} if the titlePrincipalDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the titlePrincipalDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/title-principals/{id}")
    public ResponseEntity<TitlePrincipalDTO> updateTitlePrincipal(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody TitlePrincipalDTO titlePrincipalDTO
    ) throws URISyntaxException {
        log.debug("REST request to update TitlePrincipal : {}, {}", id, titlePrincipalDTO);
        if (titlePrincipalDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, titlePrincipalDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!titlePrincipalRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        TitlePrincipalDTO result = titlePrincipalService.save(titlePrincipalDTO);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, titlePrincipalDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /title-principals/:id} : Partial updates given fields of an existing titlePrincipal, field will ignore if it is null
     *
     * @param id the id of the titlePrincipalDTO to save.
     * @param titlePrincipalDTO the titlePrincipalDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated titlePrincipalDTO,
     * or with status {@code 400 (Bad Request)} if the titlePrincipalDTO is not valid,
     * or with status {@code 404 (Not Found)} if the titlePrincipalDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the titlePrincipalDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/title-principals/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<TitlePrincipalDTO> partialUpdateTitlePrincipal(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody TitlePrincipalDTO titlePrincipalDTO
    ) throws URISyntaxException {
        log.debug("REST request to partial update TitlePrincipal partially : {}, {}", id, titlePrincipalDTO);
        if (titlePrincipalDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, titlePrincipalDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!titlePrincipalRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<TitlePrincipalDTO> result = titlePrincipalService.partialUpdate(titlePrincipalDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, titlePrincipalDTO.getId().toString())
        );
    }

    /**
     * {@code GET  /title-principals} : get all the titlePrincipals.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of titlePrincipals in body.
     */
    @GetMapping("/title-principals")
    public List<TitlePrincipalDTO> getAllTitlePrincipals() {
        log.debug("REST request to get all TitlePrincipals");
        return titlePrincipalService.findAll();
    }

    /**
     * {@code GET  /title-principals/:id} : get the "id" titlePrincipal.
     *
     * @param id the id of the titlePrincipalDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the titlePrincipalDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/title-principals/{id}")
    public ResponseEntity<TitlePrincipalDTO> getTitlePrincipal(@PathVariable Long id) {
        log.debug("REST request to get TitlePrincipal : {}", id);
        Optional<TitlePrincipalDTO> titlePrincipalDTO = titlePrincipalService.findOne(id);
        return ResponseUtil.wrapOrNotFound(titlePrincipalDTO);
    }

    /**
     * {@code DELETE  /title-principals/:id} : delete the "id" titlePrincipal.
     *
     * @param id the id of the titlePrincipalDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/title-principals/{id}")
    public ResponseEntity<Void> deleteTitlePrincipal(@PathVariable Long id) {
        log.debug("REST request to delete TitlePrincipal : {}", id);
        titlePrincipalService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
