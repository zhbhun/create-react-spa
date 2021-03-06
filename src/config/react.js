const DefaultPreset = require('../utils/preset/DefaultPreset');

/**
 * @param {object} options @see ../utils/preset/DefaultPreset
 */
module.exports = (command, options, raw) => {
  const config = new DefaultPreset(command, options, raw);
  config.update('module.js.use.options.presets', (value) => {
    value.push('react');
    return value;
  });
  const { hot = config.mode === 'development' } = options;
  if (hot) {
    try {
      require.resolve('react-hot-loader');
      config.update('module.js.use.options.plugins', (value) => {
        value.push('react-hot-loader/babel');
        return value;
      });
    } catch (error) {
      // empty
    }
  }
  return config.export();
};
