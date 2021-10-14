package com.openapi.jhipstergraphqldgs.service.impl;

import com.openapi.jhipstergraphqldgs.domain.TitleEpisode;
import com.openapi.jhipstergraphqldgs.repository.TitleEpisodeRepository;
import com.openapi.jhipstergraphqldgs.service.TitleEpisodeService;
import com.openapi.jhipstergraphqldgs.service.dto.TitleEpisodeDTO;
import com.openapi.jhipstergraphqldgs.service.mapper.TitleEpisodeMapper;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link TitleEpisode}.
 */
@Service
@Transactional
public class TitleEpisodeServiceImpl implements TitleEpisodeService {

    private final Logger log = LoggerFactory.getLogger(TitleEpisodeServiceImpl.class);

    private final TitleEpisodeRepository titleEpisodeRepository;

    private final TitleEpisodeMapper titleEpisodeMapper;

    public TitleEpisodeServiceImpl(TitleEpisodeRepository titleEpisodeRepository, TitleEpisodeMapper titleEpisodeMapper) {
        this.titleEpisodeRepository = titleEpisodeRepository;
        this.titleEpisodeMapper = titleEpisodeMapper;
    }

    @Override
    public TitleEpisodeDTO save(TitleEpisodeDTO titleEpisodeDTO) {
        log.debug("Request to save TitleEpisode : {}", titleEpisodeDTO);
        TitleEpisode titleEpisode = titleEpisodeMapper.toEntity(titleEpisodeDTO);
        titleEpisode = titleEpisodeRepository.save(titleEpisode);
        return titleEpisodeMapper.toDto(titleEpisode);
    }

    @Override
    public Optional<TitleEpisodeDTO> partialUpdate(TitleEpisodeDTO titleEpisodeDTO) {
        log.debug("Request to partially update TitleEpisode : {}", titleEpisodeDTO);

        return titleEpisodeRepository
            .findById(titleEpisodeDTO.getId())
            .map(existingTitleEpisode -> {
                titleEpisodeMapper.partialUpdate(existingTitleEpisode, titleEpisodeDTO);

                return existingTitleEpisode;
            })
            .map(titleEpisodeRepository::save)
            .map(titleEpisodeMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<TitleEpisodeDTO> findAll(Pageable pageable) {
        log.debug("Request to get all TitleEpisodes");
        return titleEpisodeRepository.findAll(pageable).map(titleEpisodeMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<TitleEpisodeDTO> findOne(Long id) {
        log.debug("Request to get TitleEpisode : {}", id);
        return titleEpisodeRepository.findById(id).map(titleEpisodeMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete TitleEpisode : {}", id);
        titleEpisodeRepository.deleteById(id);
    }
}
