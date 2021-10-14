package com.openapi.jhipstergraphqldgs.service.mapper;

import com.openapi.jhipstergraphqldgs.domain.*;
import com.openapi.jhipstergraphqldgs.service.dto.TalentRoleDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link TalentRole} and its DTO {@link TalentRoleDTO}.
 */
@Mapper(componentModel = "spring", uses = { RoleMapper.class, TalentMapper.class })
public interface TalentRoleMapper extends EntityMapper<TalentRoleDTO, TalentRole> {
    @Mapping(target = "role", source = "role", qualifiedByName = "id")
    @Mapping(target = "talent", source = "talent", qualifiedByName = "id")
    TalentRoleDTO toDto(TalentRole s);
}
