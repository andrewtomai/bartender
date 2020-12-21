// const { spawn } = require('child_process');
// const url = require('url');
// const waitOn = require('wait-on');
// const environment = require('./environment');

// const serverlessProcess = {
//     process: null,
//     start: async () => {
//         if (environment.isLocalTest()) {
//             const baseTcp = url.format({
//                 protocol: 'tcp',
//                 hostname: 'localhost',
//                 port: environment.port(),
//             })
//             this.process = spawn('serverless', ['offline', 'start', '--stage', environment.testingStage()])
//             await waitOn({ resources: [baseTcp] })
//         }
//     },
//     stop: () => {
//         if (environment.isLocalTest()) {
//             this.process.kill('SIGINT');
//         }
//     },
// }


// // before('Start the local server', async function start() {
// //     this.timeout(10000)
// //     await serverlessProcess.start()
// // })

// // after('Stop the local server', () => {
// //     serverlessProcess.stop()
// // })
