// const axios = require('axios');
// const stage = require('./stage');

// const defaultConfiguration = { stage: stage.LOCAL };

// const validateConfiguration = (configuration) => {
//     if (!stage.isValidStage(configuration.stage)) throw new Error('Invalid stage');
//     if (!stage.baseUrlForStage(configuration.stage)) throw new Error('No defined base url for stage');
// };

// class BartenderService {
//     constructor(configuration) {
//         const configWithDefaults = { ...defaultConfiguration, ...configuration };
//         validateConfiguration(configWithDefaults);

//         this.axios = axios.create({ baseURL: stage.baseUrlForStage(configWithDefaults.stage) });
//     }

//     async createRoom(roomName, dateRange) {
//         const response = await this.axios.post('/room', { roomName, dateRange });
//         return response;
//     }

//     async getRoom(roomId) {
//         const response = await this.axios.get(`/room/${roomId}`);
//         return response;
//     }
// }

// module.exports = BartenderService;
