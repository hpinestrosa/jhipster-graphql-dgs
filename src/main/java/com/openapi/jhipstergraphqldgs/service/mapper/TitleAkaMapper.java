package com.openapi.jhipstergraphqldgs.service.mapper;

import com.openapi.jhipstergraphqldgs.domain.*;
import com.openapi.jhipstergraphqldgs.service.dto.TitleAkaDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link TitleAka} and its DTO {@link TitleAkaDTO}.
 */
@Mapper(componentModel = "spring", uses = { RegionMapper.class, LanguageMapper.class })
public interface TitleAkaMapper extends EntityMapper<TitleAkaDTO, TitleAka> {
    @Mapping(target = "region", source = "region", qualifiedByName = "id")
    @Mapping(target = "language", source = "language", qualifiedByName = "id")
    TitleAkaDTO toDto(TitleAka s);
}
