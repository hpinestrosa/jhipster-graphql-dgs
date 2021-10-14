package com.openapi.jhipstergraphqldgs.service.impl;

import com.openapi.jhipstergraphqldgs.domain.TalentRole;
import com.openapi.jhipstergraphqldgs.repository.TalentRoleRepository;
import com.openapi.jhipstergraphqldgs.service.TalentRoleService;
import com.openapi.jhipstergraphqldgs.service.dto.TalentRoleDTO;
import com.openapi.jhipstergraphqldgs.service.mapper.TalentRoleMapper;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link TalentRole}.
 */
@Service
@Transactional
public class TalentRoleServiceImpl implements TalentRoleService {

    private final Logger log = LoggerFactory.getLogger(TalentRoleServiceImpl.class);

    private final TalentRoleRepository talentRoleRepository;

    private final TalentRoleMapper talentRoleMapper;

    public TalentRoleServiceImpl(TalentRoleRepository talentRoleRepository, TalentRoleMapper talentRoleMapper) {
        this.talentRoleRepository = talentRoleRepository;
        this.talentRoleMapper = talentRoleMapper;
    }

    @Override
    public TalentRoleDTO save(TalentRoleDTO talentRoleDTO) {
        log.debug("Request to save TalentRole : {}", talentRoleDTO);
        TalentRole talentRole = talentRoleMapper.toEntity(talentRoleDTO);
        talentRole = talentRoleRepository.save(talentRole);
        return talentRoleMapper.toDto(talentRole);
    }

    @Override
    public Optional<TalentRoleDTO> partialUpdate(TalentRoleDTO talentRoleDTO) {
        log.debug("Request to partially update TalentRole : {}", talentRoleDTO);

        return talentRoleRepository
            .findById(talentRoleDTO.getId())
            .map(existingTalentRole -> {
                talentRoleMapper.partialUpdate(existingTalentRole, talentRoleDTO);

                return existingTalentRole;
            })
            .map(talentRoleRepository::save)
            .map(talentRoleMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public List<TalentRoleDTO> findAll() {
        log.debug("Request to get all TalentRoles");
        return talentRoleRepository.findAll().stream().map(talentRoleMapper::toDto).collect(Collectors.toCollection(LinkedList::new));
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<TalentRoleDTO> findOne(Long id) {
        log.debug("Request to get TalentRole : {}", id);
        return talentRoleRepository.findById(id).map(talentRoleMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete TalentRole : {}", id);
        talentRoleRepository.deleteById(id);
    }
}
