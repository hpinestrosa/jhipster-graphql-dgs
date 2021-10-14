package com.openapi.jhipstergraphqldgs.service;

import com.openapi.jhipstergraphqldgs.domain.ContentType;
import com.openapi.jhipstergraphqldgs.repository.ContentTypeRepository;
import com.openapi.jhipstergraphqldgs.service.dto.ContentTypeDTO;
import com.openapi.jhipstergraphqldgs.service.mapper.ContentTypeMapper;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link ContentType}.
 */
@Service
@Transactional
public class ContentTypeService {

    private final Logger log = LoggerFactory.getLogger(ContentTypeService.class);

    private final ContentTypeRepository contentTypeRepository;

    private final ContentTypeMapper contentTypeMapper;

    public ContentTypeService(ContentTypeRepository contentTypeRepository, ContentTypeMapper contentTypeMapper) {
        this.contentTypeRepository = contentTypeRepository;
        this.contentTypeMapper = contentTypeMapper;
    }

    /**
     * Save a contentType.
     *
     * @param contentTypeDTO the entity to save.
     * @return the persisted entity.
     */
    public ContentTypeDTO save(ContentTypeDTO contentTypeDTO) {
        log.debug("Request to save ContentType : {}", contentTypeDTO);
        ContentType contentType = contentTypeMapper.toEntity(contentTypeDTO);
        contentType = contentTypeRepository.save(contentType);
        return contentTypeMapper.toDto(contentType);
    }

    /**
     * Partially update a contentType.
     *
     * @param contentTypeDTO the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<ContentTypeDTO> partialUpdate(ContentTypeDTO contentTypeDTO) {
        log.debug("Request to partially update ContentType : {}", contentTypeDTO);

        return contentTypeRepository
            .findById(contentTypeDTO.getId())
            .map(existingContentType -> {
                contentTypeMapper.partialUpdate(existingContentType, contentTypeDTO);

                return existingContentType;
            })
            .map(contentTypeRepository::save)
            .map(contentTypeMapper::toDto);
    }

    /**
     * Get all the contentTypes.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<ContentTypeDTO> findAll() {
        log.debug("Request to get all ContentTypes");
        return contentTypeRepository.findAll().stream().map(contentTypeMapper::toDto).collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one contentType by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<ContentTypeDTO> findOne(Long id) {
        log.debug("Request to get ContentType : {}", id);
        return contentTypeRepository.findById(id).map(contentTypeMapper::toDto);
    }

    /**
     * Delete the contentType by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete ContentType : {}", id);
        contentTypeRepository.deleteById(id);
    }
}
