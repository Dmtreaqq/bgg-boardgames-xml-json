export const getMappedBoardgames = (boardgames) => {
  return boardgames.map(mapperCallback)
}

const mapperCallback = (boardgame) => {
  const {
    attr,
    yearpublished,
    minplayers,
    maxplayers,
    playingtime,
    minplaytime,
    maxplaytime,
    age,
    name,
    description,
    thumbnail,
    image,
    boardgameaccessory,
    boardgamepublisher,
    cardset,
    boardgamedesigner,
    boardgameartist,
    boardgamefamily,
    boardgamecategory,
    boardgamemechanic,
    boardgamesubdomain,
    boardgameimplementation,
  } = boardgame

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
    designers: buildDesigners(boardgamedesigner),
    artists: buildArtists(boardgameartist),
    gameFamily: buildGameFamily(boardgamefamily),
    categories: buildCategories(boardgamecategory),
    mechanics: buildMechanics(boardgamemechanic),
    gameTypes: buildGamesSubDomain(boardgamesubdomain),
    implementations: buildImplementations(boardgameimplementation),
  }
}

const buildAccessories = (accessories) => {
  if (!accessories) return ''

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
  if (!names) return ''

  if (Array.isArray(names)) {
    return names.map((name) => ({
      title: name.text ?? '',
    }))
  }

  return [
    {
      title: names.text ?? '',
    },
  ]
}

const buildPublishers = (publishers) => {
  if (!publishers) return ''

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
  if (!cardset) return ''

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

const buildDesigners = (designers) => {
  if (!designers) return ''

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
  if (!artists) return ''

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

const buildGameFamily = (family) => {
  if (!family) return ''

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
  if (!categories) return ''

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
  if (!mechanics) return ''

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
  if (!types) return ''

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
  if (!implementations) return ''

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
