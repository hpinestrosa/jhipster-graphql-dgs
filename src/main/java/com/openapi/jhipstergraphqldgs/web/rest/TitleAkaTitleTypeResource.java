package com.openapi.jhipstergraphqldgs.web.rest;

import com.openapi.jhipstergraphqldgs.repository.TitleAkaTitleTypeRepository;
import com.openapi.jhipstergraphqldgs.service.TitleAkaTitleTypeService;
import com.openapi.jhipstergraphqldgs.service.dto.TitleAkaTitleTypeDTO;
import com.openapi.jhipstergraphqldgs.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.openapi.jhipstergraphqldgs.domain.TitleAkaTitleType}.
 */
@RestController
@RequestMapping("/api")
public class TitleAkaTitleTypeResource {

    private final Logger log = LoggerFactory.getLogger(TitleAkaTitleTypeResource.class);

    private static final String ENTITY_NAME = "titleAkaTitleType";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TitleAkaTitleTypeService titleAkaTitleTypeService;

    private final TitleAkaTitleTypeRepository titleAkaTitleTypeRepository;

    public TitleAkaTitleTypeResource(
        TitleAkaTitleTypeService titleAkaTitleTypeService,
        TitleAkaTitleTypeRepository titleAkaTitleTypeRepository
    ) {
        this.titleAkaTitleTypeService = titleAkaTitleTypeService;
        this.titleAkaTitleTypeRepository = titleAkaTitleTypeRepository;
    }

    /**
     * {@code POST  /title-aka-title-types} : Create a new titleAkaTitleType.
     *
     * @param titleAkaTitleTypeDTO the titleAkaTitleTypeDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new titleAkaTitleTypeDTO, or with status {@code 400 (Bad Request)} if the titleAkaTitleType has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/title-aka-title-types")
    public ResponseEntity<TitleAkaTitleTypeDTO> createTitleAkaTitleType(@RequestBody TitleAkaTitleTypeDTO titleAkaTitleTypeDTO)
        throws URISyntaxException {
        log.debug("REST request to save TitleAkaTitleType : {}", titleAkaTitleTypeDTO);
        if (titleAkaTitleTypeDTO.getId() != null) {
            throw new BadRequestAlertException("A new titleAkaTitleType cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TitleAkaTitleTypeDTO result = titleAkaTitleTypeService.save(titleAkaTitleTypeDTO);
        return ResponseEntity
            .created(new URI("/api/title-aka-title-types/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /title-aka-title-types/:id} : Updates an existing titleAkaTitleType.
     *
     * @param id the id of the titleAkaTitleTypeDTO to save.
     * @param titleAkaTitleTypeDTO the titleAkaTitleTypeDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated titleAkaTitleTypeDTO,
     * or with status {@code 400 (Bad Request)} if the titleAkaTitleTypeDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the titleAkaTitleTypeDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/title-aka-title-types/{id}")
    public ResponseEntity<TitleAkaTitleTypeDTO> updateTitleAkaTitleType(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody TitleAkaTitleTypeDTO titleAkaTitleTypeDTO
    ) throws URISyntaxException {
        log.debug("REST request to update TitleAkaTitleType : {}, {}", id, titleAkaTitleTypeDTO);
        if (titleAkaTitleTypeDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, titleAkaTitleTypeDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!titleAkaTitleTypeRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        TitleAkaTitleTypeDTO result = titleAkaTitleTypeService.save(titleAkaTitleTypeDTO);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, titleAkaTitleTypeDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /title-aka-title-types/:id} : Partial updates given fields of an existing titleAkaTitleType, field will ignore if it is null
     *
     * @param id the id of the titleAkaTitleTypeDTO to save.
     * @param titleAkaTitleTypeDTO the titleAkaTitleTypeDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated titleAkaTitleTypeDTO,
     * or with status {@code 400 (Bad Request)} if the titleAkaTitleTypeDTO is not valid,
     * or with status {@code 404 (Not Found)} if the titleAkaTitleTypeDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the titleAkaTitleTypeDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/title-aka-title-types/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<TitleAkaTitleTypeDTO> partialUpdateTitleAkaTitleType(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody TitleAkaTitleTypeDTO titleAkaTitleTypeDTO
    ) throws URISyntaxException {
        log.debug("REST request to partial update TitleAkaTitleType partially : {}, {}", id, titleAkaTitleTypeDTO);
        if (titleAkaTitleTypeDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, titleAkaTitleTypeDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!titleAkaTitleTypeRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<TitleAkaTitleTypeDTO> result = titleAkaTitleTypeService.partialUpdate(titleAkaTitleTypeDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, titleAkaTitleTypeDTO.getId().toString())
        );
    }

    /**
     * {@code GET  /title-aka-title-types} : get all the titleAkaTitleTypes.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of titleAkaTitleTypes in body.
     */
    @GetMapping("/title-aka-title-types")
    public List<TitleAkaTitleTypeDTO> getAllTitleAkaTitleTypes() {
        log.debug("REST request to get all TitleAkaTitleTypes");
        return titleAkaTitleTypeService.findAll();
    }

    /**
     * {@code GET  /title-aka-title-types/:id} : get the "id" titleAkaTitleType.
     *
     * @param id the id of the titleAkaTitleTypeDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the titleAkaTitleTypeDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/title-aka-title-types/{id}")
    public ResponseEntity<TitleAkaTitleTypeDTO> getTitleAkaTitleType(@PathVariable Long id) {
        log.debug("REST request to get TitleAkaTitleType : {}", id);
        Optional<TitleAkaTitleTypeDTO> titleAkaTitleTypeDTO = titleAkaTitleTypeService.findOne(id);
        return ResponseUtil.wrapOrNotFound(titleAkaTitleTypeDTO);
    }

    /**
     * {@code DELETE  /title-aka-title-types/:id} : delete the "id" titleAkaTitleType.
     *
     * @param id the id of the titleAkaTitleTypeDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/title-aka-title-types/{id}")
    public ResponseEntity<Void> deleteTitleAkaTitleType(@PathVariable Long id) {
        log.debug("REST request to delete TitleAkaTitleType : {}", id);
        titleAkaTitleTypeService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
