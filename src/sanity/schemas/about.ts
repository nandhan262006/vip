import { defineType, defineField } from 'sanity'
import { UserIcon } from '@sanity/icons'

export const about = defineType({
  name: 'about',
  title: 'About',
  type: 'document',
  icon: UserIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'text',
      rows: 5,
    }),
    defineField({
      name: 'story',
      title: 'Story',
      type: 'text',
      rows: 8,
    }),
    defineField({
      name: 'photographerName',
      title: 'Photographer Name',
      type: 'string',
    }),
    defineField({
      name: 'experience',
      title: 'Experience (years)',
      type: 'number',
    }),
    defineField({
      name: 'awards',
      title: 'Awards',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'profileImage',
      title: 'Profile Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'stats',
      title: 'Statistics',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', title: 'Label', type: 'string' },
            { name: 'value', title: 'Value', type: 'string' },
          ],
        },
      ],
    }),
  ],
})
