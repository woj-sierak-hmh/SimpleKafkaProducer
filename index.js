#!/usr/bin/env node

const fs = require('fs');
const program = require('commander');
const { getProducer } = require('./app/producer.js');
const pjson = require('./package.json');

program
  .version(pjson.version)
  .option('-c, --config <config-file.json>', 'Config file, otherwise reads default one')
  .parse(process.argv);

process.stdin.setEncoding('utf8');

let input = '';

process.stdin.on('readable', () => {
  chunk = process.stdin.read();
  if (chunk !== null) {
    input += chunk;
  }
});

process.stdin.on('end', () => {
  // console.log('input:', input);
  startProcess();
});

const startProcess = () => {
  const configPath = program.config || 'defaults/config.json';
  const configFile = fs.readFileSync(configPath, 'utf8');
  const config = JSON.parse(configFile);

  const host = config.host;
  const topic = config.topic;
  
  // const input = '000000003d146c6f67696e436f756e744832373065666635622d303635652d343634322d386363622d3037333131326436393932370000';

  const bufList = input.split(',').map(item => Buffer.from(item, 'hex'));

  console.log('host:', host)
  console.log('topic:', topic);
  // console.log('buf:', bufList.map(buf => buf.toString('hex')));


  const sendPayload = async () => {
    let producer;
    try {
      producer = await getProducer(host, topic);
    } catch (err) {
    console.log('Error connecting to Kafka cluster:', err);
    process.exit(1);
    }

    const resList = [];
    for (i in bufList) {
      try {
        const buf = bufList[i];
        console.log(`[${i}] sending: ${buf.toString('hex')}`);
        const res = await producer.send(buf);
        resList.push(res);
      } catch (err) {
        console.log('Error sending message to Kafka', err);
        process.exit(1);
      }
    }
    console.log('Messages sent successfully: \n', resList);
    process.exit(1);
  }

  sendPayload();
}
