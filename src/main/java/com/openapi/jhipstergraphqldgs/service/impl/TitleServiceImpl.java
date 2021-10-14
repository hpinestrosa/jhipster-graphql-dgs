package com.openapi.jhipstergraphqldgs.service.impl;

import com.openapi.jhipstergraphqldgs.domain.Title;
import com.openapi.jhipstergraphqldgs.repository.TitleRepository;
import com.openapi.jhipstergraphqldgs.service.TitleService;
import com.openapi.jhipstergraphqldgs.service.dto.TitleDTO;
import com.openapi.jhipstergraphqldgs.service.mapper.TitleMapper;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Title}.
 */
@Service
@Transactional
public class TitleServiceImpl implements TitleService {

    private final Logger log = LoggerFactory.getLogger(TitleServiceImpl.class);

    private final TitleRepository titleRepository;

    private final TitleMapper titleMapper;

    public TitleServiceImpl(TitleRepository titleRepository, TitleMapper titleMapper) {
        this.titleRepository = titleRepository;
        this.titleMapper = titleMapper;
    }

    @Override
    public TitleDTO save(TitleDTO titleDTO) {
        log.debug("Request to save Title : {}", titleDTO);
        Title title = titleMapper.toEntity(titleDTO);
        title = titleRepository.save(title);
        return titleMapper.toDto(title);
    }

    @Override
    public Optional<TitleDTO> partialUpdate(TitleDTO titleDTO) {
        log.debug("Request to partially update Title : {}", titleDTO);

        return titleRepository
            .findById(titleDTO.getId())
            .map(existingTitle -> {
                titleMapper.partialUpdate(existingTitle, titleDTO);

                return existingTitle;
            })
            .map(titleRepository::save)
            .map(titleMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<TitleDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Titles");
        return titleRepository.findAll(pageable).map(titleMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<TitleDTO> findOne(Long id) {
        log.debug("Request to get Title : {}", id);
        return titleRepository.findById(id).map(titleMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Title : {}", id);
        titleRepository.deleteById(id);
    }
}
