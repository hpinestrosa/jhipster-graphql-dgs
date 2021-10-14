package com.openapi.jhipstergraphqldgs.service;

import com.openapi.jhipstergraphqldgs.domain.TitleType;
import com.openapi.jhipstergraphqldgs.repository.TitleTypeRepository;
import com.openapi.jhipstergraphqldgs.service.dto.TitleTypeDTO;
import com.openapi.jhipstergraphqldgs.service.mapper.TitleTypeMapper;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link TitleType}.
 */
@Service
@Transactional
public class TitleTypeService {

    private final Logger log = LoggerFactory.getLogger(TitleTypeService.class);

    private final TitleTypeRepository titleTypeRepository;

    private final TitleTypeMapper titleTypeMapper;

    public TitleTypeService(TitleTypeRepository titleTypeRepository, TitleTypeMapper titleTypeMapper) {
        this.titleTypeRepository = titleTypeRepository;
        this.titleTypeMapper = titleTypeMapper;
    }

    /**
     * Save a titleType.
     *
     * @param titleTypeDTO the entity to save.
     * @return the persisted entity.
     */
    public TitleTypeDTO save(TitleTypeDTO titleTypeDTO) {
        log.debug("Request to save TitleType : {}", titleTypeDTO);
        TitleType titleType = titleTypeMapper.toEntity(titleTypeDTO);
        titleType = titleTypeRepository.save(titleType);
        return titleTypeMapper.toDto(titleType);
    }

    /**
     * Partially update a titleType.
     *
     * @param titleTypeDTO the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<TitleTypeDTO> partialUpdate(TitleTypeDTO titleTypeDTO) {
        log.debug("Request to partially update TitleType : {}", titleTypeDTO);

        return titleTypeRepository
            .findById(titleTypeDTO.getId())
            .map(existingTitleType -> {
                titleTypeMapper.partialUpdate(existingTitleType, titleTypeDTO);

                return existingTitleType;
            })
            .map(titleTypeRepository::save)
            .map(titleTypeMapper::toDto);
    }

    /**
     * Get all the titleTypes.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<TitleTypeDTO> findAll() {
        log.debug("Request to get all TitleTypes");
        return titleTypeRepository.findAll().stream().map(titleTypeMapper::toDto).collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one titleType by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<TitleTypeDTO> findOne(Long id) {
        log.debug("Request to get TitleType : {}", id);
        return titleTypeRepository.findById(id).map(titleTypeMapper::toDto);
    }

    /**
     * Delete the titleType by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete TitleType : {}", id);
        titleTypeRepository.deleteById(id);
    }
}
