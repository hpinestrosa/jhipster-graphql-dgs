package com.openapi.jhipstergraphqldgs.service.impl;

import com.openapi.jhipstergraphqldgs.domain.TitleAkaTitleType;
import com.openapi.jhipstergraphqldgs.repository.TitleAkaTitleTypeRepository;
import com.openapi.jhipstergraphqldgs.service.TitleAkaTitleTypeService;
import com.openapi.jhipstergraphqldgs.service.dto.TitleAkaTitleTypeDTO;
import com.openapi.jhipstergraphqldgs.service.mapper.TitleAkaTitleTypeMapper;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link TitleAkaTitleType}.
 */
@Service
@Transactional
public class TitleAkaTitleTypeServiceImpl implements TitleAkaTitleTypeService {

    private final Logger log = LoggerFactory.getLogger(TitleAkaTitleTypeServiceImpl.class);

    private final TitleAkaTitleTypeRepository titleAkaTitleTypeRepository;

    private final TitleAkaTitleTypeMapper titleAkaTitleTypeMapper;

    public TitleAkaTitleTypeServiceImpl(
        TitleAkaTitleTypeRepository titleAkaTitleTypeRepository,
        TitleAkaTitleTypeMapper titleAkaTitleTypeMapper
    ) {
        this.titleAkaTitleTypeRepository = titleAkaTitleTypeRepository;
        this.titleAkaTitleTypeMapper = titleAkaTitleTypeMapper;
    }

    @Override
    public TitleAkaTitleTypeDTO save(TitleAkaTitleTypeDTO titleAkaTitleTypeDTO) {
        log.debug("Request to save TitleAkaTitleType : {}", titleAkaTitleTypeDTO);
        TitleAkaTitleType titleAkaTitleType = titleAkaTitleTypeMapper.toEntity(titleAkaTitleTypeDTO);
        titleAkaTitleType = titleAkaTitleTypeRepository.save(titleAkaTitleType);
        return titleAkaTitleTypeMapper.toDto(titleAkaTitleType);
    }

    @Override
    public Optional<TitleAkaTitleTypeDTO> partialUpdate(TitleAkaTitleTypeDTO titleAkaTitleTypeDTO) {
        log.debug("Request to partially update TitleAkaTitleType : {}", titleAkaTitleTypeDTO);

        return titleAkaTitleTypeRepository
            .findById(titleAkaTitleTypeDTO.getId())
            .map(existingTitleAkaTitleType -> {
                titleAkaTitleTypeMapper.partialUpdate(existingTitleAkaTitleType, titleAkaTitleTypeDTO);

                return existingTitleAkaTitleType;
            })
            .map(titleAkaTitleTypeRepository::save)
            .map(titleAkaTitleTypeMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public List<TitleAkaTitleTypeDTO> findAll() {
        log.debug("Request to get all TitleAkaTitleTypes");
        return titleAkaTitleTypeRepository
            .findAll()
            .stream()
            .map(titleAkaTitleTypeMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<TitleAkaTitleTypeDTO> findOne(Long id) {
        log.debug("Request to get TitleAkaTitleType : {}", id);
        return titleAkaTitleTypeRepository.findById(id).map(titleAkaTitleTypeMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete TitleAkaTitleType : {}", id);
        titleAkaTitleTypeRepository.deleteById(id);
    }
}
