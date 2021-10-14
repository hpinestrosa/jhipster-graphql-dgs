package com.openapi.jhipstergraphqldgs.service.impl;

import com.openapi.jhipstergraphqldgs.domain.TalentTitle;
import com.openapi.jhipstergraphqldgs.repository.TalentTitleRepository;
import com.openapi.jhipstergraphqldgs.service.TalentTitleService;
import com.openapi.jhipstergraphqldgs.service.dto.TalentTitleDTO;
import com.openapi.jhipstergraphqldgs.service.mapper.TalentTitleMapper;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link TalentTitle}.
 */
@Service
@Transactional
public class TalentTitleServiceImpl implements TalentTitleService {

    private final Logger log = LoggerFactory.getLogger(TalentTitleServiceImpl.class);

    private final TalentTitleRepository talentTitleRepository;

    private final TalentTitleMapper talentTitleMapper;

    public TalentTitleServiceImpl(TalentTitleRepository talentTitleRepository, TalentTitleMapper talentTitleMapper) {
        this.talentTitleRepository = talentTitleRepository;
        this.talentTitleMapper = talentTitleMapper;
    }

    @Override
    public TalentTitleDTO save(TalentTitleDTO talentTitleDTO) {
        log.debug("Request to save TalentTitle : {}", talentTitleDTO);
        TalentTitle talentTitle = talentTitleMapper.toEntity(talentTitleDTO);
        talentTitle = talentTitleRepository.save(talentTitle);
        return talentTitleMapper.toDto(talentTitle);
    }

    @Override
    public Optional<TalentTitleDTO> partialUpdate(TalentTitleDTO talentTitleDTO) {
        log.debug("Request to partially update TalentTitle : {}", talentTitleDTO);

        return talentTitleRepository
            .findById(talentTitleDTO.getId())
            .map(existingTalentTitle -> {
                talentTitleMapper.partialUpdate(existingTalentTitle, talentTitleDTO);

                return existingTalentTitle;
            })
            .map(talentTitleRepository::save)
            .map(talentTitleMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public List<TalentTitleDTO> findAll() {
        log.debug("Request to get all TalentTitles");
        return talentTitleRepository.findAll().stream().map(talentTitleMapper::toDto).collect(Collectors.toCollection(LinkedList::new));
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<TalentTitleDTO> findOne(Long id) {
        log.debug("Request to get TalentTitle : {}", id);
        return talentTitleRepository.findById(id).map(talentTitleMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete TalentTitle : {}", id);
        talentTitleRepository.deleteById(id);
    }
}
