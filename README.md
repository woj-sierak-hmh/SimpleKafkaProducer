# simpleKafkaProducer

Sends hex kafka messages provided as stdin to Kafka host and topic defined in the config.json file.

## Instalation

Install globally:
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