package com.openapi.jhipstergraphqldgs.service.mapper;

import com.openapi.jhipstergraphqldgs.domain.*;
import com.openapi.jhipstergraphqldgs.service.dto.TitleAkaTitleTypeDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link TitleAkaTitleType} and its DTO {@link TitleAkaTitleTypeDTO}.
 */
@Mapper(componentModel = "spring", uses = { TitleTypeMapper.class })
public interface TitleAkaTitleTypeMapper extends EntityMapper<TitleAkaTitleTypeDTO, TitleAkaTitleType> {
    @Mapping(target = "titleType", source = "titleType", qualifiedByName = "id")
    TitleAkaTitleTypeDTO toDto(TitleAkaTitleType s);
}
