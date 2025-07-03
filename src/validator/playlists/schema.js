import Joi from "joi"; 

const PlaylistPayloadSchema = Joi.object({
  name: Joi.string().required(),
  owner: Joi.string().max(50).allow(null)
});

export default PlaylistPayloadSchema;