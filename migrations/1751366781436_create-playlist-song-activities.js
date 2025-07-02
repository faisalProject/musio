/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
export const shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const up = (pgm) => {
  pgm.createTable('playlist_song_activities', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
      notNull: true
    }, playlist_id: {
      type: 'VARCHAR(50)',
      notNull: false,
      references: 'playlists(id)',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    }, song_id: {
      type: 'VARCHAR(50)',
      notNull: false,
      references: 'songs(id)',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    }, user_id: {
      type: 'VARCHAR(50)',
      notNull: false,
      references: 'users(id)',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    }, action: {
      type: 'TEXT',
      notNull: true
    }, time: {
      type: 'TIMESTAMPTZ',
      notNull: true,
      default: pgm.func('current_timestamp')
    }
  })
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {};
