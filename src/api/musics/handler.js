export default class MusicsHandler {
  constructor(service, albumValidator, songValidator) {
    this._service = service;
    this._albumValidator = albumValidator;
    this._songValidator = songValidator;

    // Album
    this.postAlbumHandler = this.postAlbumHandler.bind(this);
    this.getAlbumByIdHandler = this.getAlbumByIdHandler.bind(this);
    this.putAlbumByIdHandler = this.putAlbumByIdHandler.bind(this);
    this.deleteAlbumByIdHandler = this.deleteAlbumByIdHandler.bind(this);

    // Song
    this.postSongHandler = this.postSongHandler.bind(this);
    this.getSongsHandler = this.getSongsHandler.bind(this);
    this.getSongByIdHandler = this.getSongByIdHandler.bind(this);
    this.putSongByIdHandler = this.putSongByIdHandler.bind(this);
    this.deleteSongByIdHandler = this.deleteSongByIdHandler.bind(this);
  }

  // Album
  async postAlbumHandler(request, h) {
    this._albumValidator.validationAlbumPayload(request.payload);
    const { name, year } = request.payload;
    const albumId = await this._service.addAlbum({ name, year });

    const response = h.response({
      status: 'success',
      message: 'Album berhasil ditambahkan',
      data: {
        albumId
      },
    });

    response.code(201);
    return response;
  }

  async getAlbumByIdHandler(request, h) {
    const { id } = request.params;
    const album = await this._service.getAlbumById(id);

    return {
      status: 'success',
      data: {
        album
      }
    };
  }

  async putAlbumByIdHandler(request, h) {
    this._albumValidator.validationAlbumPayload(request.payload);
    const { id } = request.params;

    await this._service.editAlbumById(id, request.payload);

    return {
      status: 'success',
      message: 'Album berhasil diperbarui'
    }
  }

  async deleteAlbumByIdHandler(request, h) {
    const { id } = request.params;
    await this._service.deleteAlbumById(id);

    return {
      status: 'success',
      message: 'Album berhasil dihapus'
    }
  }

  // Song
  async postSongHandler(request, h) {
    this._songValidator.validationSongPaylod(request.payload);
    const { title, year, performer, genre, duration, albumId } = request.payload;
    const songId = await this._service.addSong({ title, year, performer, genre, duration, albumId });

    const response = h.response({
      status: 'success',
      message: 'Lagu berhasil ditambahkan',
      data: {
        songId
      }
    });

    response.code(201);
    return response;
  }

  async getSongsHandler(request, h) {
    const songs = await this._service.getSongs();

    return {
      status: 'success',
      data: {
        songs
      }
    };
  }

  async getSongByIdHandler(request, h) {
    const { id } = request.params;
    const song = await this._service.getSongById(id);

    return {
      status: 'success',
      data: {
        song
      }
    };
  }

  async putSongByIdHandler(request, h) {
    this._songValidator.validationSongPaylod(request.payload);
    const { id } = request.params;

    await this._service.editSongById(id, request.payload);

    return {
      status: 'success',
      message: 'Lagu berhasil diperbarui'
    }
  }
  
  async deleteSongByIdHandler(request, h) {
    const { id } = request.params;
    await this._service.deleteSongById(id);

    return {
      status: 'success',
      message: 'Lagu berhasil dihapus'
    }
  }
}