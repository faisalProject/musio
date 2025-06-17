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
  pgm.createTable('songs', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    }, title:  {
      type: 'VARCHAR(100)',
      notNull: true
    }, year: {
      type: 'INTEGER',
      notNull: true
    }, performer: {
      type: 'VARCHAR(100)',
      notNull: true
    }, genre: {
      type: 'VARCHAR(100)',
      notNull: true
    }, duration: {
      type: 'INTEGER',
      notNull: true
    }, albumId: {
      type: 'VARCHAR(50)',
      notNull: true,
      references: 'albums(id)',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    }
  })
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
  pgm.dropTable('songs');
};
