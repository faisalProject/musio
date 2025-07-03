import Joi from "joi";

const SongPayloadSchema = Joi.object({
  title: Joi.string().required(),
  year: Joi.number().required(),
  performer: Joi.string().required(),
  genre: Joi.string().required(),
  duration: Joi.number().allow(null),
  albumId: Joi.string().max(50).allow(null)
});

export default SongPayloadSchema;