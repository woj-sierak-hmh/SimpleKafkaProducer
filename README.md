# simpleKafkaProducer

Sends hex kafka messages provided as stdin to Kafka host and topic defined in the config.json file.

## Instalation

Install globally:
```sh
$ npm i https://github.com/wsihmh/SimpleKafkaProducer.git -g
```

Due to temporary issues the script isn't published to HMH Artifactory NPM yet.
```sh
$ npm i simple-kafka-producer -g
```

## Usage

```sh
Usage: index [options]

Options:
  -V, --version                    output the version number
  -c, --config <config-file.json>  Config file, otherwise reads default one
  -h, --help                       output usage information
```

## Examples

```sh
$ echo "000000003d146c6f67696e436f756e744832373065666635622d303635652d343634322d386363622d3037333131326436393932370000" | simple-kafka-producer
```

Use [avro-converter](https://github.com/wsihmh/AvroConverter) together with [simple-kafka-producer](https://github.com/wsihmh/SimpleKafkaProducer):
```sh
$ avro-converter -i /usr/local/lib/node_modules/avro-converter/sample/input-2.json | simple-kafka-producer
```