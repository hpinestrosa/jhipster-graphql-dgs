package com.openapi.jhipstergraphqldgs.service.impl;

import com.openapi.jhipstergraphqldgs.domain.TitleAka;
import com.openapi.jhipstergraphqldgs.repository.TitleAkaRepository;
import com.openapi.jhipstergraphqldgs.service.TitleAkaService;
import com.openapi.jhipstergraphqldgs.service.dto.TitleAkaDTO;
import com.openapi.jhipstergraphqldgs.service.mapper.TitleAkaMapper;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link TitleAka}.
 */
@Service
@Transactional
public class TitleAkaServiceImpl implements TitleAkaService {

    private final Logger log = LoggerFactory.getLogger(TitleAkaServiceImpl.class);

    private final TitleAkaRepository titleAkaRepository;

    private final TitleAkaMapper titleAkaMapper;

    public TitleAkaServiceImpl(TitleAkaRepository titleAkaRepository, TitleAkaMapper titleAkaMapper) {
        this.titleAkaRepository = titleAkaRepository;
        this.titleAkaMapper = titleAkaMapper;
    }

    @Override
    public TitleAkaDTO save(TitleAkaDTO titleAkaDTO) {
        log.debug("Request to save TitleAka : {}", titleAkaDTO);
        TitleAka titleAka = titleAkaMapper.toEntity(titleAkaDTO);
        titleAka = titleAkaRepository.save(titleAka);
        return titleAkaMapper.toDto(titleAka);
    }

    @Override
    public Optional<TitleAkaDTO> partialUpdate(TitleAkaDTO titleAkaDTO) {
        log.debug("Request to partially update TitleAka : {}", titleAkaDTO);

        return titleAkaRepository
            .findById(titleAkaDTO.getId())
            .map(existingTitleAka -> {
                titleAkaMapper.partialUpdate(existingTitleAka, titleAkaDTO);

                return existingTitleAka;
            })
            .map(titleAkaRepository::save)
            .map(titleAkaMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public List<TitleAkaDTO> findAll() {
        log.debug("Request to get all TitleAkas");
        return titleAkaRepository.findAll().stream().map(titleAkaMapper::toDto).collect(Collectors.toCollection(LinkedList::new));
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<TitleAkaDTO> findOne(Long id) {
        log.debug("Request to get TitleAka : {}", id);
        return titleAkaRepository.findById(id).map(titleAkaMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete TitleAka : {}", id);
        titleAkaRepository.deleteById(id);
    }
}
