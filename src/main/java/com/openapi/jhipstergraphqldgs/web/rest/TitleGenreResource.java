package com.openapi.jhipstergraphqldgs.web.rest;

import com.openapi.jhipstergraphqldgs.repository.TitleGenreRepository;
import com.openapi.jhipstergraphqldgs.service.TitleGenreService;
import com.openapi.jhipstergraphqldgs.service.dto.TitleGenreDTO;
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
 * REST controller for managing {@link com.openapi.jhipstergraphqldgs.domain.TitleGenre}.
 */
@RestController
@RequestMapping("/api")
public class TitleGenreResource {

    private final Logger log = LoggerFactory.getLogger(TitleGenreResource.class);

    private static final String ENTITY_NAME = "titleGenre";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TitleGenreService titleGenreService;

    private final TitleGenreRepository titleGenreRepository;

    public TitleGenreResource(TitleGenreService titleGenreService, TitleGenreRepository titleGenreRepository) {
        this.titleGenreService = titleGenreService;
        this.titleGenreRepository = titleGenreRepository;
    }

    /**
     * {@code POST  /title-genres} : Create a new titleGenre.
     *
     * @param titleGenreDTO the titleGenreDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new titleGenreDTO, or with status {@code 400 (Bad Request)} if the titleGenre has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/title-genres")
    public ResponseEntity<TitleGenreDTO> createTitleGenre(@Valid @RequestBody TitleGenreDTO titleGenreDTO) throws URISyntaxException {
        log.debug("REST request to save TitleGenre : {}", titleGenreDTO);
        if (titleGenreDTO.getId() != null) {
            throw new BadRequestAlertException("A new titleGenre cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TitleGenreDTO result = titleGenreService.save(titleGenreDTO);
        return ResponseEntity
            .created(new URI("/api/title-genres/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /title-genres/:id} : Updates an existing titleGenre.
     *
     * @param id the id of the titleGenreDTO to save.
     * @param titleGenreDTO the titleGenreDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated titleGenreDTO,
     * or with status {@code 400 (Bad Request)} if the titleGenreDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the titleGenreDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/title-genres/{id}")
    public ResponseEntity<TitleGenreDTO> updateTitleGenre(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody TitleGenreDTO titleGenreDTO
    ) throws URISyntaxException {
        log.debug("REST request to update TitleGenre : {}, {}", id, titleGenreDTO);
        if (titleGenreDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, titleGenreDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!titleGenreRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        TitleGenreDTO result = titleGenreService.save(titleGenreDTO);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, titleGenreDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /title-genres/:id} : Partial updates given fields of an existing titleGenre, field will ignore if it is null
     *
     * @param id the id of the titleGenreDTO to save.
     * @param titleGenreDTO the titleGenreDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated titleGenreDTO,
     * or with status {@code 400 (Bad Request)} if the titleGenreDTO is not valid,
     * or with status {@code 404 (Not Found)} if the titleGenreDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the titleGenreDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/title-genres/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<TitleGenreDTO> partialUpdateTitleGenre(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody TitleGenreDTO titleGenreDTO
    ) throws URISyntaxException {
        log.debug("REST request to partial update TitleGenre partially : {}, {}", id, titleGenreDTO);
        if (titleGenreDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, titleGenreDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!titleGenreRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<TitleGenreDTO> result = titleGenreService.partialUpdate(titleGenreDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, titleGenreDTO.getId().toString())
        );
    }

    /**
     * {@code GET  /title-genres} : get all the titleGenres.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of titleGenres in body.
     */
    @GetMapping("/title-genres")
    public List<TitleGenreDTO> getAllTitleGenres() {
        log.debug("REST request to get all TitleGenres");
        return titleGenreService.findAll();
    }

    /**
     * {@code GET  /title-genres/:id} : get the "id" titleGenre.
     *
     * @param id the id of the titleGenreDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the titleGenreDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/title-genres/{id}")
    public ResponseEntity<TitleGenreDTO> getTitleGenre(@PathVariable Long id) {
        log.debug("REST request to get TitleGenre : {}", id);
        Optional<TitleGenreDTO> titleGenreDTO = titleGenreService.findOne(id);
        return ResponseUtil.wrapOrNotFound(titleGenreDTO);
    }

    /**
     * {@code DELETE  /title-genres/:id} : delete the "id" titleGenre.
     *
     * @param id the id of the titleGenreDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/title-genres/{id}")
    public ResponseEntity<Void> deleteTitleGenre(@PathVariable Long id) {
        log.debug("REST request to delete TitleGenre : {}", id);
        titleGenreService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
