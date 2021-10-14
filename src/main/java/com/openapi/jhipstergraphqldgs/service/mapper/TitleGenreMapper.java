package com.openapi.jhipstergraphqldgs.service.mapper;

import com.openapi.jhipstergraphqldgs.domain.*;
import com.openapi.jhipstergraphqldgs.service.dto.TitleGenreDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link TitleGenre} and its DTO {@link TitleGenreDTO}.
 */
@Mapper(componentModel = "spring", uses = { GenreMapper.class, TitleMapper.class })
public interface TitleGenreMapper extends EntityMapper<TitleGenreDTO, TitleGenre> {
    @Mapping(target = "genre", source = "genre", qualifiedByName = "id")
    @Mapping(target = "title", source = "title", qualifiedByName = "id")
    TitleGenreDTO toDto(TitleGenre s);
}
