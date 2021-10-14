package com.openapi.jhipstergraphqldgs.service.mapper;

import com.openapi.jhipstergraphqldgs.domain.*;
import com.openapi.jhipstergraphqldgs.service.dto.LanguageDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Language} and its DTO {@link LanguageDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface LanguageMapper extends EntityMapper<LanguageDTO, Language> {
    @Named("id")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    LanguageDTO toDtoId(Language language);
}
