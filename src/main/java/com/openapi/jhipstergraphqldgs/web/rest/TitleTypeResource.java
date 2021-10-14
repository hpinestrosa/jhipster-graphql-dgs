package com.openapi.jhipstergraphqldgs.web.rest;

import com.openapi.jhipstergraphqldgs.repository.TitleTypeRepository;
import com.openapi.jhipstergraphqldgs.service.TitleTypeService;
import com.openapi.jhipstergraphqldgs.service.dto.TitleTypeDTO;
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
 * REST controller for managing {@link com.openapi.jhipstergraphqldgs.domain.TitleType}.
 */
@RestController
@RequestMapping("/api")
public class TitleTypeResource {

    private final Logger log = LoggerFactory.getLogger(TitleTypeResource.class);

    private static final String ENTITY_NAME = "titleType";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TitleTypeService titleTypeService;

    private final TitleTypeRepository titleTypeRepository;

    public TitleTypeResource(TitleTypeService titleTypeService, TitleTypeRepository titleTypeRepository) {
        this.titleTypeService = titleTypeService;
        this.titleTypeRepository = titleTypeRepository;
    }

    /**
     * {@code POST  /title-types} : Create a new titleType.
     *
     * @param titleTypeDTO the titleTypeDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new titleTypeDTO, or with status {@code 400 (Bad Request)} if the titleType has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/title-types")
    public ResponseEntity<TitleTypeDTO> createTitleType(@Valid @RequestBody TitleTypeDTO titleTypeDTO) throws URISyntaxException {
        log.debug("REST request to save TitleType : {}", titleTypeDTO);
        if (titleTypeDTO.getId() != null) {
            throw new BadRequestAlertException("A new titleType cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TitleTypeDTO result = titleTypeService.save(titleTypeDTO);
        return ResponseEntity
            .created(new URI("/api/title-types/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /title-types/:id} : Updates an existing titleType.
     *
     * @param id the id of the titleTypeDTO to save.
     * @param titleTypeDTO the titleTypeDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated titleTypeDTO,
     * or with status {@code 400 (Bad Request)} if the titleTypeDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the titleTypeDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/title-types/{id}")
    public ResponseEntity<TitleTypeDTO> updateTitleType(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody TitleTypeDTO titleTypeDTO
    ) throws URISyntaxException {
        log.debug("REST request to update TitleType : {}, {}", id, titleTypeDTO);
        if (titleTypeDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, titleTypeDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!titleTypeRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        TitleTypeDTO result = titleTypeService.save(titleTypeDTO);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, titleTypeDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /title-types/:id} : Partial updates given fields of an existing titleType, field will ignore if it is null
     *
     * @param id the id of the titleTypeDTO to save.
     * @param titleTypeDTO the titleTypeDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated titleTypeDTO,
     * or with status {@code 400 (Bad Request)} if the titleTypeDTO is not valid,
     * or with status {@code 404 (Not Found)} if the titleTypeDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the titleTypeDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/title-types/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<TitleTypeDTO> partialUpdateTitleType(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody TitleTypeDTO titleTypeDTO
    ) throws URISyntaxException {
        log.debug("REST request to partial update TitleType partially : {}, {}", id, titleTypeDTO);
        if (titleTypeDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, titleTypeDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!titleTypeRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<TitleTypeDTO> result = titleTypeService.partialUpdate(titleTypeDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, titleTypeDTO.getId().toString())
        );
    }

    /**
     * {@code GET  /title-types} : get all the titleTypes.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of titleTypes in body.
     */
    @GetMapping("/title-types")
    public List<TitleTypeDTO> getAllTitleTypes() {
        log.debug("REST request to get all TitleTypes");
        return titleTypeService.findAll();
    }

    /**
     * {@code GET  /title-types/:id} : get the "id" titleType.
     *
     * @param id the id of the titleTypeDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the titleTypeDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/title-types/{id}")
    public ResponseEntity<TitleTypeDTO> getTitleType(@PathVariable Long id) {
        log.debug("REST request to get TitleType : {}", id);
        Optional<TitleTypeDTO> titleTypeDTO = titleTypeService.findOne(id);
        return ResponseUtil.wrapOrNotFound(titleTypeDTO);
    }

    /**
     * {@code DELETE  /title-types/:id} : delete the "id" titleType.
     *
     * @param id the id of the titleTypeDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/title-types/{id}")
    public ResponseEntity<Void> deleteTitleType(@PathVariable Long id) {
        log.debug("REST request to delete TitleType : {}", id);
        titleTypeService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
