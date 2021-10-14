package com.openapi.jhipstergraphqldgs.service.impl;

import com.openapi.jhipstergraphqldgs.domain.Talent;
import com.openapi.jhipstergraphqldgs.repository.TalentRepository;
import com.openapi.jhipstergraphqldgs.service.TalentService;
import com.openapi.jhipstergraphqldgs.service.dto.TalentDTO;
import com.openapi.jhipstergraphqldgs.service.mapper.TalentMapper;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Talent}.
 */
@Service
@Transactional
public class TalentServiceImpl implements TalentService {

    private final Logger log = LoggerFactory.getLogger(TalentServiceImpl.class);

    private final TalentRepository talentRepository;

    private final TalentMapper talentMapper;

    public TalentServiceImpl(TalentRepository talentRepository, TalentMapper talentMapper) {
        this.talentRepository = talentRepository;
        this.talentMapper = talentMapper;
    }

    @Override
    public TalentDTO save(TalentDTO talentDTO) {
        log.debug("Request to save Talent : {}", talentDTO);
        Talent talent = talentMapper.toEntity(talentDTO);
        talent = talentRepository.save(talent);
        return talentMapper.toDto(talent);
    }

    @Override
    public Optional<TalentDTO> partialUpdate(TalentDTO talentDTO) {
        log.debug("Request to partially update Talent : {}", talentDTO);

        return talentRepository
            .findById(talentDTO.getId())
            .map(existingTalent -> {
                talentMapper.partialUpdate(existingTalent, talentDTO);

                return existingTalent;
            })
            .map(talentRepository::save)
            .map(talentMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<TalentDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Talents");
        return talentRepository.findAll(pageable).map(talentMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<TalentDTO> findOne(Long id) {
        log.debug("Request to get Talent : {}", id);
        return talentRepository.findById(id).map(talentMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Talent : {}", id);
        talentRepository.deleteById(id);
    }
}
