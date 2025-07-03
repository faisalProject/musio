const mapSongToModel = ({
  id,
  title,
  year,
  performer,
  genre,
  duration,
  album_id
}) => ({
  id,
  title,
  year,
  performer,
  genre,
  duration,
  albumId: album_id
});

const mapPlaylistToModel = ({
  id,
  name,
  owner
}) => ({
  id,
  name,
  username: owner
})

export { mapSongToModel, mapPlaylistToModel };