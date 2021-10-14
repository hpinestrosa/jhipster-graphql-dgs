package com.openapi.jhipstergraphqldgs.web.rest;

import com.openapi.jhipstergraphqldgs.repository.LanguageRepository;
import com.openapi.jhipstergraphqldgs.service.LanguageService;
import com.openapi.jhipstergraphqldgs.service.dto.LanguageDTO;
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
 * REST controller for managing {@link com.openapi.jhipstergraphqldgs.domain.Language}.
 */
@RestController
@RequestMapping("/api")
public class LanguageResource {

    private final Logger log = LoggerFactory.getLogger(LanguageResource.class);

    private static final String ENTITY_NAME = "language";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final LanguageService languageService;

    private final LanguageRepository languageRepository;

    public LanguageResource(LanguageService languageService, LanguageRepository languageRepository) {
        this.languageService = languageService;
        this.languageRepository = languageRepository;
    }

    /**
     * {@code POST  /languages} : Create a new language.
     *
     * @param languageDTO the languageDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new languageDTO, or with status {@code 400 (Bad Request)} if the language has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/languages")
    public ResponseEntity<LanguageDTO> createLanguage(@Valid @RequestBody LanguageDTO languageDTO) throws URISyntaxException {
        log.debug("REST request to save Language : {}", languageDTO);
        if (languageDTO.getId() != null) {
            throw new BadRequestAlertException("A new language cannot already have an ID", ENTITY_NAME, "idexists");
        }
        LanguageDTO result = languageService.save(languageDTO);
        return ResponseEntity
            .created(new URI("/api/languages/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /languages/:id} : Updates an existing language.
     *
     * @param id the id of the languageDTO to save.
     * @param languageDTO the languageDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated languageDTO,
     * or with status {@code 400 (Bad Request)} if the languageDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the languageDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/languages/{id}")
    public ResponseEntity<LanguageDTO> updateLanguage(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody LanguageDTO languageDTO
    ) throws URISyntaxException {
        log.debug("REST request to update Language : {}, {}", id, languageDTO);
        if (languageDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, languageDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!languageRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        LanguageDTO result = languageService.save(languageDTO);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, languageDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /languages/:id} : Partial updates given fields of an existing language, field will ignore if it is null
     *
     * @param id the id of the languageDTO to save.
     * @param languageDTO the languageDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated languageDTO,
     * or with status {@code 400 (Bad Request)} if the languageDTO is not valid,
     * or with status {@code 404 (Not Found)} if the languageDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the languageDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/languages/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<LanguageDTO> partialUpdateLanguage(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody LanguageDTO languageDTO
    ) throws URISyntaxException {
        log.debug("REST request to partial update Language partially : {}, {}", id, languageDTO);
        if (languageDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, languageDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!languageRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<LanguageDTO> result = languageService.partialUpdate(languageDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, languageDTO.getId().toString())
        );
    }

    /**
     * {@code GET  /languages} : get all the languages.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of languages in body.
     */
    @GetMapping("/languages")
    public List<LanguageDTO> getAllLanguages() {
        log.debug("REST request to get all Languages");
        return languageService.findAll();
    }

    /**
     * {@code GET  /languages/:id} : get the "id" language.
     *
     * @param id the id of the languageDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the languageDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/languages/{id}")
    public ResponseEntity<LanguageDTO> getLanguage(@PathVariable Long id) {
        log.debug("REST request to get Language : {}", id);
        Optional<LanguageDTO> languageDTO = languageService.findOne(id);
        return ResponseUtil.wrapOrNotFound(languageDTO);
    }

    /**
     * {@code DELETE  /languages/:id} : delete the "id" language.
     *
     * @param id the id of the languageDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/languages/{id}")
    public ResponseEntity<Void> deleteLanguage(@PathVariable Long id) {
        log.debug("REST request to delete Language : {}", id);
        languageService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
