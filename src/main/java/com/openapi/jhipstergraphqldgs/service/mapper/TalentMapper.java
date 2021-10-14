package com.openapi.jhipstergraphqldgs.service.mapper;

import com.openapi.jhipstergraphqldgs.domain.*;
import com.openapi.jhipstergraphqldgs.service.dto.TalentDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Talent} and its DTO {@link TalentDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface TalentMapper extends EntityMapper<TalentDTO, Talent> {
    @Named("id")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    TalentDTO toDtoId(Talent talent);
}
