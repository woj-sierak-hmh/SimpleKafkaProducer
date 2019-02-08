const { HighLevelProducer, KafkaClient } = require('kafka-node');
const uuid = require('uuid/v1');

module.exports.getProducer = (host, topic) => {
  const client = new KafkaClient({
    kafkaHost: host,
  });
  const hlproducer = new HighLevelProducer(client);

  const producer = {};
  producer.send = (buf, key) => {
    const payload = {
      topic,
      messages: buf,
      key: key || uuid(),
    };
    return new Promise((resolve, reject) => {
      hlproducer.send([payload], (err, data) => {
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
