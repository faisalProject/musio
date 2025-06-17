import Joi from "joi";

const albumPayloadSchema = Joi.object({
  name: Joi.string().required(),
  year: Joi.number().integer().required()
})

const songPayloadSchema = Joi.object({
  title: Joi.string().required(),
  year: Joi.number().integer().optional(),
  performer: Joi.string().required(),
  genre: Joi.string().required(),
  duration: Joi.number().integer().required(),
  albumId: Joi.string().required()
})

export { albumPayloadSchema, songPayloadSchema };