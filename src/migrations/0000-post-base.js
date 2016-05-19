/* @flow */

export function up(qb: any): Promise {
  return qb.schema
  .createTableIfNotExists("posts", t => {
    t.increments()
    t.string('title').index()
    t.string('content_type').index()
    t.json('content_raw')
    t.boolean('published').defaultTo(false).index()
    t.timestamp('published_at').index()
    t.timestamps(true, true)
  })
}

export function down(qb: any): Promise {
  return qb.schema
  .dropTableIfExists("posts")
}
