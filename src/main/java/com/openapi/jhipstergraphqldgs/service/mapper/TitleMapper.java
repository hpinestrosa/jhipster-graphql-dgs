package com.openapi.jhipstergraphqldgs.service.mapper;

import com.openapi.jhipstergraphqldgs.domain.*;
import com.openapi.jhipstergraphqldgs.service.dto.TitleDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Title} and its DTO {@link TitleDTO}.
 */
@Mapper(componentModel = "spring", uses = { ContentTypeMapper.class })
public interface TitleMapper extends EntityMapper<TitleDTO, Title> {
    @Mapping(target = "contentType", source = "contentType", qualifiedByName = "id")
    TitleDTO toDto(Title s);

    @Named("id")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    TitleDTO toDtoId(Title title);
}
