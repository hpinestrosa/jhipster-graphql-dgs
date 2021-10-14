package com.openapi.jhipstergraphqldgs.web.rest;

import com.openapi.jhipstergraphqldgs.repository.TitleAkaRepository;
import com.openapi.jhipstergraphqldgs.service.TitleAkaService;
import com.openapi.jhipstergraphqldgs.service.dto.TitleAkaDTO;
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
 * REST controller for managing {@link com.openapi.jhipstergraphqldgs.domain.TitleAka}.
 */
@RestController
@RequestMapping("/api")
public class TitleAkaResource {

    private final Logger log = LoggerFactory.getLogger(TitleAkaResource.class);

    private static final String ENTITY_NAME = "titleAka";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TitleAkaService titleAkaService;

    private final TitleAkaRepository titleAkaRepository;

    public TitleAkaResource(TitleAkaService titleAkaService, TitleAkaRepository titleAkaRepository) {
        this.titleAkaService = titleAkaService;
        this.titleAkaRepository = titleAkaRepository;
    }

    /**
     * {@code POST  /title-akas} : Create a new titleAka.
     *
     * @param titleAkaDTO the titleAkaDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new titleAkaDTO, or with status {@code 400 (Bad Request)} if the titleAka has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/title-akas")
    public ResponseEntity<TitleAkaDTO> createTitleAka(@Valid @RequestBody TitleAkaDTO titleAkaDTO) throws URISyntaxException {
        log.debug("REST request to save TitleAka : {}", titleAkaDTO);
        if (titleAkaDTO.getId() != null) {
            throw new BadRequestAlertException("A new titleAka cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TitleAkaDTO result = titleAkaService.save(titleAkaDTO);
        return ResponseEntity
            .created(new URI("/api/title-akas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /title-akas/:id} : Updates an existing titleAka.
     *
     * @param id the id of the titleAkaDTO to save.
     * @param titleAkaDTO the titleAkaDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated titleAkaDTO,
     * or with status {@code 400 (Bad Request)} if the titleAkaDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the titleAkaDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/title-akas/{id}")
    public ResponseEntity<TitleAkaDTO> updateTitleAka(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody TitleAkaDTO titleAkaDTO
    ) throws URISyntaxException {
        log.debug("REST request to update TitleAka : {}, {}", id, titleAkaDTO);
        if (titleAkaDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, titleAkaDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!titleAkaRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        TitleAkaDTO result = titleAkaService.save(titleAkaDTO);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, titleAkaDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /title-akas/:id} : Partial updates given fields of an existing titleAka, field will ignore if it is null
     *
     * @param id the id of the titleAkaDTO to save.
     * @param titleAkaDTO the titleAkaDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated titleAkaDTO,
     * or with status {@code 400 (Bad Request)} if the titleAkaDTO is not valid,
     * or with status {@code 404 (Not Found)} if the titleAkaDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the titleAkaDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/title-akas/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<TitleAkaDTO> partialUpdateTitleAka(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody TitleAkaDTO titleAkaDTO
    ) throws URISyntaxException {
        log.debug("REST request to partial update TitleAka partially : {}, {}", id, titleAkaDTO);
        if (titleAkaDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, titleAkaDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!titleAkaRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<TitleAkaDTO> result = titleAkaService.partialUpdate(titleAkaDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, titleAkaDTO.getId().toString())
        );
    }

    /**
     * {@code GET  /title-akas} : get all the titleAkas.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of titleAkas in body.
     */
    @GetMapping("/title-akas")
    public List<TitleAkaDTO> getAllTitleAkas() {
        log.debug("REST request to get all TitleAkas");
        return titleAkaService.findAll();
    }

    /**
     * {@code GET  /title-akas/:id} : get the "id" titleAka.
     *
     * @param id the id of the titleAkaDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the titleAkaDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/title-akas/{id}")
    public ResponseEntity<TitleAkaDTO> getTitleAka(@PathVariable Long id) {
        log.debug("REST request to get TitleAka : {}", id);
        Optional<TitleAkaDTO> titleAkaDTO = titleAkaService.findOne(id);
        return ResponseUtil.wrapOrNotFound(titleAkaDTO);
    }

    /**
     * {@code DELETE  /title-akas/:id} : delete the "id" titleAka.
     *
     * @param id the id of the titleAkaDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/title-akas/{id}")
    public ResponseEntity<Void> deleteTitleAka(@PathVariable Long id) {
        log.debug("REST request to delete TitleAka : {}", id);
        titleAkaService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
