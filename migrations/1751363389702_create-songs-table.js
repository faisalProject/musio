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
      notNull: true
    }, title: {
      type: 'TEXT',
      notNull: true
    }, year: {
      type: 'INTEGER',
      notNull: true
    }, genre: {
      type: 'TEXT',
      notNull: true
    }, performer: {
      type: 'TEXT',
      notNull: true
    }, duration: {
      type: 'INTEGER',
      notNull: false
    }, album_id: {
      type: 'VARCHAR(50)',
      notNull: false,
      references: 'albums(id)',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    }
  });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
  pgm.dropTable('songs');
};
