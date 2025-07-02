import Hapi from '@hapi/hapi';
import ClientError from './exceptions/ClientError.js';
import Jwt from '@hapi/jwt';

// Albums
import albums from './api/albums/index.js';
import AlbumsService from './services/AlbumsService.js';
import AlbumsValidator from './validator/albums/index.js';

// Songs
import songs from './api/songs/index.js';
import SongsService from './services/SongsService.js';
import SongsValidator from './validator/songs/index.js';

// Users
import users from './api/users/index.js';
import UsersService from './services/UsersService.js';
import UsersValidator from './validator/users/index.js';

// Authentications
import authentications from './api/authentications/index.js';
import AuthenticationsService from './services/AuthenticationsService.js';
import TokenManager from './tokenize/TokenManager.js';
import AuthenticationsValidator from './validator/authentications/index.js';

import dotenv from 'dotenv';
dotenv.config();


const init = async () => {
  const albumsService = new AlbumsService();
  const songsService = new SongsService();
  const usersService = new UsersService();
  const authenticationsService = new AuthenticationsService();
  
  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ['*'],
      }
    }
  });

  // Register JWT
  await server.register([
    { plugin: Jwt }
  ])

  // Strategi autentikasi JWT
  server.auth.strategy('musio_jwt', 'jwt', {
    keys: process.env.ACCESS_TOKEN_KEY,
    verify: {
      aud: false,
      iss: false,
      sub: false,
      maxAgeSec: process.env.ACCESS_TOKEN_AGE,
    }, validate: (artifacts) => ({
      isValid: true,
      credentials: {
        id: artifacts.decoded.payload.id,
      }
    })
  });

  await server.register([
    {
      plugin: albums,
      options: {
        service: albumsService,
        validator: AlbumsValidator,
      },
    }, {
      plugin: songs,
      options: {
        service: songsService,
        validator: SongsValidator
      }
    }, {
      plugin: users,
      options: {
        service: usersService, 
        validator: UsersValidator
      }
    }, {
      plugin: authentications,
      options: {
        authenticationsService,
        usersService,
        tokenManager: TokenManager,
        validator: AuthenticationsValidator
      }
    }
  ]);

  server.ext('onPreResponse', (request, h) => {
    const { response } = request;

    if (response instanceof ClientError) {
      console.log('ClientError:', response.message);
      const newResponse = h.response({
        status: 'fail',
        message: response.message
      });

      newResponse.code(response.statusCode);
      return newResponse;
    }

    if (response.isBoom && response.output.statusCode === 500) {
      console.error('Internal Server Error:', response);
    }

    return h.continue;
  })

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
