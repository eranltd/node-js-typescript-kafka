# NODE-JS, TypeScript with Kafka

This is a simple implementation of nodejs app that demonstrate Kafka usage.
For the simplicity of the implementation, we are using Kafka using Docker image.

Each 5 seconds, this server will produce a message going into the topic you will configure with .env file.

You have the following API Endpoints TO:

1. POST /events/{topic_name}
Produce a message to a topic
The body is the message in JSON format.
This will place a new message in the topic named topic_name.

2. GET /events/{topic_name}?timeout={ms}
Gets the next message from topic_name.
Will return 204 if there’s no message in the topic after the timeout has elapsed.
If a timeout is not specified, a default of 10 seconds should be used.

## Getting Started 🚀

```bash
git clone <THIS_REPO>
npm install
npm run dev
```

for this server to work properly, you need first to install the kafka image using the pre-configured Docker file: 

```bash
docker-compose -f /infra/K8S/kafka/docker-compose.yml up -d
```

once you have installed the kafka image(called 'broker'), you can test it is working properly using those commands:

Create new Topic
```bash
docker exec broker \
kafka-topics --bootstrap-server broker:9092 \
             --create \
             --topic events
```

Write new message to the topic
```bash
docker exec --interactive --tty broker \
kafka-console-producer --bootstrap-server broker:9092 \
                       --topic events

this is my first kafka message
hello world!
this is my third kafka message. I’m on a roll :-D
```

Read every new message from the topic to stdout:

```bash
docker exec --interactive --tty broker \
kafka-console-consumer --bootstrap-server broker:9092 \
                       --topic events \
                       --from-beginning
```