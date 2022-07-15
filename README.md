# NODE-JS, TypeScript and PostgreSQL with Kafka

This is a simple implementation of nodejs that supports Kafka.
For the simplicity of the implementation, we are using Kafka using Docker image.

Each 5 seconds, this server will produce a message going into the topic you will configure with .env file.

You have the following API Endpoints TO:

1. Create new message at the topic
2. Get the latest message from the topic
3. Delete the latest message from the topic
4. Clear the topic
5. Wait for the next message to arrive (Get bulk of messages from the topic)(long pulling), given x seconds as wait time

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

### Sample REST Calls:

# add new academy item

POST http://localhost:9090/academy

```bash
{
    "name":"Eran Peled",
    "ID" : 30203023,
    "projects": [
        {
            "name":"mongodb",
            "type":"lecture"
        },
        {
            "name":"nodejs",
            "type":"lecture"
        }
    ]
}
```

# delete academy item
DELETE http://localhost:9090/academy/delete/60fbd4a5c0e6850ef3951874
where 60fbd4a5c0e6850ef3951874 is the ID of the document.

# Un-delete academy item
PUT http://localhost:9090/academy/restore/60fbd4a5c0e6850ef3951874
where 60fbd4a5c0e6850ef3951874 is the ID of the document.

# GET academy item
GET http://localhost:9090/academy/60fbd4a5c0e6850ef3951874
where 60fbd4a5c0e6850ef3951874 is the ID of the document.

# UPDATE academy item
PUT http://localhost:9090/academy/60fbd4a5c0e6850ef3951874
where 60fbd4a5c0e6850ef3951874 is the ID of the document.

BODY: 

```bash
{
    "name":"Eran Peled - 2",
    "ID" : 6782872,
    "projects": [
        {
            "name":"mongodb",
            "type":"lecture"
        },
        {
            "name":"nodejs",
            "type":"lecture"
        }
    ]
}
```
