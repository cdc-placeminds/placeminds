// for overriding unwanted warnings from html5-qrcode

module.exports = function override(config) {
    return {
      ...config,
      ignoreWarnings: [
        {
          module: /node_modules\/html5-qrcode/,
        },
      ],
    }
  }