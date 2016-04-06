# grapheye-web

Web interface to grapheye-core.

## API design

### Job Launch

URL: `POST /api/launch`

Request format

```js
{
  "input": {
    "type": "text",
    "edge": "/path/to/edgelist/file.txt",
    "node": "/path/to/nodelist/file.txt"
  },
  "algorithm": "pagerank",
  "params": null,
  "output": "pagerank_20160406"
}
```

Response format

```
{
  "error": null,
  "jobId": 1
}
```

### Status query

URL: `GET /api/status/{job_id}`

Response format

```
{
  "error": null,
  "status": "running"
}
```

status:

- starting: started a process, but not yet connected to spark monitor.
- running: connected to spark monitor (`localhost:4040`).
- terminated: the process is terminated.
- failed: the process returned nonzero exit code.

### Result query

URL: `GET /api/result/{job_id}`

Response format (pagerank)

```
{
  "error": null,
  "algorithm": "pagerank",
  "data": [
    {"node": "a", "rank": 0.23},
    {"node": "c", "rank": 0.11},
        ...
  ]
}
```

