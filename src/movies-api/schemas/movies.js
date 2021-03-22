const joi = require('@hapi/joi');

const movieIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);

const TitleSchema = joi.string().max(80);
const YearSchema = joi.number().min(1888).max(2077);
const CoverSchema = joi.string().uri();
const DescriptionSchema = joi.string();
const DurationSchema = joi.number().min(1).max(300);
const ContentRatingSchema = joi.string().valid('G', 'PG', 'PG-13', 'R', 'NC-17');
const SourceSchema = joi.string().uri();
const TagsSchema = joi.array().items(joi.string().max(50));

const createSchema = {
  title: TitleSchema.required(),
  year: YearSchema.required(),
  cover: CoverSchema.required(),
  description: DescriptionSchema.required(),
  duration: DurationSchema.required(),
  contentRating: ContentRatingSchema.required(),
  source: SourceSchema.required(),
  tags: TagsSchema,
};

const updateSchema = {
  title: TitleSchema,
  year: YearSchema,
  cover: CoverSchema,
  description: DescriptionSchema,
  duration: DurationSchema,
  contentRating: ContentRatingSchema,
  source: SourceSchema,
  tags: TagsSchema,
};


module.exports = {
  movieIdSchema,
  createSchema,
  updateSchema
}
