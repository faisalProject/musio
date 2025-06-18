import Hapi from '@hapi/hapi';
import musics from './api/musics/index.js';
import MusicsService from './services/MusicsService.js';
import { AlbumValidator, SongValidator } from './validator/musics/index.js';
import ClientError from './exceptions/ClientError.js';

import dotenv from 'dotenv';
dotenv.config();


const init = async () => {
  const musicsService = new MusicsService();

  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ['*'],
      }
    }
  });

  await server.register({
    plugin: musics,
    options: {
      service: musicsService,
      albumValidator: AlbumValidator,
      songValidator: SongValidator
    }
  });

  server.ext('onPreResponse', (request, h) => {
    const { response } = request;

    if (response instanceof ClientError) {
      const newResponse = h.response({
        status: 'fail',
        message: response.message
      });
      
      newResponse.code(response.statusCode);
      return newResponse;
    }

    return h.continue;
  });

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();