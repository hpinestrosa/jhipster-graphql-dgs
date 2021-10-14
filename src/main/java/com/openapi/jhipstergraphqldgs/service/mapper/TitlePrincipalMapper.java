package com.openapi.jhipstergraphqldgs.service.mapper;

import com.openapi.jhipstergraphqldgs.domain.*;
import com.openapi.jhipstergraphqldgs.service.dto.TitlePrincipalDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link TitlePrincipal} and its DTO {@link TitlePrincipalDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface TitlePrincipalMapper extends EntityMapper<TitlePrincipalDTO, TitlePrincipal> {}
