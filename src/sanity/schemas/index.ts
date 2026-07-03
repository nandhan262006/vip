import type { SchemaTypeDefinition } from 'sanity'
import { gallery } from './gallery'
import { category } from './category'
import { about } from './about'
import { contactSubmission } from './contactSubmission'
import { service } from './service'

export const schemaTypes: SchemaTypeDefinition[] = [
  gallery,
  category,
  about,
  contactSubmission,
  service,
]
