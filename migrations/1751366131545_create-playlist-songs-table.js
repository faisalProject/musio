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
  pgm.createTable('playlist_songs', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
      notNull: true,
    }, playlist_id: {
      type: 'VARCHAR(50)',
      notNull: false,
      references: 'playlists(id)',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    }, song_id: {
      type: 'VARCHAR(50)',
      notNull: true,
      references: 'songs(id)',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    }
  })
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {};
