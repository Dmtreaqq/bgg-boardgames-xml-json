/**
 * @typedef {Object} Boardgame
 * @property {string} bggGameId - The unique id for the boardgame from BGG.
 * @property {string} yearPublished - The year the game was published.
 * @property {number} minPlayers - The minimum players.
 * @property {number} maxPlayers - The maximum players.
 * @property {number} playingTime - The time to play game
 * @property {number} minPlayTime - The min time to play game
 * @property {number} maxPlayTime - The max time to play game
 * @property {boolean} isAvailable - Is the book available?
 */

export const getMappedBoardgames = (boardgames) => {
  return boardgames.map(mapperCallback)
}

/**
 * @returns {Boardgame} Description of the return value.
 */
const mapperCallback = (boardgame) => {
  /**
  * @type {Boardgame}
  */

  const boardgameReturn = {
    bggGameId: boardgame.attr?.objectid,
    yearPublished: boardgame.yearpublished ?? null,
    minPlayers: Number(boardgame.minplayers) ?? null,
    maxPlayers: Number(boardgame.maxplayers) ?? null,
    playingTime: Number(boardgame.playingtime) ?? null,
    minPlayTime: Number(boardgame.minplaytime) ?? null,
    maxPlayTime: Number(boardgame.maxplaytime) ?? null,
    age: Number(boardgame.age) ?? null,
    titles: buildTitles(boardgame.name),
    description: boardgame.description ?? null,
    thumbnail: boardgame.thumbnail ?? null,
    image: boardgame.image ?? null,
    boardgameAccessories: buildAccessories(boardgame.boardgameaccessory),
    boardgamePublishers: buildPublishers(boardgame.boardgamepublisher),
    cardset: buildCardSet(boardgame.cardset),
    podcastEpisodes: buildPodcastEpisode(boardgame.boardgamepodcastepisode),
    honor: buildHonor(boardgame.boardgamehonor),
    designers: buildDesigners(boardgame.boardgamedesigner),
    artists: buildArtists(boardgame.boardgameartist),
    versions: buildVersions(boardgame.boardgameversion),
    gameFamily: buildGameFamily(boardgame.boardgamefamily),
    categories: buildCategories(boardgame.boardgamecategory),
    mechanics: buildMechanics(boardgame.boardgamemechanic),
    gameTypes: buildGamesSubDomain(boardgame.boardgamesubdomain),
    implementations: buildImplementations(boardgame.boardgameimplementation),
  }

  return boardgameReturn;

  return {
    gameId: attr?.objectid ?? '',
    yearPublished: yearpublished ?? '',
    minPlayers: minplayers ?? '',
    maxPlayers: maxplayers ?? '',
    playingTime: playingtime ?? '',
    minPlayTime: minplaytime ?? '',
    maxPlayTime: maxplaytime ?? '',
    age: age ?? '',
    titles: buildTitles(name),
    description: description ?? '',
    thumbnail: thumbnail ?? '',
    image: image ?? '',
    boardgameAccessories: buildAccessories(boardgameaccessory),
    boardgamePublishers: buildPublishers(boardgamepublisher),
    cardset: buildCardSet(cardset),
    podcastEpisodes: buildPodcastEpisode(boardgamepodcastepisode),
    honor: buildHonor(boardgamehonor),
    designers: buildDesigners(boardgamedesigner),
    artists: buildArtists(boardgameartist),
    versions: buildVersions(boardgameversion),
    gameFamily: buildGameFamily(boardgamefamily),
    categories: buildCategories(boardgamecategory),
    mechanics: buildMechanics(boardgamemechanic),
    gameTypes: buildGamesSubDomain(boardgamesubdomain),
    implementations: buildImplementations(boardgameimplementation),
  }
}

const buildAccessories = (accessories) => {
  if (!accessories) return []

  if (Array.isArray(accessories)) {
    return accessories.map((acc) => ({
      title: acc.text ?? '',
      accessoryId: acc.attr?.objectid ?? '',
    }))
  }

  return [
    {
      title: accessories.text ?? '',
      accessoryId: accessories.attr?.objectid ?? '',
    },
  ]
}

const buildTitles = (names) => {
  if (!names) return []

  if (Array.isArray(names)) {
    return names.map((name) => name.text ?? '')
  }

  return [names.text ?? '']
}

const buildPublishers = (publishers) => {
  if (!publishers) return []

  if (Array.isArray(publishers)) {
    return publishers.map((publisher) => ({
      title: publisher.text ?? '',
      publisherId: publisher.attr?.objectid ?? '',
    }))
  }

  return [
    {
      title: publishers.text ?? '',
      publisherId: publishers.attr?.objectid ?? '',
    },
  ]
}

const buildCardSet = (cardset) => {
  if (!cardset) return []

  if (Array.isArray(cardset)) {
    return cardset.map((set) => ({
      id: set.attr?.objectid ?? '',
    }))
  }

  return [
    {
      id: cardset.attr?.objectid ?? '',
    },
  ]
}

const buildPodcastEpisode = (boardgamepodcastepisode) => {
  if (!boardgamepodcastepisode) return [];

  if (Array.isArray(boardgamepodcastepisode)) {
    return boardgamepodcastepisode.map(episode => ({
      id: episode.attr?.objectid ?? '',
      title: episode.text ?? ''
    }))
  }

  return [
    {
      id: boardgamepodcastepisode.attr?.objectid ?? ''
    }
  ]
}

const buildHonor = (boardgamehonor) => {
  if (!boardgamehonor) return [];

  if (Array.isArray(boardgamehonor)) {
    return boardgamehonor.map(honor => ({
      id: honor.attr?.objectid ?? '',
      text: honor.text ?? ''
    }))
  }

  return [
    {
      id: boardgamehonor.attr?.objectid ?? ''
    }
  ]
}

const buildDesigners = (designers) => {
  if (!designers) return []

  if (Array.isArray(designers)) {
    return designers.map((designer) => ({
      title: designer.text ?? '',
      designerId: designer.attr?.objectid ?? '',
    }))
  }

  return [
    {
      title: designers.text ?? '',
      designerId: designers.attr?.objectid ?? '',
    },
  ]
}

const buildArtists = (artists) => {
  if (!artists) return []

  if (Array.isArray(artists)) {
    return artists.map((artist) => ({
      title: artist.text ?? '',
      artistId: artist.attr?.objectid ?? '',
    }))
  }

  return [
    {
      title: artists.text ?? '',
      artistId: artists.attr?.objectid ?? '',
    },
  ]
}

const buildVersions = (boardgameversion) => {
  if (!boardgameversion) return []

  if (Array.isArray(boardgameversion)) {
    return boardgameversion.map((version) => ({
      title: version.text ?? '',
      id: version.attr?.objectid ?? '',
    }))
  }

  return [
    {
      title: boardgameversion.text ?? '',
      id: boardgameversion.attr?.objectid ?? '',
    },
  ]
}

const buildGameFamily = (family) => {
  if (!family) return []

  if (Array.isArray(family)) {
    return family.map((fam) => ({
      title: fam.text ?? '',
      gameId: fam.attr?.objectid ?? '',
    }))
  }

  return [
    {
      title: family.text ?? '',
      gameId: family.attr?.objectid ?? '',
    },
  ]
}

const buildCategories = (categories) => {
  if (!categories) return []

  if (Array.isArray(categories)) {
    return categories.map((category) => ({
      title: category.text ?? '',
      categoryId: category.attr?.objectid ?? '',
    }))
  }

  return [
    {
      title: categories.text ?? '',
      categoryId: categories.attr?.objectid ?? '',
    },
  ]
}

const buildMechanics = (mechanics) => {
  if (!mechanics) return []

  if (Array.isArray(mechanics)) {
    return mechanics.map((mechanic) => ({
      title: mechanic.text ?? '',
      mechanicId: mechanic.attr?.objectid ?? '',
    }))
  }

  return [
    {
      title: mechanics.title ?? '',
      mechanicId: mechanics.attr?.objectid ?? '',
    },
  ]
}

const buildGamesSubDomain = (types) => {
  if (!types) return []

  if (Array.isArray(types)) {
    return types.map((type) => ({
      title: type.text ?? '',
      gameTypeId: type.attr?.objectid ?? '',
    }))
  }

  return [
    {
      title: types.text ?? '',
      gameTypeId: types.attr?.objectid ?? '',
    },
  ]
}

const buildImplementations = (implementations) => {
  if (!implementations) return []

  if (Array.isArray(implementations)) {
    return implementations.map((implementation) => ({
      title: implementation.text ?? '',
      gameId: implementation.attr?.objectid ?? '',
    }))
  }

  return [
    {
      title: implementations.text ?? '',
      gameId: implementations.attr?.objectid ?? '',
    },
  ]
}
