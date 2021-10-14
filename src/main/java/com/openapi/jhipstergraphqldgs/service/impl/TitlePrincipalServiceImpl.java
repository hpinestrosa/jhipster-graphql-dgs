package com.openapi.jhipstergraphqldgs.service.impl;

import com.openapi.jhipstergraphqldgs.domain.TitlePrincipal;
import com.openapi.jhipstergraphqldgs.repository.TitlePrincipalRepository;
import com.openapi.jhipstergraphqldgs.service.TitlePrincipalService;
import com.openapi.jhipstergraphqldgs.service.dto.TitlePrincipalDTO;
import com.openapi.jhipstergraphqldgs.service.mapper.TitlePrincipalMapper;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link TitlePrincipal}.
 */
@Service
@Transactional
public class TitlePrincipalServiceImpl implements TitlePrincipalService {

    private final Logger log = LoggerFactory.getLogger(TitlePrincipalServiceImpl.class);

    private final TitlePrincipalRepository titlePrincipalRepository;

    private final TitlePrincipalMapper titlePrincipalMapper;

    public TitlePrincipalServiceImpl(TitlePrincipalRepository titlePrincipalRepository, TitlePrincipalMapper titlePrincipalMapper) {
        this.titlePrincipalRepository = titlePrincipalRepository;
        this.titlePrincipalMapper = titlePrincipalMapper;
    }

    @Override
    public TitlePrincipalDTO save(TitlePrincipalDTO titlePrincipalDTO) {
        log.debug("Request to save TitlePrincipal : {}", titlePrincipalDTO);
        TitlePrincipal titlePrincipal = titlePrincipalMapper.toEntity(titlePrincipalDTO);
        titlePrincipal = titlePrincipalRepository.save(titlePrincipal);
        return titlePrincipalMapper.toDto(titlePrincipal);
    }

    @Override
    public Optional<TitlePrincipalDTO> partialUpdate(TitlePrincipalDTO titlePrincipalDTO) {
        log.debug("Request to partially update TitlePrincipal : {}", titlePrincipalDTO);

        return titlePrincipalRepository
            .findById(titlePrincipalDTO.getId())
            .map(existingTitlePrincipal -> {
                titlePrincipalMapper.partialUpdate(existingTitlePrincipal, titlePrincipalDTO);

                return existingTitlePrincipal;
            })
            .map(titlePrincipalRepository::save)
            .map(titlePrincipalMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public List<TitlePrincipalDTO> findAll() {
        log.debug("Request to get all TitlePrincipals");
        return titlePrincipalRepository
            .findAll()
            .stream()
            .map(titlePrincipalMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<TitlePrincipalDTO> findOne(Long id) {
        log.debug("Request to get TitlePrincipal : {}", id);
        return titlePrincipalRepository.findById(id).map(titlePrincipalMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete TitlePrincipal : {}", id);
        titlePrincipalRepository.deleteById(id);
    }
}
