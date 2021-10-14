package com.openapi.jhipstergraphqldgs.web.rest;

import com.openapi.jhipstergraphqldgs.repository.TitleEpisodeRepository;
import com.openapi.jhipstergraphqldgs.service.TitleEpisodeService;
import com.openapi.jhipstergraphqldgs.service.dto.TitleEpisodeDTO;
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
 * REST controller for managing {@link com.openapi.jhipstergraphqldgs.domain.TitleEpisode}.
 */
@RestController
@RequestMapping("/api")
public class TitleEpisodeResource {

    private final Logger log = LoggerFactory.getLogger(TitleEpisodeResource.class);

    private static final String ENTITY_NAME = "titleEpisode";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TitleEpisodeService titleEpisodeService;

    private final TitleEpisodeRepository titleEpisodeRepository;

    public TitleEpisodeResource(TitleEpisodeService titleEpisodeService, TitleEpisodeRepository titleEpisodeRepository) {
        this.titleEpisodeService = titleEpisodeService;
        this.titleEpisodeRepository = titleEpisodeRepository;
    }

    /**
     * {@code POST  /title-episodes} : Create a new titleEpisode.
     *
     * @param titleEpisodeDTO the titleEpisodeDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new titleEpisodeDTO, or with status {@code 400 (Bad Request)} if the titleEpisode has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/title-episodes")
    public ResponseEntity<TitleEpisodeDTO> createTitleEpisode(@Valid @RequestBody TitleEpisodeDTO titleEpisodeDTO)
        throws URISyntaxException {
        log.debug("REST request to save TitleEpisode : {}", titleEpisodeDTO);
        if (titleEpisodeDTO.getId() != null) {
            throw new BadRequestAlertException("A new titleEpisode cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TitleEpisodeDTO result = titleEpisodeService.save(titleEpisodeDTO);
        return ResponseEntity
            .created(new URI("/api/title-episodes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /title-episodes/:id} : Updates an existing titleEpisode.
     *
     * @param id the id of the titleEpisodeDTO to save.
     * @param titleEpisodeDTO the titleEpisodeDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated titleEpisodeDTO,
     * or with status {@code 400 (Bad Request)} if the titleEpisodeDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the titleEpisodeDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/title-episodes/{id}")
    public ResponseEntity<TitleEpisodeDTO> updateTitleEpisode(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody TitleEpisodeDTO titleEpisodeDTO
    ) throws URISyntaxException {
        log.debug("REST request to update TitleEpisode : {}, {}", id, titleEpisodeDTO);
        if (titleEpisodeDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, titleEpisodeDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!titleEpisodeRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        TitleEpisodeDTO result = titleEpisodeService.save(titleEpisodeDTO);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, titleEpisodeDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /title-episodes/:id} : Partial updates given fields of an existing titleEpisode, field will ignore if it is null
     *
     * @param id the id of the titleEpisodeDTO to save.
     * @param titleEpisodeDTO the titleEpisodeDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated titleEpisodeDTO,
     * or with status {@code 400 (Bad Request)} if the titleEpisodeDTO is not valid,
     * or with status {@code 404 (Not Found)} if the titleEpisodeDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the titleEpisodeDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/title-episodes/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<TitleEpisodeDTO> partialUpdateTitleEpisode(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody TitleEpisodeDTO titleEpisodeDTO
    ) throws URISyntaxException {
        log.debug("REST request to partial update TitleEpisode partially : {}, {}", id, titleEpisodeDTO);
        if (titleEpisodeDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, titleEpisodeDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!titleEpisodeRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<TitleEpisodeDTO> result = titleEpisodeService.partialUpdate(titleEpisodeDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, titleEpisodeDTO.getId().toString())
        );
    }

    /**
     * {@code GET  /title-episodes} : get all the titleEpisodes.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of titleEpisodes in body.
     */
    @GetMapping("/title-episodes")
    public ResponseEntity<List<TitleEpisodeDTO>> getAllTitleEpisodes(Pageable pageable) {
        log.debug("REST request to get a page of TitleEpisodes");
        Page<TitleEpisodeDTO> page = titleEpisodeService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /title-episodes/:id} : get the "id" titleEpisode.
     *
     * @param id the id of the titleEpisodeDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the titleEpisodeDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/title-episodes/{id}")
    public ResponseEntity<TitleEpisodeDTO> getTitleEpisode(@PathVariable Long id) {
        log.debug("REST request to get TitleEpisode : {}", id);
        Optional<TitleEpisodeDTO> titleEpisodeDTO = titleEpisodeService.findOne(id);
        return ResponseUtil.wrapOrNotFound(titleEpisodeDTO);
    }

    /**
     * {@code DELETE  /title-episodes/:id} : delete the "id" titleEpisode.
     *
     * @param id the id of the titleEpisodeDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/title-episodes/{id}")
    public ResponseEntity<Void> deleteTitleEpisode(@PathVariable Long id) {
        log.debug("REST request to delete TitleEpisode : {}", id);
        titleEpisodeService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
