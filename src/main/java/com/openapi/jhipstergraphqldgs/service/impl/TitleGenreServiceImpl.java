package com.openapi.jhipstergraphqldgs.service.impl;

import com.openapi.jhipstergraphqldgs.domain.TitleGenre;
import com.openapi.jhipstergraphqldgs.repository.TitleGenreRepository;
import com.openapi.jhipstergraphqldgs.service.TitleGenreService;
import com.openapi.jhipstergraphqldgs.service.dto.TitleGenreDTO;
import com.openapi.jhipstergraphqldgs.service.mapper.TitleGenreMapper;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link TitleGenre}.
 */
@Service
@Transactional
public class TitleGenreServiceImpl implements TitleGenreService {

    private final Logger log = LoggerFactory.getLogger(TitleGenreServiceImpl.class);

    private final TitleGenreRepository titleGenreRepository;

    private final TitleGenreMapper titleGenreMapper;

    public TitleGenreServiceImpl(TitleGenreRepository titleGenreRepository, TitleGenreMapper titleGenreMapper) {
        this.titleGenreRepository = titleGenreRepository;
        this.titleGenreMapper = titleGenreMapper;
    }

    @Override
    public TitleGenreDTO save(TitleGenreDTO titleGenreDTO) {
        log.debug("Request to save TitleGenre : {}", titleGenreDTO);
        TitleGenre titleGenre = titleGenreMapper.toEntity(titleGenreDTO);
        titleGenre = titleGenreRepository.save(titleGenre);
        return titleGenreMapper.toDto(titleGenre);
    }

    @Override
    public Optional<TitleGenreDTO> partialUpdate(TitleGenreDTO titleGenreDTO) {
        log.debug("Request to partially update TitleGenre : {}", titleGenreDTO);

        return titleGenreRepository
            .findById(titleGenreDTO.getId())
            .map(existingTitleGenre -> {
                titleGenreMapper.partialUpdate(existingTitleGenre, titleGenreDTO);

                return existingTitleGenre;
            })
            .map(titleGenreRepository::save)
            .map(titleGenreMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public List<TitleGenreDTO> findAll() {
        log.debug("Request to get all TitleGenres");
        return titleGenreRepository.findAll().stream().map(titleGenreMapper::toDto).collect(Collectors.toCollection(LinkedList::new));
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<TitleGenreDTO> findOne(Long id) {
        log.debug("Request to get TitleGenre : {}", id);
        return titleGenreRepository.findById(id).map(titleGenreMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete TitleGenre : {}", id);
        titleGenreRepository.deleteById(id);
    }
}
