import ClientError from "../../exceptions/ClientError.js";

export default class PlaylistsHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.postPlaylistHandler = this.postPlaylistHandler.bind(this);
    this.getPlaylistsHandler = this.getPlaylistsHandler.bind(this);
    this.deletePlaylistByIdHandler = this.deletePlaylistByIdHandler.bind(this);
  }

  async postPlaylistHandler(request, h) {
    try {
      this._validator.validatePlaylistPayload(request.payload);
      const { name } = request.payload;
      const { id: credentialId } = request.auth.credentials;

      const playlistId = await this._service.addPlaylist({ name, owner: credentialId });

      const response = h.response({
        status: 'success',
        message: 'Playlist berhasil ditambahkan',
        data: {
          playlistId
        }
      });

      response.code(201);
      return response;
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message
        });

        response.code(error.statusCode);
        return response;
      }

      // Server error
      const response = h.response({
        status: 'error',
        message: 'Terjadi kesalahan pada server'
      });

      response.code(500);
      console.error(error);
      return response;
    }
  }

  async getPlaylistsHandler() {
    const playlists = await this._service.getPlaylists();
    
    return {
      status: 'success',
      data: {
        playlists
      }
    };
  }

  async deletePlaylistByIdHandler(request, h) {
    const { id } = request.params;
    await this._service.deletePlaylistById(id);

    return {
      status: 'success',
      message: 'Playlist berhasil dihapus'
    }
  }
}