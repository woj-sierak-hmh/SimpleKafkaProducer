const { HighLevelProducer, KafkaClient } = require('kafka-node');
const uuid = require('uuid/v1');

module.exports.getProducer = (host, topic) => {
  const client = new KafkaClient({
    kafkaHost: host,
  });
  const hlproducer = new HighLevelProducer(client);

  const producer = {};
  producer.send = (bufs, key) => {
    // const payloads = bufs.map(buf => ({
    //   topic,
    //   messages: [buf],
    //   key: key || uuid(),
    // }));
    const payloads = [{
      topic,
      messages: Array.isArray(bufs) ? bufs : [bufs],
      key: key || uuid(),
    }];
    return new Promise((resolve, reject) => {
      hlproducer.send(payloads, (err, data) => {
        if (err) return reject(err);
        resolve(data);
      });
    });
  }

  return new Promise((resolve, reject) => {
    hlproducer.on('ready', () => {
      resolve(producer);
    });

    hlproducer.on('error', (err) => {
      reject(err);
    });
  });
};
