package com.openapi.jhipstergraphqldgs.service.mapper;

import com.openapi.jhipstergraphqldgs.domain.*;
import com.openapi.jhipstergraphqldgs.service.dto.ContentTypeDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link ContentType} and its DTO {@link ContentTypeDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface ContentTypeMapper extends EntityMapper<ContentTypeDTO, ContentType> {
    @Named("id")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    ContentTypeDTO toDtoId(ContentType contentType);
}
