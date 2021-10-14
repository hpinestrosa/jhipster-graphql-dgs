package com.openapi.jhipstergraphqldgs.service.mapper;

import com.openapi.jhipstergraphqldgs.domain.*;
import com.openapi.jhipstergraphqldgs.service.dto.TitleTypeDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link TitleType} and its DTO {@link TitleTypeDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface TitleTypeMapper extends EntityMapper<TitleTypeDTO, TitleType> {
    @Named("id")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    TitleTypeDTO toDtoId(TitleType titleType);
}
