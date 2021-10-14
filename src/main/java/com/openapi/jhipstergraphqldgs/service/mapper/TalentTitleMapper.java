package com.openapi.jhipstergraphqldgs.service.mapper;

import com.openapi.jhipstergraphqldgs.domain.*;
import com.openapi.jhipstergraphqldgs.service.dto.TalentTitleDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link TalentTitle} and its DTO {@link TalentTitleDTO}.
 */
@Mapper(componentModel = "spring", uses = { TalentMapper.class })
public interface TalentTitleMapper extends EntityMapper<TalentTitleDTO, TalentTitle> {
    @Mapping(target = "talent", source = "talent", qualifiedByName = "id")
    TalentTitleDTO toDto(TalentTitle s);
}
