# grapheye-web

Web interface to grapheye-core.

## Requirements

1. Maven
2. Tomcat
3. JDK

## Set grapheye-core settings

```
cd src/main/webapp/WEB-INF
cp grapheye.properties.template grapheye.properties
```

Then edit `grapheye.properties`:

- `grapheye.core.path`: Absolute path of `run.sh` in grapheye-core.

## Compile and run

The program must be recompiled whenever there is change in `grapheye.properties`.

```
make
make run
```

Then connect to `http://localhost:8080/grapheye/`

## API design

### Job Launch

URL: `POST /grapheye/api/launch`

Request format

```js
{
  "algorithm": "pagerank",
  "input": {
    "type": "text",
    "edge": "/path/to/edgelist/file.txt",
    "node": "/path/to/nodelist/file.txt"
  },
  "title": "mytitle",
  "group": "mygroup",
  "params": null,
  "date": null,
}
```

`title`, `group`, `date`, `params` can be null.

Response format

```
{
  "error": null
  "jobid": 5
}
```

### Status query

URL: `GET /grapheye/api/status/<jobid>`

Response format

```
{
  "error": null,
  "status": "running"
}
```

status:

- running: A job is running
- success: successfully finished with exit code 0
- fail: failed with nonzero exit code

### Result query

URL: `GET /grapheye/api/result/<jobid>`

Response format (pagerank)

```
{
  "error": null,
  "algorithm": "pagerank",
  "data": [
    {"node": "a", "rank": 0.23},
    {"node": "c", "rank": 0.11},
        ...
  ],
  "date": "2016-05-17T12:27+0000",
  "title": "mytitle",
  "mygroup": "mygroup"
}
```

### Result list query

URL: `GET /grapheye/api/list`

Response format

```js
{
  "error": null,
  "jobs": [
    {
      "jobid": 1,
      "date":"2016-05-17T12:27+0000",
      "title":"aaaa",
      "algorithm":"pagerank",
      "group":"gggg"
    },
    {
      "jobid": 2,
      "date":"2016-05-17T12:31+0000",
      "title":"aaaa",
      "algorithm":"pagerank",
      "group":"gggg"
    },
        ...
  ]
}
```


