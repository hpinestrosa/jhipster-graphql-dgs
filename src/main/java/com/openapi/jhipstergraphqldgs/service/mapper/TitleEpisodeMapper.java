package com.openapi.jhipstergraphqldgs.service.mapper;

import com.openapi.jhipstergraphqldgs.domain.*;
import com.openapi.jhipstergraphqldgs.service.dto.TitleEpisodeDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link TitleEpisode} and its DTO {@link TitleEpisodeDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface TitleEpisodeMapper extends EntityMapper<TitleEpisodeDTO, TitleEpisode> {}
