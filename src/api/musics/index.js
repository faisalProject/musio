import MusicsHandler from "./handler.js";
import routes from "./routes.js";

export default {
  name: 'musio',
  version: '1.0.0',
  register: async (server, { service, albumValidator, songValidator }) => {
    const musicsHandler = new MusicsHandler(service, albumValidator, songValidator);
    server.route(routes(musicsHandler));
  }
}