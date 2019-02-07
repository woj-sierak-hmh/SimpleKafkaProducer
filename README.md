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
$ input.bin | simple-kafka-producer
```