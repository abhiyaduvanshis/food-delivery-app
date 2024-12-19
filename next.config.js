module.exports = {
    async headers() {
      return [
        {
          source: '/api/socket',
          headers: [
            { key: 'Connection', value: 'Upgrade' },
            { key: 'Upgrade', value: 'websocket' },
          ],
        },
      ];
    },
  };